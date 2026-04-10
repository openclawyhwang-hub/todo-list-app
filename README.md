# Todo List App

A modern Todo List application built with Next.js 14, Clerk, and Supabase.

## Features

- ✅ User authentication with Clerk
- ✅ Task CRUD operations
- ✅ Project management
- ✅ Tag system
- ✅ Real-time updates with Supabase

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Clerk account
- Supabase account

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

### Development

```bash
npm run dev
```

### Deployment

Deploy to Vercel:

```bash
vercel
```

## License

MIT
