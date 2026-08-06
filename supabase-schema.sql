-- Ejecuta esto UNA VEZ en Supabase → SQL Editor → New query → Run

create table if not exists weeks (
  id bigint generated always as identity primary key,
  data jsonb not null,
  saved_at timestamptz default now()
);

create table if not exists favorites (
  id bigint generated always as identity primary key,
  meal_id text not null unique,
  saved_at timestamptz default now()
);

-- RLS activado por defecto en proyectos nuevos de Supabase. El servidor
-- accede con la service_role key, así que RLS no le afecta a él; esto
-- solo evita que alguien lea/escriba la tabla directamente desde el
-- navegador con la clave pública (publishable/anon).
alter table weeks enable row level security;
alter table favorites enable row level security;
