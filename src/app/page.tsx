import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { CheckCircle, Clock, Folder } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">Todo App</h1>
            <div className="flex gap-4">
              <SignInButton>
                <button className="text-gray-600 hover:text-gray-900">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Get Started
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Manage Your Tasks Efficiently
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            A modern todo list application built with Next.js, Clerk, and Supabase
          </p>
          <SignUpButton>
            <button className="px-8 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700">
              Start for Free
            </button>
          </SignUpButton>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Task Management</h3>
            <p className="text-gray-600">
              Create, update, and track your tasks with ease. Set priorities and due dates.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Folder className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Project Organization</h3>
            <p className="text-gray-600">
              Organize tasks into projects and keep everything structured.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Clock className="h-12 w-12 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-600">
              See changes instantly with Supabase real-time subscriptions.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-500">
            Built with Next.js, Clerk, Supabase, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
