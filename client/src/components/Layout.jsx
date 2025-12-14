import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 text-xl font-bold text-teal-600">
          NexaTask
        </div>

        <nav className="px-4 space-y-2">
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded hover:bg-teal-100"
          >
            Dashboard
          </Link>

          <Link
            to="/expenses"
            className="block px-4 py-2 rounded hover:bg-teal-100"
          >
            Expenses
          </Link>

          <Link
            to="/tasks"
            className="block px-4 py-2 rounded hover:bg-teal-100"
          >
            Tasks
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
