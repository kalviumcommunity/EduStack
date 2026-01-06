interface UserProfileProps {
  params: {
    id: string;
  };
}

export default function UserProfile({ params }: UserProfileProps) {
  const { id } = params;

  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <p className="mt-2">User ID: {id}</p>
    </main>
  );
}
