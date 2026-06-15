import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://edumenezes.me"),
  title: "Edu Menezes — Director, Motion Design & Edit",
  description:
    "Director, motion designer and editor working with Adidas, Budweiser, Vivo, Itaú and UNESCO. 8x Cannes Lions.",
  openGraph: {
    title: "Edu Menezes — Director, Motion Design & Edit",
    description:
      "Director, motion designer and editor working with Adidas, Budweiser, Vivo, Itaú and UNESCO. 8x Cannes Lions.",
    url: "https://edumenezes.me",
    siteName: "Edu Menezes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Edu Menezes — Director, Motion Design & Edit",
    description:
      "Director, motion designer and editor working with Adidas, Budweiser, Vivo, Itaú and UNESCO. 8x Cannes Lions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full bg-bg text-fg">
        <SmoothScroll>
          <CustomCursor />
          <PageTransition />
          <SiteHeader />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
