import './globals.css';

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
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
