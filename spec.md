# LeadPilot — AI Lead Generation + Automation (MVP)
Owner: Eshkarn Singh
Goal: Build a portfolio-grade SaaS MVP that captures leads, stores them in Postgres, shows them in an admin dashboard, and enriches each lead with AI summary + score.

## Tech Stack (MVP)
- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth optional later)
- Zod (validation)
- OpenAI API (AI enrichment)
- Resend (email) — optional for later milestone

## Repository / Folder Structure (target)
leadpilot/
  app/
    (public)/
      page.tsx
      thank-you/page.tsx
    dashboard/
      layout.tsx
      page.tsx
      leads/
        page.tsx
        [id]/
          page.tsx
  components/
    LeadForm.tsx
    LeadTable.tsx
    LeadStatusBadge.tsx
  lib/
    supabase/
      server.ts
      client.ts
    ai/
      enrichLead.ts
    validators/
      lead.ts
  db/
    schema.sql
  .env.example
  README.md

## MVP Scope (Milestone A + B)
### Public
1) Landing Page `/`:
- Hero section for LeadPilot
- A lead capture form (name, email, phone, company, serviceNeeded, message)
- On submit:
  - Validate with Zod
  - POST to `/api/leads`
  - Redirect to `/thank-you`

2) Thank You Page `/thank-you`:
- Confirms submission
- Shows “We’ll contact you soon”
- Optional button: “Back to Home”

### Admin Dashboard
3) Leads List `/dashboard/leads`:
- Table listing leads (created_at, name, email, phone, serviceNeeded, status, ai_score)
- Sort by created_at desc
- Basic filters (status dropdown)
- Click row -> lead detail

4) Lead Detail `/dashboard/leads/[id]`:
- Shows full lead info
- Shows AI section:
  - ai_summary
  - ai_intent (e.g. “website”, “automation”, “seo”, “unknown”)
  - ai_score (0-100)
- Status update UI (dropdown) -> PATCH `/api/leads/:id`

### AI Enrichment (Milestone B)
5) On lead creation, call OpenAI to enrich:
- Generate:
  - `ai_summary`: short bullet-like summary of what they want
  - `ai_intent`: one of ["website", "automation", "branding", "ads", "seo", "unknown"]
  - `ai_score`: 0-100 based on purchase intent + clarity + budget hints
- Store results in DB with the lead record.

## Non-goals for MVP (do NOT build yet)
- Full auth / login
- Payment / Stripe
- Chat widget
- Email sequences / cron jobs

## Database (Supabase Postgres)
Create SQL in `db/schema.sql`:

Table: leads
- id uuid primary key default gen_random_uuid()
- name text not null
- email text not null
- phone text null
- company text null
- service_needed text not null
- message text null
- source text not null default 'form'
- status text not null default 'new'  -- enum-like: new/contacted/qualified/won/lost
- ai_summary text null
- ai_intent text null
- ai_score int null
- created_at timestamptz not null default now()
- updated_at timestamptz not null default now()

Add an index on created_at desc and status.

## Environment Variables
Create `.env.example` with:
- NEXT_PUBLIC_SUPABASE_URL=
- NEXT_PUBLIC_SUPABASE_ANON_KEY=
- SUPABASE_SERVICE_ROLE_KEY= (server-only)
- OPENAI_API_KEY=
Optional later:
- RESEND_API_KEY=

## Supabase Client Setup
- `lib/supabase/client.ts` for browser use (anon)
- `lib/supabase/server.ts` for server routes (service role for insert/update)

## API Routes (Next.js App Router)
Implement:
1) `app/api/leads/route.ts`
- POST: create a lead
  - validate with Zod
  - insert lead
  - call AI enrichment (OpenAI) using `lib/ai/enrichLead.ts`
  - update lead with ai fields
  - return { id }

- GET: list leads (limit 100, order by created_at desc)
  - support query param `status` optional

2) `app/api/leads/[id]/route.ts`
- GET: fetch a lead by id
- PATCH: update status (and updated_at)

## UI Requirements
- Use Tailwind, clean SaaS look (cards, spacing, readable typography)
- No external UI kits required
- Responsive landing page + dashboard
- Dashboard layout with left nav:
  - Leads -> /dashboard/leads

## Validation
Zod schema in `lib/validators/lead.ts`:
- name min 2
- email valid
- service_needed min 2
- phone optional, company optional, message optional

## AI Prompting (Implementation notes)
File: `lib/ai/enrichLead.ts`
Input: lead fields
Output JSON strictly:
{
  "ai_summary": "string",
  "ai_intent": "website|automation|branding|ads|seo|unknown",
  "ai_score": number
}
Rules:
- ai_summary: max 3 short lines (no markdown)
- ai_score: 0–100 integer
- If unsure intent -> unknown
- Be consistent, no extra keys.

## Acceptance Criteria (must pass)
- Submitting form creates a DB record
- Dashboard list shows new lead within refresh
- Lead detail page displays all fields and AI fields
- AI fields are populated shortly after creation (same request is fine)
- Status can be updated from detail page and persists
- Code compiles, TypeScript strict, no broken imports

## Dev Instructions (README)
Provide setup steps:
- npm install
- add env vars
- run schema.sql in Supabase
- npm run dev
- where to see pages

## Additional Notes
- Use Server Components where helpful, but API routes should handle DB writes.
- Keep code clean and readable (typed helpers).
- Don’t overbuild: prioritize working MVP.

END
