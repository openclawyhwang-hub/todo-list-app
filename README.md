# Todo List App

A modern Todo List application built with Next.js 14, Clerk, and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)

## ✨ Features

- ✅ **User Authentication** - Secure login with Clerk
- ✅ **Task Management** - Full CRUD operations for tasks
- ✅ **Project Organization** - Group tasks into projects
- ✅ **Tag System** - Categorize tasks with custom tags
- ✅ **Priority Levels** - Set task priority (low, medium, high)
- ✅ **Due Dates** - Track task deadlines
- ✅ **Real-time Updates** - Instant sync with Supabase
- ✅ **Modern UI** - Beautiful design with Tailwind CSS
- ✅ **Responsive** - Works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Authentication**: Clerk
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Clerk account (free tier available)
- Supabase account (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/openclawyhwang-hub/todo-list-app.git
cd todo-list-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

4. **Set up Supabase database**

Run the following SQL in your Supabase SQL Editor:

```sql
-- Create tasks table
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT false,
  due_date DATE,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  project_id UUID REFERENCES projects(id),
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tags table
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create task_tags junction table
CREATE TABLE task_tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for tasks
CREATE POLICY "Users can view their own tasks"
  ON tasks FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own tasks"
  ON tasks FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own tasks"
  ON tasks FOR UPDATE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own tasks"
  ON tasks FOR DELETE
  USING (auth.uid()::text = user_id);

-- Similar policies for projects, tags, and task_tags
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own tags"
  ON tags FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own tags"
  ON tags FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own tags"
  ON tags FOR DELETE
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can view their own task_tags"
  ON task_tags FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tasks WHERE tasks.id = task_tags.task_id AND tasks.user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can insert their own task_tags"
  ON task_tags FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tasks WHERE tasks.id = task_tags.task_id AND tasks.user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can delete their own task_tags"
  ON task_tags FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM tasks WHERE tasks.id = task_tags.task_id AND tasks.user_id = auth.uid()::text
    )
  );
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard page
│   ├── projects/[id]/    # Project detail pages
│   ├── layout.tsx        # Root layout with Clerk
│   └── page.tsx          # Landing page
├── components/
│   ├── projects/         # Project components
│   ├── tasks/            # Task components
│   └── ui/               # Reusable UI components
├── lib/
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Utility functions
├── store/
│   └── useTaskStore.ts   # Zustand store
└── types/
    └── index.ts          # TypeScript types
```

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub** (already done)

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Set environment variables in Vercel**
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for anything!

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.com/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

Built with ❤️ by Elon Wang
