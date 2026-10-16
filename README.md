# Habibur Rahman — MERN Stack Developer Portfolio

A production-ready single-page developer portfolio built with **React 19**, **TypeScript**, **Vite** and **Tailwind CSS v4**.
Everything (projects, case studies, skills, services, process, resume, testimonials) is rendered from typed data in
`src/data/portfolioData.ts`, so content updates never require touching component code.

## Sections

Hero · Developer stats · About (tabs) · Skills (filterable + code inspector) · Projects (filterable + case-study modal) ·
Services · Development process · Testimonials · Contact · Footer, plus a `Cmd/Ctrl + K` command palette and a resume modal
(view, print and download).

## Tech stack

| Concern | Choice |
| --- | --- |
| UI | React 19 + TypeScript (strict) |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (class-based dark mode via `@custom-variant`) |
| Icons | lucide-react |
| Data | Typed static data module (`src/data/portfolioData.ts`) |

## Getting started

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Type-checked production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Type-check only (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` (cross-platform) |

## Environment variables

Copy `.env.example` to `.env.local` for local use and configure the same keys in the hosting provider for production.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | Recommended | Absolute production URL. Injects the `canonical` link and the Open Graph/Twitter preview URLs at build time. When it is empty those tags are omitted, so no broken absolute URLs are ever published. |
| `VITE_CONTACT_ENDPOINT` | Optional | HTTPS endpoint that receives contact-form submissions (Formspree, Web3Forms, a Vercel serverless function, a Render API route, …). When it is empty the form opens the visitor's mail client with the inquiry pre-filled instead of silently discarding it. |

## Contact form behaviour

1. **With `VITE_CONTACT_ENDPOINT`** — the payload is `POST`ed as JSON with a 12s timeout. Success, HTTP errors, timeouts
   and network failures each render a specific, visitor-friendly state with a `mailto:` fallback.
2. **Without it** — the browser opens a pre-filled `mailto:` message and the UI explains that the mail app is opening,
   including a "Copy email address" button. No inquiry is ever lost silently.

## Deployment

### Vercel (recommended for this repo)

The project is a static Vite SPA, so no rewrite rules are required (navigation is hash-based, there is no client router).

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variables | `VITE_SITE_URL`, `VITE_CONTACT_ENDPOINT` (both optional) |

### Render / any Node host

Build with `npm run build` and serve the generated `dist/` directory as static assets (`npm run preview` uses Vite's
static server). No server runtime, database or secrets are required by this repository.

## Project structure

```
index.html                  # Shell: SEO meta, theme bootstrap script, favicon
public/                     # favicon.svg, robots.txt, og-image.jpg
src/
  App.tsx                   # Layout composition, theme + scroll progress
  main.tsx                  # Entry point (wrapped in ErrorBoundary)
  index.css                 # Tailwind theme, dark variant, print + scrollbar styles
  components/               # Section components + modals + ErrorBoundary
  data/portfolioData.ts     # All portfolio content (typed)
  hooks/                    # useActiveSection, useBodyScrollLock, useDialogBehavior,
                            #   useEscapeKey, useScrollProgressBar
  types/portfolio.ts        # Shared domain types
  utils/                    # clipboard, image fallback, contact delivery
```

## Accessibility

Every overlay (resume viewer, case study, code inspector, command palette) shares one
implementation, `useDialogBehavior`, so the behaviour cannot drift apart between modals:

| Behaviour | Detail |
| --- | --- |
| Escape closes | Only the top-most dialog reacts; `stopImmediatePropagation` prevents a single press from closing every open overlay at once. |
| Focus on open | Moves to the first focusable element inside the dialog (the search input for the command palette). |
| Focus trap | Tab / Shift+Tab cycle within the dialog and never reach the page behind the overlay. |
| Focus on close | Returns to the control that opened the dialog. |
| Scroll lock | Background scrolling is locked; nested overlays use a shared counter so the page stays locked until the last one closes. |
| Dismiss | Clicking the backdrop closes the dialog. |
