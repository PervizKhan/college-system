import AuthGuard from "@/components/AuthGuard";

export default function Dashboard() {
  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto p-4 sm:p-8 md:p-12">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter uppercase">Portal</h1>
          <p className="text-gray-400 font-bold text-xs md:text-sm tracking-widest uppercase mt-2">Student Dashboard</p>
        </header>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <StatCard title="Courses" value="06" color="bg-primary" />
          <StatCard title="Attendance" value="94%" color="bg-secondary" />
          <StatCard title="Results" value="Pass" color="bg-gray-900" />
        </div>
      </div>
    </AuthGuard>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
      <div className={`absolute top-0 right-0 w-2 h-full ${color}`}></div>
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{title}</h3>
      <p className="text-4xl md:text-5xl font-black text-gray-900 mt-2">{value}</p>
    </div>
  );
}