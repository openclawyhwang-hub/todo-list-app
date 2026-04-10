'use client';

import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectForm } from './ProjectForm';
import { Button } from '@/components/ui';
import { useTaskStore } from '@/store/useTaskStore';
import type { Project, CreateProjectInput } from '@/types';

interface ProjectListProps {
  userId: string;
  onViewProject: (id: string) => void;
}

export function ProjectList({ userId, onViewProject }: ProjectListProps) {
  const { projects, fetchProjects, createProject, deleteProject } = useTaskStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch projects on mount
  useState(() => {
    fetchProjects();
  });

  const handleCreate = async (data: CreateProjectInput) => {
    await createProject({
      ...data,
      user_id: userId,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
        <Button onClick={() => setIsFormOpen(true)}>+ New Project</Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No projects yet. Create one to organize your tasks!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
              onClick={() => onViewProject(project.id)}
              onDelete={() => handleDelete(project.id)}
            />
          ))}
        </div>
      )}

      <ProjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreate}
      />
    </div>
  );
}