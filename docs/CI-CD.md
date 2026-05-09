# Next.js + Vercel CI/CD Guide

This guide explains how to deploy a **Next.js** project to **Vercel** using **GitHub**, **Prisma**, and **PostgreSQL**.

---

# 1. Project Structure

```txt
project/
├── src/
├── prisma/
├── public/
├── .env
├── package.json
└── next.config.ts
```

---

# 2. Install Dependencies

Install project dependencies:

```bash
npm install
```

Install Prisma:

```bash
npm install prisma @prisma/client
```

Generate Prisma client:

```bash
npx prisma generate
```

---

# 3. Environment Variables

Create `.env`

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"

NEXT_PUBLIC_SITE_URL="https://your-project.vercel.app"

JWT_SECRET="your-secret-key"
```

---

# 4. Prisma Setup

Initialize Prisma:

```bash
npx prisma init
```

Run migration:

```bash
npx prisma migrate dev --name init
```

Generate client:

```bash
npx prisma generate
```

---

# 5. Local Build Test

Always test before push:

```bash
npm run build
```

Run production locally:

```bash
npm run start
```

If build fails, fix locally first.

---

# 6. Git Workflow

Initialize Git:

```bash
git init
```

Add remote:

```bash
git remote add origin YOUR_GITHUB_REPO_URL
```

Push code:

```bash
git add .
git commit -m "initial deploy"
git push origin main
```

---

# 7. Vercel Deployment

Open Vercel:

https://vercel.com

Steps:

1. Login
2. Click **Add New Project**
3. Import GitHub repository
4. Select project
5. Framework preset: **Next.js**
6. Click **Deploy**

---

# 8. Add Environment Variables in Vercel

Open:

Project → Settings → Environment Variables

Add:

## DATABASE_URL

```env
postgresql://USER:PASSWORD@HOST:5432/DB_NAME
```

## NEXT_PUBLIC_SITE_URL

```env
https://your-project.vercel.app
```

## JWT_SECRET

```env
your-secret-key
```

Save.

---

# 9. package.json Setup

Add `postinstall` script.

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "postinstall": "prisma generate"
  }
}
```

This fixes Prisma issues on Vercel.

---

# 10. Build Settings in Vercel

Build command:

```bash
npm run build
```

Install command:

```bash
npm install
```

Output:

```txt
.next
```

---

# 11. Common Fixes

---

## Prisma Client Initialization Error

Error:

```txt
@prisma/client did not initialize yet
```

Fix:

```bash
npx prisma generate
```

---

## Manifest Error

Error:

```txt
page_client-reference-manifest.js
```

Fix:

### Remove duplicate home page

Wrong:

```txt
app/page.tsx
app/(user)/page.tsx
```

Correct:

```txt
app/(user)/page.tsx
```

Only one home page.

---

## Clear Cache

Windows CMD:

```bash
rmdir /s /q .next
```

Linux/Mac:

```bash
rm -rf .next
```

Then:

```bash
npm run build
```

---

## Database Connection Error

Error:

```txt
Can't reach database server
```

Fix:

- Check database is public
- Check DATABASE_URL
- Never use localhost on Vercel

Wrong:

```env
localhost:5432
```

Correct:

```env
your-db-host.com:5432
```

---

# 12. Deploy Update

After code changes:

```bash
git add .
git commit -m "update"
git push origin main
```

Vercel auto deploys.

---

# 13. Force Redeploy

Open:

Vercel → Deployments

Click:

**Redeploy → Without Build Cache**

---

# 14. Production Checklist

Before production:

- [ ] `npm run build` passes
- [ ] Prisma generated
- [ ] Environment variables added
- [ ] Database public
- [ ] Git pushed
- [ ] Vercel deployment green

---

# Useful Commands

```bash
npx prisma generate
npm run build
npm run start
git add .
git commit -m "deploy"
git push origin main
```

---