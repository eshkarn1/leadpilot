# LeadPilot

LeadPilot is a portfolio-grade SaaS MVP for capturing inbound leads, storing them in Supabase, and managing them in a lightweight dashboard.

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres)
- Zod validation

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in the Supabase credentials in `.env.local`.
4. Run the database schema in `db/schema.sql` inside your Supabase SQL editor.
5. Start the dev server:
   ```bash
   npm run dev
   ```

## Pages
- Landing page: `http://localhost:3000/`
- Thank you page: `http://localhost:3000/thank-you`
- Dashboard: `http://localhost:3000/dashboard/leads`

## Notes
- AI enrichment is stubbed for Milestone A. The `lib/ai/enrichLead.ts` helper currently returns null values.
- The API routes live under `app/api/leads`.
