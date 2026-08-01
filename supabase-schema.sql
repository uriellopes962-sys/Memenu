-- Ejecuta esto UNA VEZ en Supabase → SQL Editor → New query → Run

create table if not exists users (
  id bigint generated always as identity primary key,
  username text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

create table if not exists weeks (
  id bigint generated always as identity primary key,
  user_id bigint not null references users(id) on delete cascade,
  data jsonb not null,
  saved_at timestamptz default now()
);

-- RLS queda activado por defecto en proyectos nuevos de Supabase, pero como
-- el servidor accede con la service_role key, RLS no le aplica a él.
-- Lo activamos igual para que nadie pueda leer estas tablas directamente
-- desde el navegador con la clave pública (publishable/anon).
alter table users enable row level security;
alter table weeks enable row level security;
