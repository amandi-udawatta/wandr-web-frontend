import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
        <Navbar/>
          <main className="relative overflow-hidden flex-grow">
            {children}
          </main>
      </body>
    </html>
  );
}
