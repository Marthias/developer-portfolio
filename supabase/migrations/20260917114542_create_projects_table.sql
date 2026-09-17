create table public.projects (
    id uuid primary key default gen_random_uuid(),

    title text not null,

    slug text not null unique,

    short_description text not null,

    description text not null,

    github_url text,

    live_url text,

    status text not null default 'completed',

    featured boolean not null default false,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint projects_status_check
        check (status in ('planned', 'in_progress', 'completed', 'archived'))
);