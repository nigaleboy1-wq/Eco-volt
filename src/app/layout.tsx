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
  title: "EcoVolt Solutions — Renewable Energy Engineered for West Africa",
  description:
    "EcoVolt Solutions designs and installs premium solar photovoltaic systems, battery storage, inverters, and EV charging stations across Burkina Faso and neighboring countries. Certified engineers. Long-term support.",
  keywords: [
    "EcoVolt Solutions",
    "solar energy Burkina Faso",
    "renewable energy Ouagadougou",
    "solar photovoltaic installation",
    "battery storage West Africa",
    "EV charging stations",
    "energy audit",
  ],
  authors: [{ name: "EcoVolt Solutions" }],
  openGraph: {
    title: "EcoVolt Solutions — Renewable Energy Engineered for West Africa",
    description:
      "Premium solar PV, battery storage, inverters and EV charging, designed and installed by certified engineers in Ouagadougou.",
    siteName: "EcoVolt Solutions",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoVolt Solutions — Renewable Energy Engineered for West Africa",
    description:
      "Premium solar PV, battery storage, inverters and EV charging, designed and installed by certified engineers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${jakarta.variable} ${inter.variable} antialiased bg-background text-foreground font-sans overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
