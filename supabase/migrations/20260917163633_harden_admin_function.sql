revoke execute
on function public.is_admin()
from public;

grant execute
on function public.is_admin()
to authenticated;