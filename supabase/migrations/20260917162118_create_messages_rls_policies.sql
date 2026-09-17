create policy "Anyone can submit contact messages"
on public.messages
for insert
to anon, authenticated
with check (
    true
);


create policy "Admins can view messages"
on public.messages
for select
to authenticated
using (
    public.is_admin()
);


create policy "Admins can update messages"
on public.messages
for update
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


create policy "Admins can delete messages"
on public.messages
for delete
to authenticated
using (
    public.is_admin()
);