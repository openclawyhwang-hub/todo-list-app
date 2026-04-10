"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import TaskList from "@/components/tasks/TaskList";
import ProjectSidebar from "@/components/projects/ProjectSidebar";
import { PlusCircle, CheckCircle2, Circle } from "lucide-react";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const { tasks, projects, tags, fetchTasks, fetchProjects, fetchTags } = useTaskStore();

  useEffect(() => {
    if (isLoaded && user) {
      fetchTasks();
      fetchProjects();
      fetchTags();
    }
  }, [isLoaded, user, fetchTasks, fetchProjects, fetchTags]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <ProjectSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-64">
          {/* Header */}
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.firstName || user?.emailAddresses[0]?.emailAddress}!
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {pendingCount} tasks pending, {completedCount} completed
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <SignOutButton>
                    <button className="text-sm text-gray-600 hover:text-gray-900">
                      Sign Out
                    </button>
                  </SignOutButton>
                </div>
              </div>
            </div>
          </header>

          {/* Task List */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TaskList />
          </main>
        </div>
      </div>
    </div>
  );
}
