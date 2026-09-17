create table public.technologies (
    id uuid primary key default gen_random_uuid(),
    name text not null unique,
    category text not null,
    icon text,
    website_url text,
    created_at timestamptz not null default now()
);