create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid(),
  dia date not null default current_date,
  tipo text not null check (tipo in ('gasto','entrada')),
  valor numeric(12,2) not null check (valor > 0),
  categoria text not null default 'Outros',
  descricao text default ''
);
alter table public.transactions enable row level security;
create policy "so o dono" on public.transactions
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
