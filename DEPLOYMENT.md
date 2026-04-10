# 🚀 Deployment Guide

## Quick Deploy to Vercel

### Option 1: Vercel Dashboard (Recommended)

1. **Go to [Vercel](https://vercel.com)**
2. **Click "Add New Project"**
3. **Import your GitHub repository**: `openclawyhwang-hub/todo-list-app`
4. **Configure environment variables**:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. **Click "Deploy"**

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd /Users/elon/Projects/todo-list-app
vercel --prod
```

## Environment Variables Setup

### Clerk Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Go to API Keys
4. Copy the keys:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_`)
   - `CLERK_SECRET_KEY` (starts with `sk_test_`)

### Supabase Setup

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Go to Project Settings > API
4. Copy the keys:
   - `NEXT_PUBLIC_SUPABASE_URL` (your project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (anon/public key)
   - `SUPABASE_SERVICE_ROLE_KEY` (service role key - keep secret!)

### Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tasks table
CREATE TABLE tasks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
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

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3B82F6',
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tags table
CREATE TABLE tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Task-Tags junction table
CREATE TABLE task_tags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_tags ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "user_tasks_select" ON tasks FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "user_tasks_insert" ON tasks FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "user_tasks_update" ON tasks FOR UPDATE USING (auth.uid()::text = user_id);
CREATE POLICY "user_tasks_delete" ON tasks FOR DELETE USING (auth.uid()::text = user_id);

CREATE POLICY "user_projects_select" ON projects FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "user_projects_insert" ON projects FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "user_projects_update" ON projects FOR UPDATE USING (auth.uid()::text = user_id);
CREATE POLICY "user_projects_delete" ON projects FOR DELETE USING (auth.uid()::text = user_id);

CREATE POLICY "user_tags_select" ON tags FOR SELECT USING (auth.uid()::text = user_id);
CREATE POLICY "user_tags_insert" ON tags FOR INSERT WITH CHECK (auth.uid()::text = user_id);
CREATE POLICY "user_tags_delete" ON tags FOR DELETE USING (auth.uid()::text = user_id);

CREATE POLICY "user_task_tags_select" ON task_tags FOR SELECT 
  USING (EXISTS (SELECT 1 FROM tasks WHERE tasks.id = task_tags.task_id AND tasks.user_id = auth.uid()::text));
CREATE POLICY "user_task_tags_insert" ON task_tags FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM tasks WHERE tasks.id = task_tags.task_id AND tasks.user_id = auth.uid()::text));
CREATE POLICY "user_task_tags_delete" ON task_tags FOR DELETE 
  USING (EXISTS (SELECT 1 FROM tasks WHERE tasks.id = task_tags.task_id AND tasks.user_id = auth.uid()::text));

-- Indexes for performance
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_completed ON tasks(completed);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_tags_user_id ON tags(user_id);
```

## Post-Deployment Checklist

- [ ] All environment variables are set in Vercel
- [ ] Database tables are created in Supabase
- [ ] Row Level Security policies are configured
- [ ] Clerk authentication is working
- [ ] Test creating, updating, and deleting tasks
- [ ] Test project creation and management
- [ ] Test tag functionality

## Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local with your keys
# Run development server
npm run dev

# Open http://localhost:3000
```

## Production URLs

- **GitHub Repository**: https://github.com/openclawyhwang-hub/todo-list-app
- **Vercel Deployment**: (Will be generated after deployment)

---

For support, please open an issue on GitHub.
