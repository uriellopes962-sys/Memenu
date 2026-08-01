# Plan Antiinflamatorio

App de menús saludables para un déficit calórico antiinflamatorio, con
cuentas de usuario y menús guardados por perfil.

## Stack
- Next.js 14 (App Router)
- Postgres (vía la integración de Storage de Vercel) para usuarios y menús guardados
- Autenticación propia: contraseñas con bcrypt, sesión firmada con JWT en cookie httpOnly

## Deploy en Vercel

1. Importa este repo en Vercel.
2. Ve a **Storage → Create Database → Postgres** y conéctala al proyecto
   (esto añade automáticamente la variable `POSTGRES_URL`).
3. En **Settings → Environment Variables**, añade `SESSION_SECRET` con
   cualquier cadena aleatoria larga.
4. Redeploy. Las tablas `users` y `weeks` se crean solas en el primer request.

## Desarrollo local

```bash
cp .env.example .env.local   # y rellena las variables
npm install
npm run dev
```
