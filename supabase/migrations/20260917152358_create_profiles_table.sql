create table public.profiles (
    id uuid primary key
        references auth.users(id)
        on delete cascade,

    role text not null default 'user',

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint profiles_role_check
        check (
            role in (
                'user',
                'admin'
            )
        )
);