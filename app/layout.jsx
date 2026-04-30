import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <Navbar />
        <main>
          <AuthGuard>{children}</AuthGuard>
        </main>
      </body>
    </html>
  );
}
