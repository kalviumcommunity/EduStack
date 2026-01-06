"use client";

import useSWR, { SWRConfiguration } from "swr";
import { fetcher } from "@/lib/fetcher";

type User = {
  id: string;
  name: string;
  email: string;
};

const swrConfig: SWRConfiguration<User[], Error> = {
  revalidateOnFocus: true,
  refreshInterval: 10000,
  onErrorRetry: (
    error: Error,
    key: string,
    config: Readonly<SWRConfiguration<User[], Error>>,
    revalidate,
    opts: { retryCount: number }
  ) => {
    if (opts.retryCount >= 3) return;
    setTimeout(() => revalidate({ retryCount: opts.retryCount }), 2000);
  },
};

export default function UsersPage() {
  const { data, error, isLoading } = useSWR<User[]>(
    "/api/users",
    fetcher,
    swrConfig
  );

  if (error) return <p className="text-red-600">❌ Failed to load users</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul className="space-y-2">
        {data.map((user) => (
          <li key={user.id} className="p-2 border-b">
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </main>
  );
}
