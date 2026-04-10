'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string | null;
  color: string;
  taskCount?: number;
  onClick: () => void;
  onDelete: () => void;
}

export function ProjectCard({
  name,
  description,
  color,
  taskCount,
  onClick,
  onDelete,
}: ProjectCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    onDelete();
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative p-4 rounded-lg border cursor-pointer transition-all',
        'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700',
        'hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md'
      )}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          )}
          {taskCount !== undefined && (
            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              {taskCount} tasks
            </p>
          )}
        </div>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-50"
          title="Delete project"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}