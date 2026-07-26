// src/app/layout.tsx
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'AxivoraX - Advanced Trading Intelligence & Behavioral Journal',
  description: 'AI-powered trading journal, behavioral analytics, and risk management workspace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <div className="flex min-h-screen">
          {/* Persistent Sidebar Navigation */}
          <Sidebar />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
