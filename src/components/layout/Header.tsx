import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-blue-600 px-6 py-3 text-white">
      <h1 className="text-lg font-semibold">MyApp</h1>

      <nav aria-label="Primary navigation" className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/settings">Settings</Link>
      </nav>
    </header>
  );
}
