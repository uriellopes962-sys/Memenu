# Plan Antiinflamatorio

App de menús saludables para un déficit calórico antiinflamatorio.
Sin cuentas de usuario: los menús guardados son compartidos por quien use la app.

## Stack
- Next.js 14 (App Router)
- Supabase (Postgres) solo para guardar/recuperar semanas de menús,
  accedido por el servidor con la service_role key

## Configuración

1. En Supabase → SQL Editor, corre una vez el contenido de `supabase-schema.sql`.
2. En Vercel → Settings → Environment Variables, agrega:
   - `PUBLIC_SUPABASE_URL` (ya la tienes)
   - `SUPABASE_SERVICE_ROLE_KEY` (Supabase → Project Settings → API Keys → service_role)
3. Redeploy.

## Desarrollo local

```bash
cp .env.example .env.local   # y rellena las variables
npm install
npm run dev
```
