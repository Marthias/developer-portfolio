create table public.skills (
    id uuid primary key default gen_random_uuid(),

    name text not null unique,

    category text not null,

    description text,

    display_order integer not null default 0,

    created_at timestamptz not null default now(),

    constraint skills_category_check
        check (
            category in (
                'programming',
                'frontend',
                'backend',
                'database',
                'devops',
                'tools',
                'concepts'
            )
        )
);