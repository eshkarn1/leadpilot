create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text null,
  company text null,
  service_needed text not null,
  message text null,
  source text not null default 'form',
  status text not null default 'new',
  ai_summary text null,
  ai_intent text null,
  ai_score int null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
