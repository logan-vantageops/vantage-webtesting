# vantage-webtesting

Public staging repo for Vantage client landing pages. Sites are tested here via GitHub Pages before production deploy to Cloudflare.

## Structure

Each client gets a subfolder:

`
buckeye/     → https://logan-vantageops.github.io/vantage-webtesting/buckeye/
`

## Workflow

1. Build/update landing page in private client-[Name]-workspace repo
2. Copy index.html into the client subfolder here
3. Test on GitHub Pages URL
4. Deploy to Cloudflare Pages for production

> TODO: Migrate to direct Cloudflare Pages deploy from private workspace repo (CF Pages supports private GitHub repos natively — no public staging repo needed)
