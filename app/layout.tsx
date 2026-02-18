import type { Metadata } from "next";
import { Inter, Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata: Metadata = {
  title: "NURIA | The Birthday Edition",
  description: "A celebration of life, memories, and the future.",
  applicationName: "Nuri's Birthday",
  authors: [{ name: "Andre" }],
  keywords: ["birthday", "celebration", "Nuria", "memories", "gallery"],
  robots: "index, follow",
  openGraph: {
    title: "NURIA | The Birthday Edition",
    description: "A celebration of life, memories, and the future.",
    type: "website",
    locale: "es_ES",
    url: "https://nuni-birthday.vercel.app/",
    siteName: "Nuri's Birthday",
  },
  twitter: {
    card: "summary_large_image",
    title: "NURIA | The Birthday Edition",
    description: "A celebration of life, memories, and the future.",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${dancing.variable} antialiased bg-midnight text-white selection:bg-champagne selection:text-black`}>
        {children}
      </body>
    </html>
  );
}
