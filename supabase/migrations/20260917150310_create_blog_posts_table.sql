create table public.blog_posts (
    id uuid primary key default gen_random_uuid(),

    title text not null,

    slug text not null unique,

    excerpt text,

    content text not null,

    cover_image_url text,

    status text not null default 'draft',

    published_at timestamptz,

    created_at timestamptz not null default now(),

    updated_at timestamptz not null default now(),

    constraint blog_posts_status_check
        check (
            status in (
                'draft',
                'published',
                'archived'
            )
        ),

    constraint blog_posts_published_date_check
        check (
            status <> 'published'
            or published_at is not null
        )
);