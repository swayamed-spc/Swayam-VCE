import type { Metadata } from "next";
import "./globals.css";
import { DeepSpaceBackground } from "@/components/space/DeepSpaceBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "Swayam E-Cell — Entrepreneurship Cell Platform",
  description:
    "Fostering campus innovation, startup hackathons, funding pitch competitions, and entrepreneurial excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-gray-100 min-h-screen relative font-sans antialiased selection:bg-white/20 selection:text-white">
        <ToastProvider>
          <DeepSpaceBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
