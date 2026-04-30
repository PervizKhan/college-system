import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-b from-primary to-primary-dark text-white py-16 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-6">
            FUTURE OF <span className="text-secondary">IT EDUCATION</span>
          </h1>
          <p className="text-lg md:text-2xl font-medium opacity-90 mb-10 max-w-2xl mx-auto">
            Manage your diploma courses and SST preparation through our professional student portal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="px-10 py-4 bg-white text-primary font-bold rounded-2xl shadow-xl hover:scale-105 transition-all">Student Login</Link>
            <Link href="/register" className="px-10 py-4 bg-secondary text-white font-bold rounded-2xl shadow-xl hover:bg-secondary-dark transition-all">Registration</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[ {t: "Responsive", c: "Mobile-first design for students on the go."},
           {t: "Unified", c: "Uniform colors matching our college identity."},
           {t: "Secure", c: "Protected access to your academic records."}
        ].map((f, i) => (
          <div key={i} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 text-center">
            <h3 className="font-black text-primary text-xl mb-2 uppercase">{f.t}</h3>
            <p className="text-gray-500 text-sm">{f.c}</p>
          </div>
        ))}
      </section>
    </div>
  );
}