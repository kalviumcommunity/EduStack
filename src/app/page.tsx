"use client";
import { useAuth } from "@/hooks/useAuth";
import { useUI } from "@/hooks/useUI";

export default function Home() {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUI();

  return (
    <main
      className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <h1 className="text-2xl font-bold mb-4">
        State Management with Context & Hooks
      </h1>

      <section className="mb-6">
        <h2 className="font-semibold mb-2">Authentication</h2>
        {isAuthenticated ? (
          <>
            <p>Logged in as: {user}</p>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => login("KalviumUser")}>Login</button>
        )}
      </section>

      <section>
        <h2 className="font-semibold mb-2">UI Controls</h2>
        <p>Theme: {theme}</p>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <button onClick={toggleSidebar}>
          {sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
        </button>
      </section>
    </main>
  );
}
