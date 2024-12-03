// Create this as a separate client-side component
"use client"; // Only this file will be treated as a client component

import { useEffect } from "react";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sandbox.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <main className="relative overflow-hidden flex-grow">{children}</main>;
};

export default ClientLayout;
