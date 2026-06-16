/**
 * Analytics Tracking Utility
 * Centralized module for tracking site events and sending to n8n webhook
 */

const N8N_WEBHOOK_URL = "https://logantatman.app.n8n.cloud/webhook/site-tracker";
const SESSION_ID_KEY = "vantage_session_id";
const SESSION_START_KEY = "vantage_session_start";

/**
 * Generate or retrieve session ID
 */
function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(SESSION_ID_KEY, sessionId);
    localStorage.setItem(SESSION_START_KEY, new Date().toISOString());
  }
  
  return sessionId;
}

/**
 * Get session duration in seconds
 */
function getSessionDuration(): number {
  const startTime = localStorage.getItem(SESSION_START_KEY);
  if (!startTime) return 0;
  
  const start = new Date(startTime).getTime();
  const now = new Date().getTime();
  return Math.floor((now - start) / 1000);
}

/**
 * Get current scroll percentage
 */
function getScrollPercentage(): number {
  return Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );
}

/**
 * Send tracking event to n8n webhook using Beacon API for reliability
 * Beacon API ensures data is sent even when page is unloading
 */
function sendTrackingEvent(eventData: Record<string, any>): void {
  try {
    const payload = {
      ...eventData,
      sessionId: getSessionId(),
      sessionDuration: getSessionDuration(),
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    const payloadString = JSON.stringify(payload);

    // Use Beacon API for critical events (page unload, session end)
    // Beacon API is more reliable for "page leaving" scenarios
    if (eventData.eventType === "sessionEnd" || eventData.eventType === "pageUnload") {
      navigator.sendBeacon(N8N_WEBHOOK_URL, payloadString);
    } else {
      // Use fetch for regular events
      fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: payloadString,
        keepalive: true, // Ensure request completes even if page unloads
      }).catch(error => {
        console.error("[Analytics] Failed to send tracking event:", error);
      });
    }
  } catch (error) {
    console.error("[Analytics] Failed to send tracking event:", error);
  }
}

/**
 * Track page view
 */
export function trackPageView(): void {
  sendTrackingEvent({
    eventType: "pageView",
    url: window.location.href,
    referrer: document.referrer,
    title: document.title,
  });
}

/**
 * Track form interaction (focus, blur, change)
 */
export function trackFormInteraction(
  formName: string,
  fieldName: string,
  interactionType: "focus" | "blur" | "change" | "submit" | "error"
): void {
  sendTrackingEvent({
    eventType: "formInteraction",
    formName,
    fieldName,
    interactionType,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmission(
  formName: string,
  success: boolean,
  errorMessage?: string
): void {
  sendTrackingEvent({
    eventType: "formSubmission",
    formName,
    success,
    errorMessage: errorMessage || null,
  });
}

/**
 * Track custom event (button click, link click, etc.)
 */
export function trackCustomEvent(
  eventName: string,
  eventData?: Record<string, any>
): void {
  sendTrackingEvent({
    eventType: "customEvent",
    eventName,
    ...eventData,
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(): void {
  const scrollPercentage = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );

  sendTrackingEvent({
    eventType: "scrollDepth",
    scrollPercentage: Math.min(scrollPercentage, 100),
  });
}

/**
 * Initialize analytics tracking
 * Call this once on app load
 */
export function initializeAnalytics(): void {
  // Track initial page view
  trackPageView();

  // Track scroll depth periodically
  let lastScrollTrack = 0;
  window.addEventListener("scroll", () => {
    const now = Date.now();
    if (now - lastScrollTrack > 5000) {
      trackScrollDepth();
      lastScrollTrack = now;
    }
  });

  // Send heartbeat every 30 seconds to track active engagement
  const heartbeatInterval = setInterval(() => {
    sendTrackingEvent({
      eventType: "heartbeat",
      currentScroll: getScrollPercentage(),
      sessionDuration: getSessionDuration(),
    });
  }, 30000); // 30 seconds

  // Track when user leaves or closes the site
  // visibilitychange fires when tab is hidden, minimized, or switched away
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      // User left the tab/window
      sendTrackingEvent({
        eventType: "sessionEnd",
        reason: "tabHidden",
        finalScroll: getScrollPercentage(),
        totalSessionDuration: getSessionDuration(),
      });
      // Clear heartbeat interval when user leaves
      clearInterval(heartbeatInterval);
    }
  });

  // Track time on page before leaving (page unload)
  window.addEventListener("beforeunload", () => {
    sendTrackingEvent({
      eventType: "sessionEnd",
      reason: "pageUnload",
      finalScroll: getScrollPercentage(),
      totalSessionDuration: getSessionDuration(),
    });
    // Clear heartbeat interval
    clearInterval(heartbeatInterval);
  });

  // Also track when user closes the window/tab (pagehide event)
  window.addEventListener("pagehide", () => {
    sendTrackingEvent({
      eventType: "sessionEnd",
      reason: "pageHide",
      finalScroll: getScrollPercentage(),
      totalSessionDuration: getSessionDuration(),
    });
  });
}
