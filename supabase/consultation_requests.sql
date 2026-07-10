-- Run this once in the Supabase SQL editor for your project.

create table if not exists public.consultation_requests (
  id bigint generated always as identity primary key,
  name text not null,
  phone text not null,
  email text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'reached_out')),
  is_favorite boolean not null default false,
  read_at timestamptz,
  reached_out_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists consultation_requests_created_at_idx
  on public.consultation_requests (created_at desc);

alter table public.consultation_requests enable row level security;
