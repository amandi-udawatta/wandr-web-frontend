import type { Metadata } from "next";
import Navbar from '@/components/general/Navbar'
import "./globals.css";

export const metadata: Metadata = {
  title: "Wandr.",
  description: "Travel Blog : UI/UX app for camping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <main className="relative overflow-hidden flex-grow">
            {children}
          </main>
      </body>
    </html>
  );
}
