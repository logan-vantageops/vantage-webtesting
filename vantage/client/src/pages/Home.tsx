/**
 * Vantage Operations Landing Page
 *
 * Brand: Systems engineering consultancy for business operations
 * Colors: Sky Blue #005696 | Ground Charcoal #333333 | Horizon Gold #D4AF37
 *         Substrate #E8E0D0 | White #F9F9F9
 * Typography: Poppins Semibold (titles) / Poppins Regular (body)
 * Tone: Engineer-precise, people-first. Lead with outcome, follow with method.
 */

import { useEffect } from 'react';
import { trackCustomEvent } from '@/lib/analytics';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  useEffect(() => {
    const handleButtonClick = (e: Event) => {
      const target = e.target as HTMLElement;
      trackCustomEvent('buttonClick', {
        buttonText: (target.textContent || 'unknown').trim(),
        buttonClass: target.className || 'unknown',
        section: target.closest('section')?.id || 'unknown',
      });
    };
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      trackCustomEvent('linkClick', {
        href: target.href || 'unknown',
        text: (target.textContent || 'unknown').trim(),
        section: target.closest('section')?.id || 'unknown',
      });
    };
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    buttons.forEach(btn => btn.addEventListener('click', handleButtonClick));
    links.forEach(link => link.addEventListener('click', handleLinkClick));
    return () => {
      buttons.forEach(btn => btn.removeEventListener('click', handleButtonClick));
      links.forEach(link => link.removeEventListener('click', handleLinkClick));
    };
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#F9F9F9' }}>

      {/* GOOGLE FONTS + BRAND STYLES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');
        html { scroll-behavior: smooth; overflow-x: auto; }
        body { min-width: 1080px; }
        .vo-nav-link { color: #F9F9F9; font-weight: 500; font-size: 0.88rem; text-decoration: none; transition: color 0.2s; font-family: 'Poppins', sans-serif; }
        .vo-nav-link:hover { color: #D4AF37; }
        .vo-btn-primary {
          display: inline-block; padding: 14px 32px;
          background-color: #D4AF37; color: #FFFFFF;
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: 0.92rem; letter-spacing: 0.04em;
          text-decoration: none; border: none; cursor: pointer;
          transition: background-color 0.2s, box-shadow 0.2s;
        }
        .vo-btn-primary:hover { background-color: #b8941e; box-shadow: 0 4px 16px rgba(212,175,55,0.35); }
        .vo-btn-ghost {
          display: inline-block; padding: 13px 31px;
          border: 1.5px solid #D4AF37; color: #D4AF37;
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: 0.92rem; letter-spacing: 0.04em;
          text-decoration: none; background: transparent; cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }
        .vo-btn-ghost:hover { background-color: #D4AF37; color: #FFFFFF; }
        .vo-rule { height: 2px; background: #D4AF37; border: none; margin: 0; }
        .vo-pillar { transition: transform 0.2s, box-shadow 0.2s; }
        .vo-pillar:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.10); }
        .vo-label { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #D4AF37; display: block; margin-bottom: 12px; font-family: 'Poppins', sans-serif; }
        .vo-list { list-style: none; padding: 0; margin: 16px 0 0; display: flex; flex-direction: column; gap: 10px; }
        .vo-list li { display: flex; gap: 10px; font-size: 0.9rem; line-height: 1.6; font-family: 'Poppins', sans-serif; }
        .vo-list li::before { content: ''; display: block; width: 4px; height: 4px; border-radius: 50%; background: #D4AF37; margin-top: 8px; flex-shrink: 0; }
        .vo-list-dark li::before { background: #333333; }
        /* Responsive reflow disabled — fixed layout with min-width scrollbar */
      `}</style>

      {/* NAV */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: '#333333', borderBottom: '1px solid #444444' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503726309/GS9SF3NR5MopZ9u6zaQSDi/logo-variant-4-nobg_85a7bf8d.png" alt="Vantage Operations" style={{ height: '48px', width: 'auto' }} />
            <div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.88rem', letterSpacing: '0.16em', color: '#F9F9F9', lineHeight: 1.2 }}>VANTAGE</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.65rem', letterSpacing: '0.12em', color: '#D4AF37', lineHeight: 1.2 }}>OPERATIONS</div>
            </div>
          </a>
          <nav className="vo-desktop-only" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <a href="#approach" className="vo-nav-link" onClick={() => trackCustomEvent('navClick', { target: 'approach' })}>Our Approach</a>
            <a href="#process" className="vo-nav-link" onClick={() => trackCustomEvent('navClick', { target: 'process' })}>Our Process</a>
            <a href="#contact" className="vo-btn-primary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}
               onClick={() => trackCustomEvent('navClick', { target: 'nav-cta' })}>
              Connect
            </a>
          </nav>
        </div>
        <hr className="vo-rule"/>
      </header>

      {/* HERO */}
      <section style={{ paddingTop: '80px', backgroundColor: '#005696' }}>
        <div className="vo-hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '88px 24px 80px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: '48px', alignItems: 'center' }}>
          <div>
            <span className="vo-label">An Analytical Perspective on Business Operations</span>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', color: '#FFFFFF', lineHeight: 1.2, margin: '0 0 20px' }}>
              Perspective that Drives Performance.
            </h1>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '1.05rem', color: '#a8c4db', lineHeight: 1.75, marginBottom: '36px', maxWidth: '580px' }}>
              Vantage Operations helps growing businesses replace spreadsheet chaos with structured systems, automated workflows, and decision-ready dashboards. We bring an engineering mindset to business operations — so your team has the infrastructure, the efficiency, and the insight to grow the business — not chase it.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#contact" className="vo-btn-primary" onClick={() => trackCustomEvent('ctaClick', { cta: 'hero-primary' })}>
                Start a Conversation →
              </a>
              <a href="#approach" className="vo-btn-ghost" onClick={() => trackCustomEvent('ctaClick', { cta: 'hero-secondary' })}>
                See Our Approach
              </a>
            </div>
          </div>
          <div className="vo-desktop-only" style={{ display: 'flex', justifyContent: 'center', opacity: 0.18 }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503726309/GS9SF3NR5MopZ9u6zaQSDi/logo-variant-5-nobg_5f31393d.png" alt="Vantage Operations" style={{ height: '180px', width: 'auto' }} />
          </div>
        </div>
        <hr className="vo-rule"/>
      </section>

      {/* POSITIONING BRIDGE — Level 1 → 2 of message ladder */}
      <section style={{ backgroundColor: '#F9F9F9', padding: '72px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <span className="vo-label">What We Do</span>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#333333', lineHeight: 1.25, margin: '0 0 16px' }}>
            Structured operations, automation, and business intelligence for growing businesses.
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '1rem', color: '#666666', lineHeight: 1.75, maxWidth: '640px', margin: '0 auto 40px' }}>
            We analyze how your processes, people, and tools fit together — then design solutions that last. Whether you've never heard the term "operational analysis" or you know exactly what you need, the result is the same: a business that runs the way it should.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: '#E8E0D0', border: '1px solid #E8E0D0' }}>
            <div style={{ backgroundColor: '#F9F9F9', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.88rem', color: '#333333', lineHeight: 1.5 }}>Busier than ever, but not growing</div>
            </div>
            <div style={{ backgroundColor: '#F9F9F9', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.88rem', color: '#333333', lineHeight: 1.5 }}>Copy-pasting data between apps by hand</div>
            </div>
            <div style={{ backgroundColor: '#F9F9F9', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.88rem', color: '#333333', lineHeight: 1.5 }}>Can't see your numbers until it's too late</div>
            </div>
            <div style={{ backgroundColor: '#F9F9F9', padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.88rem', color: '#333333', lineHeight: 1.5 }}>Every new hire makes things more complicated</div>
            </div>
          </div>
          <p style={{ marginTop: '24px', fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.92rem', color: '#888888' }}>
            If any of these sound familiar — this is what we do.
          </p>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section id="approach" style={{ backgroundColor: '#E8E0D0', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="vo-label">The Three Pillar Framework</span>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#333333', lineHeight: 1.25, margin: '0 0 16px' }}>
              Foundation. Momentum. Clarity.
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '1rem', color: '#666666', lineHeight: 1.75, maxWidth: '580px', margin: '0 auto' }}>
              Not separate phases — interlocking pillars where strength in one area directly amplifies the others. Every engagement draws from all three.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

            {/* Pillar 1: Foundation */}
            <div className="vo-pillar" style={{ backgroundColor: '#F9F9F9', padding: '40px 32px', borderTop: '3px solid #005696' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#333333', margin: '0 0 12px', lineHeight: 1.3 }}>Foundation — Digital Infrastructure</h3>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.92rem', color: '#666666', lineHeight: 1.7, margin: '0 0 20px' }}>
                Organizing your digital foundation so your team has clean, connected systems to work from. Tools, platforms, file systems, and CRM built into a structure that scales.
              </p>
              <ul className="vo-list" style={{ color: '#444444' }}>
                <li><strong>Operational Blueprinting</strong></li>
                <li><strong>Tech Stack Consolidation</strong></li>
                <li><strong>Technical Debt Assessment</strong></li>
              </ul>
            </div>

            {/* Pillar 2: Momentum */}
            <div className="vo-pillar" style={{ backgroundColor: '#005696', padding: '40px 32px', borderTop: '3px solid #D4AF37' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#FFFFFF', margin: '0 0 12px', lineHeight: 1.3 }}>Momentum — Process Automation</h3>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.92rem', color: '#a8c4db', lineHeight: 1.7, margin: '0 0 20px' }}>
                Streamlining your processes to build real momentum by mapping workflows, identifying bottlenecks, and building custom automations that remove manual busywork and free up time.
              </p>
              <ul className="vo-list">
                <li style={{ color: '#D4AF37' }}><strong>Activity Mapping</strong></li>
                <li style={{ color: '#D4AF37' }}><strong>System Synchronization</strong></li>
                <li style={{ color: '#D4AF37' }}><strong>Exception Handling</strong></li>
              </ul>
            </div>

            {/* Pillar 3: Clarity (Horizon Gold) */}
            <div className="vo-pillar" style={{ backgroundColor: '#D4AF37', padding: '40px 32px', borderTop: '3px solid #333333' }}>
              <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '1.25rem', color: '#333333', margin: '0 0 12px', lineHeight: 1.3 }}>Clarity — Business Intelligence</h3>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.92rem', color: '#4a3a10', lineHeight: 1.7, margin: '0 0 20px' }}>
                Delivering clarity to decision-makers through custom dashboards and reporting built on your real data, so performance, financials, and KPIs are always visible.
              </p>
              <ul className="vo-list vo-list-dark">
                <li style={{ color: '#333333' }}><strong>KPI Dashboards</strong></li>
                <li style={{ color: '#333333' }}><strong>Precision Reporting</strong></li>
                <li style={{ color: '#333333' }}><strong>Data Integrity</strong></li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ENGINEERING DELIVERY PATH */}
      <section id="process" style={{ backgroundColor: '#003F6E', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="vo-label">How We Work</span>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#FFFFFF', lineHeight: 1.25, margin: '0 0 16px' }}>
              The Engineering Delivery Path
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '1rem', color: '#a8c4db', lineHeight: 1.75, maxWidth: '540px', margin: '0 auto' }}>
              Every engagement follows the same disciplined five-step process — because rigorous execution is what separates solutions that last from ones that need to be rebuilt.
            </p>
          </div>

          <div className="vo-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px', backgroundColor: '#D4AF37' }}>
            <div style={{ backgroundColor: '#003F6E', padding: '32px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '2rem', color: '#D4AF37', marginBottom: '8px', lineHeight: 1 }}>01</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '10px' }}>Discovery</div>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.8rem', color: '#7faac7', lineHeight: 1.6, margin: 0 }}>Understand the business before touching a single system.</p>
            </div>
            <div style={{ backgroundColor: '#003F6E', padding: '32px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '2rem', color: '#D4AF37', marginBottom: '8px', lineHeight: 1 }}>02</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '10px' }}>Data</div>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.8rem', color: '#7faac7', lineHeight: 1.6, margin: 0 }}>Ground every decision in what's real.</p>
            </div>
            <div style={{ backgroundColor: '#003F6E', padding: '32px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '2rem', color: '#D4AF37', marginBottom: '8px', lineHeight: 1 }}>03</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '10px' }}>Development</div>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.8rem', color: '#7faac7', lineHeight: 1.6, margin: 0 }}>Build solutions that fit how your business actually works.</p>
            </div>
            <div style={{ backgroundColor: '#003F6E', padding: '32px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '2rem', color: '#D4AF37', marginBottom: '8px', lineHeight: 1 }}>04</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '10px' }}>Diligence</div>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.8rem', color: '#7faac7', lineHeight: 1.6, margin: 0 }}>Test it before it touches your operation.</p>
            </div>
            <div style={{ backgroundColor: '#003F6E', padding: '32px 20px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '2rem', color: '#D4AF37', marginBottom: '8px', lineHeight: 1 }}>05</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: '#FFFFFF', marginBottom: '10px' }}>Delivery</div>
              <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.8rem', color: '#7faac7', lineHeight: 1.6, margin: 0 }}>Hand over something that runs without us hovering.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ backgroundColor: '#F9F9F9', padding: '80px 24px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="vo-label">Let's Talk</span>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#333333', lineHeight: 1.25, margin: '0 0 16px' }}>
              Start with a conversation
            </h2>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '1rem', color: '#666666', lineHeight: 1.75, margin: 0 }}>
              Tell us what's going on in your business. We'll take it from there — no jargon, no sales pitch, just an honest look at what might help.
            </p>
          </div>
          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#333333', padding: '40px 24px 28px' }}>
        <hr className="vo-rule" style={{ marginBottom: '28px' }}/>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Logo v2: on dark */}
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503726309/GS9SF3NR5MopZ9u6zaQSDi/logo-variant-2-transparent_190567dd.png" alt="Vantage Operations" style={{ height: '32px', width: 'auto' }} />
            <div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.14em', color: '#FFFFFF', lineHeight: 1.2 }}>VANTAGE OPERATIONS</div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.7rem', color: '#D4AF37', letterSpacing: '0.05em', marginTop: '2px' }}>Engineered for Excellence. Built for People.</div>
            </div>
          </div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400, fontSize: '0.75rem', color: '#777777' }}>
            © 2026 Vantage Operations. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
