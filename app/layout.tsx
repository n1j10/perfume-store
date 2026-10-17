import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Reem_Kufi } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/global/Footer";
import { ThemeProvider } from "@/components/theme-provider"
import Container from "@/components/global/Container";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from '@clerk/nextjs'
import { arSA } from '@clerk/localizations'

const bodyFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const displayFont = Reem_Kufi({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "عَبَق | متجر العطور",
  description: "عَبَق - متجر عطور وبخور ودهن عود أصيل",
};

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={cn(bodyFont.variable, displayFont.variable)}>
      <body className="flex min-h-screen flex-col">
        <ClerkProvider localization={arSA}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            <Container className="flex-1 pt-8 pb-16">
              {children}
            </Container>
            <Footer />
            <Toaster position="bottom-left" dir="rtl" />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
