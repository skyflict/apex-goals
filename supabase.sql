create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  level text,
  progress integer not null default 0,
  days_left integer not null default 0,
  category text not null,
  next_action text not null default '',
  next_duration text,
  color text not null default '#E89930',
  streak integer,
  milestones jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.goal_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  goal_id uuid references public.goals(id) on delete set null,
  input jsonb not null,
  response jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.goals enable row level security;
alter table public.goal_plans enable row level security;

drop policy if exists "Users can read own goals" on public.goals;
drop policy if exists "Users can insert own goals" on public.goals;
drop policy if exists "Users can update own goals" on public.goals;
drop policy if exists "Users can delete own goals" on public.goals;
drop policy if exists "Users can read own plans" on public.goal_plans;
drop policy if exists "Users can insert own plans" on public.goal_plans;

create policy "Users can read own goals"
on public.goals for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own goals"
on public.goals for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update own goals"
on public.goals for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete own goals"
on public.goals for delete
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can read own plans"
on public.goal_plans for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can insert own plans"
on public.goal_plans for insert
to authenticated
with check ((select auth.uid()) = user_id);
