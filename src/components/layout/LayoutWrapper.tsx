import Header from "./Header";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main id="main-content" className="flex-1 overflow-auto bg-white p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
