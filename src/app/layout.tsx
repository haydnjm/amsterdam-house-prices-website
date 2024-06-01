import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amsterdam house prices",
  description: "An interactive map of house prices in Amsterdam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen py-20 z-10 w-full">
          <div className="max-w-3xl m-auto">
            <h1 className="text-5xl font-bold text-center my-20">
              Amsterdam house prices
            </h1>
            <p className="text-md text-center my-10">
              All of the following information is from public listings posted
              since July 2023. It does not indicate final sale price, but
              initial listing price. &quot;Houses&quot; with less than 25m² are
              excluded because they&apos;re usually parking spaces (although you
              never know for sure in Amsterdam...).
            </p>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
