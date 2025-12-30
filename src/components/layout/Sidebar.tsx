import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/users", label: "Users" },
  { href: "/reports", label: "Reports" },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 border-r bg-gray-100 p-4">
      <h2 className="mb-4 text-lg font-bold">Navigation</h2>

      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded px-2 py-1 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
