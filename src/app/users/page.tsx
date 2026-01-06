import Link from "next/link";

export default function Users() {
  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-xl font-bold">Users</h1>
      <Link href="/users/1">User 1</Link>
      <Link href="/users/2">User 2</Link>
    </main>
  );
}
