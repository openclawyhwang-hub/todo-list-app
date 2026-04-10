"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { Plus } from "lucide-react";

export default function TaskList() {
  const { tasks, loading } = useTaskStore();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "all"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "active"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === "completed"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Completed
          </button>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Task
        </button>
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="p-6 border-b">
          <TaskForm onClose={() => setShowForm(false)} />
        </div>
      )}

      {/* Tasks */}
      <div className="divide-y divide-gray-200">
        {filteredTasks.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            No tasks found. Create your first task!
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}
