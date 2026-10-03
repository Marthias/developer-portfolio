create policy "Admins can upload project media"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'project-media'
    and public.is_admin()
);