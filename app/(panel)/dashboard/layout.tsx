import DashboardSidebar from "./components/DashboardSidebar"; // فرض مسیر

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50" dir="rtl">
      <div className="container mx-auto px-0 py-8 max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ستون سایدبار (در دسکتاپ 3 واحد، در موبایل کل عرض) */}
          <aside className="lg:col-span-3 w-full sticky top-4">
            <DashboardSidebar />
          </aside>

          {/* ستون محتوای اصلی (در دسکتاپ 9 واحد) */}
          <main className="lg:col-span-9 w-full">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}