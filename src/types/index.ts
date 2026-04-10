export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  due_date: string | null;
  priority: 'low' | 'medium' | 'high';
  project_id: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
  tags?: Tag[];
}

export interface Project {
  id: string;
  name: string;
  description: string | null;
  color: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  task_count?: number;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  user_id: string;
  created_at: string;
}

export interface TaskTag {
  id: string;
  task_id: string;
  tag_id: string;
  created_at: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';

export interface CreateTaskInput {
  title: string;
  description?: string | null;
  due_date?: string | null;
  priority?: TaskPriority;
  project_id?: string | null;
  tag_ids?: string[];
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  completed?: boolean;
  due_date?: string | null;
  priority?: TaskPriority;
  project_id?: string | null;
  tag_ids?: string[];
}

export interface CreateProjectInput {
  name: string;
  description?: string | null;
  color?: string;
}

export interface CreateTagInput {
  name: string;
  color?: string;
}