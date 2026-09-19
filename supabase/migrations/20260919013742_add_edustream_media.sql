insert into public.project_media (
    project_id,
    media_type,
    url,
    alt_text,
    display_order
)
select
    p.id,
    'image',
    'https://pyjdspstrqrtopuophol.supabase.co/storage/v1/object/public/project-media/projects/EduStream/logo.jpg',
    'EduStream logo',
    0
from public.projects p
where p.slug = 'edustream'
  and not exists (
      select 1
      from public.project_media pm
      where pm.project_id = p.id
        and pm.url = 'https://pyjdspstrqrtopuophol.supabase.co/storage/v1/object/public/project-media/projects/EduStream/logo.jpg'
  );