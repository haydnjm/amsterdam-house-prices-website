import type { Metadata } from "next";
import "./globals.css";
import Image from "next/image";
import haydnLogo from "@/images/haydn.png";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ams.haydnjm.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
    other: {
      rel: "icon",
      url: "/favicon.ico",
    },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-GB": "/en-GB",
    },
  },
  title: {
    default: "Amsterdam House Prices",
    template: "%s | Amsterdam House Prices",
  },
  description:
    "How are house prices in Amsterdam changing? An interactive map of house prices in Amsterdam.",
  keywords: [
    "Amsterdam",
    "house prices",
    "koopprijs in Amsterdam",
    "property market",
    "interactive map",
  ],
  authors: [{ name: "Haydn Morris" }],
  creator: "Haydn Morris",
  publisher: "Haydn Morris Digital",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Amsterdam House Prices",
    title: "Amsterdam House Prices",
    description:
      "How are house prices in Amsterdam changing? An interactive map of house prices in Amsterdam.",
    images: [
      {
        url: "/images/thumbnail-wide.png",
        width: 1200,
        height: 630,
        alt: "Amsterdam House Prices",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {process.env.NODE_ENV === "production" && (
        <Script
          defer
          src="https://analytics.haydnjm.com/script.js"
          data-website-id="650cc5f0-7b3c-43fc-b114-a847df44cd81"
        />
      )}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-secondary/20 via-background to-secondary/20`}
      >
        <header className="sticky top-0 z-40 w-full border-b-2 border-secondary bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-container h-16 flex items-center">
          <a
            href="https://haydnjm.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
          >
            <Image
              src={haydnLogo}
              alt="Amsterdam House Prices logo"
              width={32}
              height={32}
            />
            <span className="inline-block font-bold">Haydn Morris</span>
          </a>
        </header>
        <div className="min-h-screen lg:py-20 z-10 w-full">
          <div className="max-w-3xl m-auto">
            <h1 className="font-bold tracking-tighter text-5xl lg:text-6xl text-center my-20">
              Amsterdam house prices
            </h1>
            <p className="text-md text-center my-10">
              All of the following information is from public listings posted
              since July 2023. It does not indicate final sale price, but
              initial listing price. &quot;Houses&quot; with less than 25m² of
              floor area are excluded because they&apos;re usually parking
              spaces (although you never know for sure in Amsterdam...).
            </p>
          </div>
          {children}
        </div>
        <footer className="border-t py-6 md:py-0 px-container bg-background text-foreground">
          <div className="w-full py-10 text-center flex items-center justify-between text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Haydn Morris. All rights
              reserved.
            </p>
            <p className="text-lg">
              <a
                href="https://haydnjm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-bold bg-secondary text-secondary-foreground hover:bg-primary/90 transition duration-200 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                ✨ Hire me ✨
              </a>
            </p>
            <p>
              &copy; {new Date().getFullYear()} Haydn Morris. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
