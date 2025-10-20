// /src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer";
import ApplicationModalProvider from "@/components/ModalProvider";

export const metadata: Metadata = {
  title: "TCG Con 2025",
  description:
    "A trading card game conference: MTG, Pokémon, Yu-Gi-Oh!, Lorcana, and more.",
  openGraph: { title: "TCG Con 2025", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <ApplicationModalProvider>
          <Header />
          <main className="py-10">{children}</main>
          <Footer />
        </ApplicationModalProvider>
      </body>
    </html>
  );
}