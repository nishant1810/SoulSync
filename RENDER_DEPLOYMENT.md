# Deploying SoulSync on Render

This guide outlines the steps to deploy **SoulSync** as a Node.js Web Service on [Render](https://render.com).

---

## Prerequisites

1. A [Render account](https://dashboard.render.com).
2. The SoulSync repository pushed to GitHub or GitLab.
3. Your database and third-party API credentials (from `.env`):
   - **PostgreSQL / Supabase** (`DATABASE_URL`, `DIRECT_URL`)
   - **Kinde Auth** (`KINDE_CLIENT_ID`, `KINDE_CLIENT_SECRET`, `KINDE_ISSUER_URL`)
   - **Cloudinary** (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`)
   - **Google Gemini** (`GEMINI_API_KEY`)
   - **Upstash Redis** (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`)
   - **Default User ID** (`DEFAULT_USER_ID`)

---

## Method 1: Deploy with Blueprint (Recommended)

SoulSync includes a [`render.yaml`](./render.yaml) file configured with the required build and start commands.

1. Go to your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Blueprint**.
3. Select and connect your repository (`nishant1810/SoulSync`).
4. Render will read `render.yaml` and prompt you to enter the environment variables.
5. Fill in the required environment variables (see below) and click **Apply**.
6. Render will automatically build and deploy your service.

---

## Method 2: Manual Web Service Setup

If you prefer configuring the Web Service manually via Render Dashboard:

1. Click **New +** > **Web Service**.
2. Select your repository: `nishant1810/SoulSync`.
3. Configure the service settings:
   - **Name**: `soulsync`
   - **Region**: Select your preferred region (e.g. *Oregon, US West* or *Frankfurt, EU*)
   - **Branch**: `master` (or your active branch)
   - **Root Directory**: Leave blank (root)
   - **Runtime**: `Node`
   - **Build Command**:
     ```bash
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command**:
     ```bash
     npm run start -- -p $PORT
     ```
   - **Instance Type**: `Free` (or `Starter` for production)
4. In the **Environment Variables** section, add the following variables:

| Key | Example / Description |
|---|---|
| `NODE_VERSION` | `22` |
| `DATABASE_URL` | Supabase pooler or PostgreSQL connection string |
| `DIRECT_URL` | Direct PostgreSQL connection string (for migrations) |
| `KINDE_CLIENT_ID` | Your Kinde M2M / App Client ID |
| `KINDE_CLIENT_SECRET` | Your Kinde Client Secret |
| `KINDE_ISSUER_URL` | e.g. `https://<your-subdomain>.kinde.com` |
| `KINDE_SITE_URL` | `https://<your-app-name>.onrender.com` |
| `KINDE_POST_LOGOUT_REDIRECT_URL` | `https://<your-app-name>.onrender.com` |
| `KINDE_POST_LOGIN_REDIRECT_URL` | `https://<your-app-name>.onrender.com` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`| Cloudinary unsigned upload preset |
| `GEMINI_API_KEY` | Google Gemini API key |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST Token |
| `DEFAULT_USER_ID` | Default user ID for initial seeding/samples |

5. Click **Create Web Service**.

---

## Critical Post-Deployment Step: Update Kinde Auth

Once Render creates your web service, you will receive an assigned URL such as:
`https://soulsync.onrender.com`

You **must** register this URL in the [Kinde Management Console](https://app.kinde.com):

1. Go to **Settings** > **Applications** > Select your SoulSync Next.js Application.
2. Under **Callback URLs**, add:
   ```
   https://<your-app-name>.onrender.com/api/auth/kinde_callback
   ```
3. Under **Allowed logout redirect URLs**, add:
   ```
   https://<your-app-name>.onrender.com
   ```
4. Click **Save**.

---

## Database Initialization (Prisma)

If your database schema has not been pushed yet, you can push it directly from your local terminal:

```bash
npx prisma db push
```

To seed initial categories:

```bash
npx ts-node scripts/seed.ts
```
