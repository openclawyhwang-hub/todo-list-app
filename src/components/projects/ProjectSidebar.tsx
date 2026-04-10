"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { useUser } from "@clerk/nextjs";
import { Folder, Plus, X } from "lucide-react";

export default function ProjectSidebar() {
  const { user } = useUser();
  const { projects, createProject } = useTaskStore();
  const [showNewProject, setShowNewProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectColor, setNewProjectColor] = useState("#3B82F6");

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newProjectName.trim()) return;

    await createProject({
      name: newProjectName,
      color: newProjectColor,
      user_id: user.id,
      description: null,
    });

    setNewProjectName("");
    setShowNewProject(false);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Todo App</h2>
        <p className="text-xs text-gray-500">Manage your tasks</p>
      </div>

      <nav className="space-y-1">
        <a
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-blue-50 text-blue-700"
        >
          <Folder size={18} />
          Dashboard
        </a>
      </nav>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Projects
          </h3>
          <button
            onClick={() => setShowNewProject(true)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <Plus size={16} />
          </button>
        </div>

        {showNewProject && (
          <form onSubmit={handleCreateProject} className="mb-4 p-3 bg-gray-50 rounded-md">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded mb-2"
              autoFocus
            />
            <input
              type="color"
              value={newProjectColor}
              onChange={(e) => setNewProjectColor(e.target.value)}
              className="w-full h-8 mb-2"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 px-2 py-1 text-xs bg-blue-600 text-white rounded"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => setShowNewProject(false)}
                className="flex-1 px-2 py-1 text-xs bg-gray-200 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="space-y-1">
          {projects.map((project) => (
            <a
              key={project.id}
              href={`/projects/${project.id}`}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              style={{ borderLeft: `3px solid ${project.color}` }}
            >
              <Folder size={18} style={{ color: project.color }} />
              {project.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
