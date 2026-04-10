import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/lib/supabase';

type Task = Database['public']['Tables']['tasks']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];

interface TaskState {
  tasks: Task[];
  projects: Project[];
  tags: Tag[];
  loading: boolean;
  error: string | null;
  
  // Tasks
  fetchTasks: () => Promise<void>;
  createTask: (task: Database['public']['Tables']['tasks']['Insert']) => Promise<void>;
  updateTask: (id: string, task: Database['public']['Tables']['tasks']['Update']) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string, completed: boolean) => Promise<void>;
  
  // Projects
  fetchProjects: () => Promise<void>;
  createProject: (project: Database['public']['Tables']['projects']['Insert']) => Promise<void>;
  updateProject: (id: string, project: Database['public']['Tables']['projects']['Update']) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  // Tags
  fetchTags: () => Promise<void>;
  createTag: (tag: Database['public']['Tables']['tags']['Insert']) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  projects: [],
  tags: [],
  loading: false,
  error: null,

  // Tasks
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*, task_tags(tag_id)')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ tasks: data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('tasks').insert([task]);
      if (error) throw error;
      await get().fetchTasks();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateTask: async (id, task) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('tasks').update(task).eq('id', id);
      if (error) throw error;
      await get().fetchTasks();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteTask: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id);
      if (error) throw error;
      await get().fetchTasks();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  toggleTask: async (id, completed) => {
    await get().updateTask(id, { completed });
  },

  // Projects
  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ projects: data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createProject: async (project) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('projects').insert([project]);
      if (error) throw error;
      await get().fetchProjects();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateProject: async (id, project) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('projects').update(project).eq('id', id);
      if (error) throw error;
      await get().fetchProjects();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      await get().fetchProjects();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  // Tags
  fetchTags: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      set({ tags: data || [], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createTag: async (tag) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('tags').insert([tag]);
      if (error) throw error;
      await get().fetchTags();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteTag: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('tags').delete().eq('id', id);
      if (error) throw error;
      await get().fetchTags();
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
