"use client";

import { useState } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { CheckCircle2, Circle, Trash2, Edit2 } from "lucide-react";
import type { Database } from "@/lib/supabase";

type Task = Database['public']['Tables']['tasks']['Row'];

interface TaskItemProps {
  task: Task;
}

export default function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTaskStore();
  const [editing, setEditing] = useState(false);

  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  return (
    <div className={`px-6 py-4 hover:bg-gray-50 flex items-center gap-4 ${
      task.completed ? "bg-gray-50" : ""
    }`}>
      <button
        onClick={() => toggleTask(task.id, !task.completed)}
        className="flex-shrink-0"
      >
        {task.completed ? (
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        ) : (
          <Circle className="h-6 w-6 text-gray-300 hover:text-gray-400" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${
          task.completed ? "line-through text-gray-400" : "text-gray-900"
        }`}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-sm text-gray-500 mt-1 truncate">
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className={`px-2 py-0.5 text-xs rounded-full ${
            priorityColors[task.priority]
          }`}>
            {task.priority}
          </span>
          {task.due_date && (
            <span className="text-xs text-gray-500">
              Due: {new Date(task.due_date).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setEditing(!editing)}
          className="p-2 text-gray-400 hover:text-gray-600"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 text-gray-400 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
