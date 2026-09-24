# AK Tech Solutions – Workspace Guide

## Project Overview
AK Tech Solutions is a technical agency website showcasing web development, AI automation, and CRM integration services. It's a React + TypeScript + Vite SPA with a dark-themed, modern UI.

## Repository Structure
```
├── src/
│   ├── components/     # React components (Hero, Services, Projects, Modals, etc.)
│   ├── data/          # Static data: agencyData.ts (services, projects, FAQ, testimonials)
│   ├── services/      # Business logic: leadService.ts (localStorage + email notifications)
│   ├── types/         # TypeScript interfaces (ServiceItem, ProjectItem, LeadSubmission, etc.)
│   ├── index.css      # Tailwind v4 imports + custom dark scrollbar + glassmorphism utilities
│   ├── main.tsx       # Entry point
│   └── App.tsx        # Root component with modal state management
├── public/            # Static assets (logo.svg)
├── index.html         # HTML template with SEO meta + Schema.org JSON-LD
├── vite.config.ts     # Vite config with Tailwind, React plugin, path alias @/*
├── tsconfig.json      # TypeScript config (ES2022, moduleResolution: bundler)
└── package.json       # Dependencies: React 19, Tailwind v4, Framer Motion, GSAP
```

## Available Commands
- `bun run dev` – Start dev server on port 3000 (host 0.0.0.0)
- `bun run build` – Production build (outputs to `dist/`)
- `bun run preview` – Preview production build
- `bun run lint` – TypeScript type check (`tsc --noEmit`)
- `bun run clean` – Remove `dist/` and `server.js`

## Architecture Patterns

### Styling (Tailwind CSS v4)
- **Theme**: Dark mode only (`bg-[#08090b]`, `text-[#e2e8f0]`)
- **Typography**: Inter + Plus Jakarta Sans fonts
- **Utilities in index.css**: `.tech-grid-pattern`, `.subtle-radial-glow`, `.dark-card-border`
- **Scrollbar**: Custom dark scrollbar styled in index.css

### Path Aliases
- `@/*` resolves to project root (configured in vite.config.ts and tsconfig.json)
- Import example: `import { Navbar } from '@/components/Navbar'`

### Component Architecture
- **Modals**: Controlled via App.tsx state (selectedService, selectedProject, quoteModalOpen, etc.)
- **Props pattern**: Callbacks passed from App.tsx for modal open/close and navigation
- **Data flow**: Static data from `src/data/agencyData.ts` → components → modals

### Lead Management System
- **Storage**: localStorage key `ak_tech_leads_v1`
- **Service**: `src/services/leadService.ts` – handles submit, retrieval, email notification payload generation
- **Features**: Email notification payload construction, graceful API fallback, WhatsApp/email deep links

### Environment Variables
- `GEMINI_API_KEY` – Google GenAI integration (injected by AI Studio)
- `APP_URL` – Self-referential URL (injected by AI Studio)
- Copy `.env.example` to `.env` for local development

## Key Files to Know
| File | Purpose |
|------|---------|
| `src/data/agencyData.ts` | Central data store: SERVICES_DATA, PROJECTS_DATA, FAQ_DATA, COMPANY_INFO |
| `src/types/index.ts` | All TypeScript interfaces (ServiceItem, ProjectItem, LeadSubmission, etc.) |
| `src/services/leadService.ts` | Lead CRUD + email notification generation |
| `src/App.tsx` | Modal state management + section navigation |
| `src/index.css` | Tailwind imports + custom utilities |

## Development Notes
- **HMR**: Controlled by `DISABLE_HMR` env var (AI Studio sets this to prevent flickering during agent edits)
- **Animations**: Framer Motion for component animations, GSAP for advanced sequences
- **Icons**: Lucide React (`lucide-react`)
- **AI Integration**: `@google/genai` package for Gemini API

## Common Tasks
- **Add a new service**: Edit `SERVICES_DATA` array in `src/data/agencyData.ts`, follow `ServiceItem` interface
- **Add a new project**: Edit `PROJECTS_DATA` array, include images in `/src/assets/images/`
- **Update company info**: Modify `COMPANY_INFO` object in `src/data/agencyData.ts`
- **Change theme colors**: Update values in `src/index.css` and Tailwind classes in components

## TypeScript Requirements
- Strict mode enabled via `tsc --noEmit` on lint
- Path aliases require `@/*` pattern
- JSX transform: `react-jsx` (no React import needed)
