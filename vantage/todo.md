# Vantage Operations Website Migration

## Frontend Migration
- [x] Migrate Home.tsx landing page with all sections (Hero, Approach, Process, Contact)
- [x] Migrate ContactForm component with form validation and submission
- [x] Migrate analytics tracking module
- [x] Update App.tsx with analytics initialization
- [x] Verify all brand colors and typography match preview.html exactly
- [x] Test anchor-based navigation (Our Approach, Our Process, Connect)

## Backend Migration
- [x] Migrate forms router with submitLead procedure
- [x] Configure n8n webhook endpoint for form submissions
- [x] Verify tRPC form submission flow

## Brand & Assets
- [x] Upload Vantage logo SVG to CDN
- [x] Apply brand colors (#005696, #333333, #D4AF37, #E8E0D0, #F9F9F9)
- [x] Configure Poppins font (600 for titles, 400 for body)
- [x] Verify header navigation styling and layout

## Testing & Deployment
- [x] Build and test the full site locally
- [x] Verify form submission functionality
- [x] Verify analytics tracking
- [x] Test responsive layout
- [x] Create checkpoint before publishing
- [x] Deploy to hosted environment

## Open Items

- [ ] **Fix n8n landing page connection** — form currently calls n8n webhook directly from the browser (`/webhook/landing-page-lead`). Verify webhook is active, confirm leads are landing in HubSpot, and review whether the connection should be re-routed through a backend proxy for reliability/CORS safety once vantage-operations.com is live.

## Cloudflare Pages Deployment Test

### Pre-flight (code change required first)

- [ ] Change `vite.config.ts` `base` from `'/vantage-landing/'` to `'/'` — Cloudflare Pages serves from the domain root, not a subpath. Assets will 404 on Cloudflare until this is changed. Commit and push before setting up the Pages project.
  - Note: this will break the GitHub Pages URL (`logan-vantageops.github.io/vantage-landing/`). That's acceptable once Cloudflare is live — GitHub Pages was only for testing.

### Cloudflare Pages project setup

- [ ] Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
- [ ] Authorize the `logan-vantageops` GitHub org (one-time OAuth if not already done)
- [ ] Select repo: `vantage-landing`, branch: `main`
- [ ] Set build command: `pnpm install --frozen-lockfile && pnpm exec vite build`
- [ ] Set build output directory: `dist/public`
- [ ] Under Environment Variables, set `NODE_VERSION = 20`
- [ ] Save and deploy — wait for first build to complete

### Verify the Cloudflare Pages deploy

- [ ] Open the auto-generated `*.pages.dev` preview URL
- [ ] Confirm all sections load: Hero, What We Do, Three Pillars, Engineering Delivery Path, Contact, Footer
- [ ] Test nav anchor links scroll to correct sections (Our Approach, Our Process, Connect)
- [ ] Submit a test lead form entry — confirm n8n webhook receives it and lead appears in HubSpot
- [ ] Check browser console for any 404s or mixed-content errors

### Custom domain (after basic deploy is confirmed)

- [ ] In Pages project → Custom Domains → Add domain → enter `vantage-operations.com`
- [ ] Cloudflare auto-provisions DNS since the domain is already on Cloudflare — confirm the CNAME appears in DNS dashboard
- [ ] Wait for SSL certificate to provision (usually < 5 min)
- [ ] Verify `https://vantage-operations.com` loads with no redirects or cert errors
- [ ] Verify `https://www.vantage-operations.com` also resolves (add `www` as a second custom domain if needed)

### Cleanup after go-live

- [ ] Disable or delete the GitHub Pages deployment (repo Settings → Pages → None) to avoid two live URLs
- [ ] Update any internal docs or brain files referencing the old Manus URL (`vantage-operations.manus.space`)

## Completed

## Logo Replacement (New Request)
- [x] Copy PNG logos from Marketing folder to webdev static assets
- [x] Update Home.tsx header logo to use PNG
- [x] Update Home.tsx footer logo to use PNG
- [x] Update Home.tsx hero section logo to use PNG
- [x] Test all logo placements and verify appearance
- [x] Save checkpoint with new logos
