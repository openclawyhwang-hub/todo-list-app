"use client";

import { useParams } from "next/navigation";
import { useTaskStore } from "@/store/useTaskStore";
import { useEffect } from "react";
import TaskList from "@/components/tasks/TaskList";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProjectPage() {
  const params = useParams();
  const { projects, fetchProjects } = useTaskStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const project = projects.find(p => p.id === params.id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Project not found</h2>
          <Link href="/dashboard" className="text-blue-600 hover:underline mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold" style={{ color: project.color }}>
            {project.name}
          </h1>
          {project.description && (
            <p className="text-gray-600 mt-2">{project.description}</p>
          )}
        </div>
        <TaskList />
      </div>
    </div>
  );
}
