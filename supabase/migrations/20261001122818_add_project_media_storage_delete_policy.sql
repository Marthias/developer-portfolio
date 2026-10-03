create policy "Admins can delete project media"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'project-media'
    and public.is_admin()
);