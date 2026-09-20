create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());