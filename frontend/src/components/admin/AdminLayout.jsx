import Sidebar from "./Sidebar";

function AdminLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="p-4 md:p-6 lg:p-8">
          <div className="mb-8 rounded-[2rem] bg-white p-6 shadow-soft">
            <h1 className="font-display text-3xl font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="mt-2 text-sm leading-7 text-slate-600">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;