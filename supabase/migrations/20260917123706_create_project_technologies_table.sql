create table public.project_technologies (
    project_id uuid not null,
    technology_id uuid not null,

    created_at timestamptz not null default now(),

    constraint project_technologies_pkey
        primary key (project_id, technology_id),

    constraint project_technologies_project_id_fkey
        foreign key (project_id)
        references public.projects(id)
        on delete cascade,

    constraint project_technologies_technology_id_fkey
        foreign key (technology_id)
        references public.technologies(id)
        on delete cascade
);