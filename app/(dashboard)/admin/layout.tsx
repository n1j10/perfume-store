import SidebarComponent from "./Sidebar";
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { LuLayoutDashboard } from "react-icons/lu";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  if (userId !== process.env.ADMIN_USER_ID) redirect('/');
  return (
    <main>
      <div className="flex items-center gap-3 border-b-2 border-foreground pb-5">
        <span className="grid h-11 w-11 place-items-center bg-saffron text-saffron-foreground">
          <LuLayoutDashboard className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs text-muted-foreground">إدارة المتجر</p>
          <h1 className="font-display text-2xl font-bold">لوحة التحكم</h1>
        </div>
      </div>

      <section className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <SidebarComponent />
        </div>
        <div className="min-w-0 lg:col-span-9">
          {children}
        </div>
      </section>
    </main>
  );
}
