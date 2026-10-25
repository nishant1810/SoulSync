# SoulSync 🌟

**SoulSync** is an AI-powered companion platform designed for conversational interactions with personalized AI companions, specializing in medical and expert domains (e.g., Cardiologist, Neurologist, Dermatologist, Psychiatrist, and more).

Built with **Next.js 15 (App Router)**, **React 19**, **Google Gemini**, **Prisma**, **PostgreSQL**, **Upstash Redis**, and **Kinde Auth**.

---

## ✨ Features

- 🤖 **Custom AI Companions**: Create, edit, and configure custom companions with unique instructions, avatars, domain categories, and seed dialogues.
- 💬 **Interactive AI Chat**: Real-time conversation powered by Google Gemini and LangChain.
- 🧠 **Context & Memory Management**: Vector embeddings and caching for conversational context.
- 🔒 **Secure Authentication**: User management and authentication powered by Kinde Auth.
- ⚡ **Rate Limiting**: Protects API routes and AI endpoints with Upstash Redis token-bucket rate limiting.
- 🖼️ **Image Management**: Seamless avatar uploads and optimization via Cloudinary.
- 🌓 **Modern UI & Themes**: Responsive interface with dark and light mode support using Tailwind CSS and Radix UI.
- 🚀 **Production-Ready**: Pre-configured for deployment on Render with Infrastructure-as-Code (`render.yaml`).
- 📊 **Load Testing Suite**: Automated performance, stress, spike, and volume testing configurations using Artillery.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router, Server Components, API routes)
- **Frontend**: [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com), [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev)
- **AI & LLM**: [Google Gemini](https://ai.google.dev), [LangChain](https://www.langchain.com)
- **Database & ORM**: [PostgreSQL](https://www.postgresql.org) (via Supabase), [Prisma ORM](https://www.prisma.io)
- **Caching & Rate Limiting**: [Upstash Redis](https://upstash.com)
- **Authentication**: [Kinde Auth](https://kinde.com)
- **Media Storage**: [Cloudinary](https://cloudinary.com)
- **Deployment**: [Render](https://render.com)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org) (v22.x recommended)
- `npm` (v10+ or latest)
- A PostgreSQL database (e.g., [Supabase](https://supabase.com))

### 1. Clone the Repository

```bash
git clone https://github.com/nishant1810/SoulSync.git
cd SoulSync
```

### 2. Install Dependencies

```bash
npm install
```

> **Note**: `npm install` automatically triggers `prisma generate` to compile the Prisma Client.

### 3. Configure Environment Variables

Create a `.env` file in the project root based on `.env.sample`:

```bash
cp .env.sample .env
```

Fill in your configuration values:

```env
# Kinde Authentication
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://<your-subdomain>.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000

# Database (Supabase / PostgreSQL)
DATABASE_URL=your_pooled_database_url
DIRECT_URL=your_direct_database_url

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token

# Default User
DEFAULT_USER_ID=your_default_user_id
```

### 4. Setup Database & Seed Initial Data

Push your Prisma schema to your database:

```bash
npx prisma db push
```

Seed default medical companion categories:

```bash
npx ts-node scripts/seed.ts
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Compile Next.js production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint checks |
| `npm run lint:fix` | Automatically fix ESLint issues |
| `npm run test:load` | Run default Artillery load test |
| `npm run test:load:quick` | Run quick Artillery load test |
| `npm run test:load:stress`| Run stress load test |
| `npm run test:load:spike` | Run spike load test |
| `npm run test:load:volume`| Run volume load test |

---

## 🌐 Deployment on Render

SoulSync includes a [`render.yaml`](./render.yaml) blueprint file for easy deployment as a Node.js Web Service on Render:

1. Push your code to GitHub.
2. In your [Render Dashboard](https://dashboard.render.com), click **New +** > **Blueprint**.
3. Select this repository (`SoulSync`).
4. Enter the required environment variables when prompted and click **Apply**.
5. Once your app is live, update your Kinde Auth callback URLs with your Render domain:
   - Callback URL: `https://<your-app>.onrender.com/api/auth/kinde_callback`
   - Logout redirect URL: `https://<your-app>.onrender.com`

For full details and troubleshooting, see the [Render Deployment Guide](./RENDER_DEPLOYMENT.md).

---

## 📄 License

This project is licensed under the MIT License.
