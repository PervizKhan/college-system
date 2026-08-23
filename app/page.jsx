// app/page.tsx - Complete homepage in one file
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 to-teal-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm mb-4">
            ❤️ Affiliated with FPAHS
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            FATA MEDICAL
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-teal-300 mb-4">
            INSTITUTE
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-2">
            Faculty of Paramedical and Allied Health Sciences
          </p>
          <p className="text-base opacity-80 mb-6 max-w-2xl mx-auto">
            Offering diploma courses in Health, Pathology, Anesthesia, Dental & Radiology
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/register" className="bg-teal-500 hover:bg-teal-600 px-8 py-3 rounded-xl font-bold transition">
              Apply Now
            </a>
            <a href="/contact" className="bg-white/20 hover:bg-white/30 px-8 py-3 rounded-xl font-bold transition">
              📞 0333 9613496
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto py-8 px-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-900">500+</div>
          <div className="text-sm text-gray-600">Students</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-900">98%</div>
          <div className="text-sm text-gray-600">Pass Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-900">50+</div>
          <div className="text-sm text-gray-600">Faculty</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-900">5</div>
          <div className="text-sm text-gray-600">Programs</div>
        </div>
      </div>

      {/* Courses */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 mb-2">
          Our Diploma Programs
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Affiliated with Faculty of Paramedical and Allied Health Sciences (FPAHS)
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 border">
            <div className="text-2xl mb-1">❤️</div>
            <h3 className="font-bold text-blue-900">Health Sciences</h3>
            <p className="text-sm text-gray-600">Healthcare fundamentals & patient care</p>
            <span className="inline-block mt-2 text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">2 Years</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border">
            <div className="text-2xl mb-1">🔬</div>
            <h3 className="font-bold text-blue-900">Pathology</h3>
            <p className="text-sm text-gray-600">Clinical diagnostics & disease identification</p>
            <span className="inline-block mt-2 text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">2 Years</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border">
            <div className="text-2xl mb-1">💊</div>
            <h3 className="font-bold text-blue-900">Anesthesia</h3>
            <p className="text-sm text-gray-600">Anesthesia administration & patient monitoring</p>
            <span className="inline-block mt-2 text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">2 Years</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border">
            <div className="text-2xl mb-1">🦷</div>
            <h3 className="font-bold text-blue-900">Dental Sciences</h3>
            <p className="text-sm text-gray-600">Dental assisting & oral healthcare</p>
            <span className="inline-block mt-2 text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">2 Years</span>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 border md:col-span-2">
            <div className="text-2xl mb-1">📡</div>
            <h3 className="font-bold text-blue-900">Radiology</h3>
            <p className="text-sm text-gray-600">Medical imaging techniques & radiation safety</p>
            <span className="inline-block mt-2 text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded">2 Years</span>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
            Why FATA Medical Institute?
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 text-center shadow">
              <div className="text-2xl mb-1">🏆</div>
              <h3 className="font-bold text-blue-900">FPAHS Affiliated</h3>
              <p className="text-sm text-gray-600">Recognized by Faculty of Paramedical & Allied Health Sciences</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow">
              <div className="text-2xl mb-1">👨‍⚕️</div>
              <h3 className="font-bold text-blue-900">Expert Faculty</h3>
              <p className="text-sm text-gray-600">Learn from experienced medical professionals</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow">
              <div className="text-2xl mb-1">📚</div>
              <h3 className="font-bold text-blue-900">Practical Training</h3>
              <p className="text-sm text-gray-600">Hands-on experience in modern labs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Address */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="bg-blue-900 text-white rounded-2xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
          <div className="space-y-2">
            <p className="flex items-center justify-center gap-2">
              <span>📍</span> Baboz Kaly, TSD Darra, Kohat
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>📞</span> <a href="tel:03339613496" className="hover:text-teal-300">0333 9613496</a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <span>🕐</span> Mon-Fri: 8:00 AM - 4:00 PM
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <a href="/register" className="bg-teal-500 hover:bg-teal-600 px-6 py-2 rounded-xl font-bold transition">
              Register Now
            </a>
            <a href="/contact" className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-xl font-bold transition">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 px-4 border-t text-sm text-gray-600">
        <p>© 2026 FATA Medical Institute. All Rights Reserved.</p>
        <p className="text-xs mt-1">Affiliated with Faculty of Paramedical and Allied Health Sciences (FPAHS)</p>
      </div>
    </div>
  );
}