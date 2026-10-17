import React from "react";

// Shared frame for the admin forms
function AdminPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="max-w-3xl border-2 border-foreground bg-card">
      <h2 className="border-b-2 border-foreground bg-secondary px-6 py-4 font-display text-xl font-bold">
        {title}
      </h2>
      <div className="p-6 sm:p-8">{children}</div>
    </section>
  );
}

export default AdminPanel;
