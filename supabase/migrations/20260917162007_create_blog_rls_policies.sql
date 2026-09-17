create policy "Public can view published blog posts"
on public.blog_posts
for select
to anon, authenticated
using (
    status = 'published'
);


create policy "Admins can view all blog posts"
on public.blog_posts
for select
to authenticated
using (
    public.is_admin()
);


create policy "Admins can create blog posts"
on public.blog_posts
for insert
to authenticated
with check (
    public.is_admin()
);


create policy "Admins can update blog posts"
on public.blog_posts
for update
to authenticated
using (
    public.is_admin()
)
with check (
    public.is_admin()
);


create policy "Admins can delete blog posts"
on public.blog_posts
for delete
to authenticated
using (
    public.is_admin()
);