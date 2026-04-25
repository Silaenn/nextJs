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
    default: "ARCHITECT. | Creative Digital Agency",
    template: "%s | ARCHITECT.",
  },
  description: "Transforming visionary concepts into digital masterworks. High-end design meets cutting-edge execution.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-family=%22serif%22 font-weight=%22900%22 font-size=%2280%22 fill=%22%2300f2ff%22>A</text></svg>',
  },
  keywords: ["Digital Agency", "Creative Design", "Full-stack Development", "Architecture Admin"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ARCHITECT. Agency",
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
