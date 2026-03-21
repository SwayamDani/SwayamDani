# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (note: ESLint is disabled during builds via next.config.js)
```

There are no automated tests in this project.

## Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=
STUDIO_USER=
STUDIO_PASS=
```

## Architecture

This is a **Next.js 15 App Router** personal portfolio site with Sanity CMS for blog content and a LaTeX-based resume system.

### Page Structure

The home page (`src/app/page.js`) is a single-page app composed of section components rendered in order: Hero, About, Achievements, Skills, Projects, Experience, BlogSection, Contact. All section components live in `src/app/components/`.

Separate routes:
- `/blog` and `/blog/[slug]` — blog listing and individual posts
- `/resume` — LaTeX-rendered resume with PDF download
- `/studio/[[...tool]]` — Sanity Studio (CMS editor)

### Middleware (`middleware.ts`)

Two behaviors enforced at the edge:
1. **Blog access** is restricted to `localhost:3000` only — all other hosts are redirected to `/not_found`. This means the blog is not publicly accessible in production.
2. **Sanity Studio** at `/studio` is protected by HTTP Basic Auth using `STUDIO_USER` / `STUDIO_PASS` env vars.

### Sanity CMS

There are two Sanity client files — use them correctly:
- `src/lib/sanity.js` — plain `@sanity/client` instance, used by API routes
- `src/sanity/lib/client.js` — `next-sanity` client with live preview support

Blog content schema is defined in `src/sanity/schemaTypes/` (post, author, category, blockContent types). The Studio config is in `sanity.config.js`.

### Resume System

The resume is stored as LaTeX source at `src/lib/main.tex`. The `/resume` page:
1. Calls `/api/resume/source` to get the raw `.tex` content
2. Calls `/api/resume/render` to get an HTML preview rendered from LaTeX
3. On "Download PDF", calls `/api/resume/compile` (POST) which sends the `.tex` to the external `latex.ytotech.com` API and streams back a PDF

To update the resume, edit `src/lib/main.tex`.

### API Routes

All under `src/app/api/`:
- `blog/post/route.js` — GET all posts from Sanity (GROQ query)
- `blog/post/[slug]/route.js` — GET single post by slug
- `resume/source/route.js` — GET raw LaTeX source
- `resume/render/route.js` — GET LaTeX rendered as HTML
- `resume/compile/route.js` — POST LaTeX to external API, returns PDF
- `resume/pdf/route.js` — alternate PDF endpoint

### Styling

Tailwind CSS with dark mode support throughout. Global styles in `src/app/globals.css`. Three.js is used for 3D background effects in Hero; GLSL shader files are supported via `raw-loader` (configured in `next.config.js`). Framer Motion handles scroll-triggered animations on homepage sections.

### Social Redirect Routes

`next.config.js` defines UTM-tagged redirect shortcuts (e.g. `/li/blog1`, `/ig/blog2`, `/x/blog`) for sharing blog posts on LinkedIn, Instagram, and X.
