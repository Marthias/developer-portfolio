create table public.education (
    id uuid primary key default gen_random_uuid(),

    institution text not null,

    qualification text not null,

    field_of_study text,

    location text,

    start_date date not null,

    end_date date,

    description text,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint education_date_check
        check (
            end_date is null
            or end_date >= start_date
        )
);