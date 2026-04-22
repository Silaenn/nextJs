import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ErrorBoundary from "@/components/errorBoundary/ErrorBoundary";
import ToastProvider from "@/components/toast/Toast";
import { validateEnv } from "@/lib/env";
import { auth } from "@/lib/auth";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

// Validate environment variables in development
if (process.env.NODE_ENV === "development") {
  validateEnv();
}

export const metadata = {
  title: {
    default: "Next.js 14 - Creative Agency",
    template: "%s | Next.js 14",
  },
  description: "A modern full-stack application built with Next.js 14, MongoDB, and NextAuth",
  keywords: ["Next.js", "React", "MongoDB", "Blog", "CMS"],
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Next.js 14",
  },
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} ${syne.variable} font-body min-h-screen flex flex-col antialiased`}>
        <ToastProvider>
          <ErrorBoundary>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer session={session} />
          </ErrorBoundary>
        </ToastProvider>
      </body>
    </html>
  );
}
