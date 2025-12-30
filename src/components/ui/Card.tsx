interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Card({ title, children, footer }: CardProps) {
  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm">
      {title && (
        <header className="mb-3 border-b pb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
        </header>
      )}

      <div className="text-gray-700">{children}</div>

      {footer && <footer className="mt-4 border-t pt-2">{footer}</footer>}
    </section>
  );
}
