import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock fetch globally
global.fetch = vi.fn();

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("forms.submitLead", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("validates required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Test missing name
    await expect(
      caller.forms.submitLead({
        name: "",
        companyName: "Test Company",
        email: "test@example.com",
        phoneNumber: "555-1234",
      })
    ).rejects.toThrow();

    // Test missing email
    await expect(
      caller.forms.submitLead({
        name: "John Doe",
        companyName: "Test Company",
        email: "",
        phoneNumber: "555-1234",
      })
    ).rejects.toThrow();

    // Test invalid email
    await expect(
      caller.forms.submitLead({
        name: "John Doe",
        companyName: "Test Company",
        email: "invalid-email",
        phoneNumber: "555-1234",
      })
    ).rejects.toThrow();
  });

  it("submits valid lead data to n8n webhook", async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => "OK",
    });
    global.fetch = mockFetch;

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.forms.submitLead({
      name: "John Doe",
      companyName: "Acme Corp",
      email: "john@example.com",
      phoneNumber: "+1-555-0123",
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("Lead submitted successfully");

    // Verify fetch was called with correct parameters
    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, options] = mockFetch.mock.calls[0];
    
    expect(url).toBe("https://logan-vantageoperations.app.n8n.cloud/webhook/landing-page-lead");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/json");

    // Verify payload structure
    const payload = JSON.parse(options.body);
    expect(payload.name).toBe("John Doe");
    expect(payload.companyName).toBe("Acme Corp");
    expect(payload.email).toBe("john@example.com");
    expect(payload.phoneNumber).toBe("+1-555-0123");
    expect(payload.submittedAt).toBeDefined();
  });

  it("handles n8n webhook errors gracefully", async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    });
    global.fetch = mockFetch;

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.forms.submitLead({
        name: "John Doe",
        companyName: "Acme Corp",
        email: "john@example.com",
        phoneNumber: "+1-555-0123",
      })
    ).rejects.toThrow("Failed to submit lead");
  });

  it("handles network errors gracefully", async () => {
    const mockFetch = vi.fn().mockRejectedValueOnce(new Error("Network error"));
    global.fetch = mockFetch;

    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.forms.submitLead({
        name: "John Doe",
        companyName: "Acme Corp",
        email: "john@example.com",
        phoneNumber: "+1-555-0123",
      })
    ).rejects.toThrow("Failed to submit lead");
  });
});
