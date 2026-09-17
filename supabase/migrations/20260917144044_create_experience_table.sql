create table public.experience (
    id uuid primary key default gen_random_uuid(),

    company text not null,

    role text not null,

    location text,

    employment_type text not null,

    start_date date not null,

    end_date date,

    description text not null,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint experience_employment_type_check
        check (
            employment_type in (
                'full_time',
                'part_time',
                'internship',
                'contract',
                'freelance',
                'volunteer'
            )
        ),

    constraint experience_date_check
        check (
            end_date is null
            or end_date >= start_date
        )
);