create table public.messages (
    id uuid primary key default gen_random_uuid(),

    name text not null,

    email text not null,

    subject text,

    message text not null,

    is_read boolean not null default false,

    created_at timestamptz not null default now()
);