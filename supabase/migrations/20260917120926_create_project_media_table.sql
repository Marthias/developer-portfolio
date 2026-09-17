create table public.project_media (
    id uuid primary key default gen_random_uuid(),

    project_id uuid not null,

    media_type text not null,

    url text not null,

    alt_text text,

    display_order integer not null default 0,

    created_at timestamptz not null default now(),

    constraint project_media_project_id_fkey
        foreign key (project_id)
        references public.projects(id)
        on delete cascade,

    constraint project_media_type_check
        check (
            media_type in (
                'image',
                'video',
                'diagram'
            )
        )
);