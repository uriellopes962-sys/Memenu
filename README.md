# Plan Antiinflamatorio

App de menús saludables para un déficit calórico antiinflamatorio, con
cuentas de usuario y menús guardados por perfil.

## Stack
- Next.js 14 (App Router)
- Supabase (Postgres) para usuarios y menús guardados, accedido por el
  servidor con la service_role key (bypassa RLS; nunca se expone al cliente)
- Autenticación propia: contraseñas con bcrypt, sesión firmada con JWT en cookie httpOnly

## Configuración

1. En Supabase → SQL Editor, corre una vez el contenido de `supabase-schema.sql`.
2. En Vercel → Settings → Environment Variables, agrega:
   - `PUBLIC_SUPABASE_URL` (ya la tienes)
   - `SUPABASE_SERVICE_ROLE_KEY` (Supabase → Project Settings → API Keys → service_role)
   - `SESSION_SECRET` (cualquier cadena larga y aleatoria)
3. Redeploy.

## Desarrollo local

```bash
cp .env.example .env.local   # y rellena las variables
npm install
npm run dev
```
