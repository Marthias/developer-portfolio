-- Technologies

create policy "Public can view technologies"
on public.technologies
for select
to anon, authenticated
using (true);


create policy "Admins can create technologies"
on public.technologies
for insert
to authenticated
with check (public.is_admin());


create policy "Admins can update technologies"
on public.technologies
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can delete technologies"
on public.technologies
for delete
to authenticated
using (public.is_admin());


-- Project Media

create policy "Public can view project media"
on public.project_media
for select
to anon, authenticated
using (true);


create policy "Admins can create project media"
on public.project_media
for insert
to authenticated
with check (public.is_admin());


create policy "Admins can update project media"
on public.project_media
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can delete project media"
on public.project_media
for delete
to authenticated
using (public.is_admin());


-- Project Technologies

create policy "Public can view project technologies"
on public.project_technologies
for select
to anon, authenticated
using (true);


create policy "Admins can create project technologies"
on public.project_technologies
for insert
to authenticated
with check (public.is_admin());


create policy "Admins can delete project technologies"
on public.project_technologies
for delete
to authenticated
using (public.is_admin());


-- Skills

create policy "Public can view skills"
on public.skills
for select
to anon, authenticated
using (true);


create policy "Admins can create skills"
on public.skills
for insert
to authenticated
with check (public.is_admin());


create policy "Admins can update skills"
on public.skills
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can delete skills"
on public.skills
for delete
to authenticated
using (public.is_admin());


-- Experience

create policy "Public can view experience"
on public.experience
for select
to anon, authenticated
using (true);


create policy "Admins can create experience"
on public.experience
for insert
to authenticated
with check (public.is_admin());


create policy "Admins can update experience"
on public.experience
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can delete experience"
on public.experience
for delete
to authenticated
using (public.is_admin());


-- Education

create policy "Public can view education"
on public.education
for select
to anon, authenticated
using (true);


create policy "Admins can create education"
on public.education
for insert
to authenticated
with check (public.is_admin());


create policy "Admins can update education"
on public.education
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can delete education"
on public.education
for delete
to authenticated
using (public.is_admin());


-- Certifications

create policy "Public can view certifications"
on public.certifications
for select
to anon, authenticated
using (true);


create policy "Admins can create certifications"
on public.certifications
for insert
to authenticated
with check (public.is_admin());


create policy "Admins can update certifications"
on public.certifications
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());


create policy "Admins can delete certifications"
on public.certifications
for delete
to authenticated
using (public.is_admin());