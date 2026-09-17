create policy "Public can view active projects"
on public.projects
for select
to anon, authenticated
using (
    status in ('completed', 'in_progress')
);


create policy "Admins can view all projects"
on public.projects
for select
to authenticated
using (
    public.is_admin()
);


create policy "Admins can create projects"
on public.projects
for insert
to authenticated
with check (
    public.is_admin()
);


create policy "Admins can update projects"
on public.projects
for update
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


create policy "Admins can delete projects"
on public.projects
for delete
to authenticated
using (
    public.is_admin()
);