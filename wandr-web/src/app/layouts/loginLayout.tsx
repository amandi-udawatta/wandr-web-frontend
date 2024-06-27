import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
          <main className="relative overflow-hidden">
            {children}
          </main>
      </body>
    </html>
  );
}
