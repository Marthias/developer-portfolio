create table public.certifications (
    id uuid primary key default gen_random_uuid(),

    name text not null,

    issuing_organization text not null,

    issue_date date not null,

    expiry_date date,

    credential_id text,

    credential_url text,

    description text,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint certifications_date_check
        check (
            expiry_date is null
            or expiry_date >= issue_date
        )
);