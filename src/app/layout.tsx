import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EcoVolt Solutions — Énergie solaire premium pour l'Afrique de l'Ouest",
  description:
    "EcoVolt Solutions conçoit et installe des systèmes photovoltaïques premium, du stockage par batteries, des onduleurs et des bornes de recharge VE à travers le Burkina Faso et les pays voisins. Ingénieurs certifiés. Soutien à long terme.",
  keywords: [
    "EcoVolt Solutions",
    "énergie solaire Burkina Faso",
    "énergie renouvelable Ouagadougou",
    "installation photovoltaïque",
    "stockage par batteries Afrique de l'Ouest",
    "bornes de recharge VE",
    "audit énergétique",
  ],
  authors: [{ name: "EcoVolt Solutions" }],
  openGraph: {
    title: "EcoVolt Solutions — Énergie solaire premium pour l'Afrique de l'Ouest",
    description:
      "Solaire photovoltaïque premium, stockage par batteries, onduleurs et recharge VE, conçus et installés par des ingénieurs certifiés à Ouagadougou.",
    siteName: "EcoVolt Solutions",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoVolt Solutions — Énergie solaire premium pour l'Afrique de l'Ouest",
    description:
      "Solaire photovoltaïque premium, stockage par batteries, onduleurs et recharge VE, conçus et installés par des ingénieurs certifiés.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${jakarta.variable} ${inter.variable} antialiased bg-background text-foreground font-sans overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
