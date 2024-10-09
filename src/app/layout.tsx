import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import Image from "next/image";
import haydnLogo from "@/images/haydn.png";

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
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* Add description to the page */}
        <meta
          name="description"
          content="How are house prices in Amsterdam changing?"
        />
        {/* Add Open Graph meta tags for better social media sharing */}
        <meta property="og:title" content="Amsterdam house prices" />
        <meta
          property="og:description"
          content="How are house prices in Amsterdam changing? An interactive map of house prices in Amsterdam."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ams.haydnjm.com.com" />{" "}
        {/* Replace with your actual URL */}
        <meta
          property="og:image"
          content="https://ams.haydnjm.com/og-image.jpg"
        />{" "}
        {/* Replace with your actual image URL */}
        {/* Add Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Amsterdam house prices" />
        <meta
          name="twitter:description"
          content="How are house prices in Amsterdam changing? An interactive map of house prices in Amsterdam."
        />
        {/* Add canonical URL */}
        <link rel="canonical" href="https://ams.haydnjm.com" />{" "}
        {/* Replace with your actual URL */}
        {/* Add structured data for rich snippets */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Amsterdam house prices",
              "description": "An interactive map of house prices in Amsterdam",
              "url": "https://ams.haydnjm.com"
            }
          `}
        </script>
        {/* Add robots meta tag to allow indexing */}
        <meta name="robots" content="index, follow" />
        {/* Add keywords meta tag */}
        <meta
          name="keywords"
          content="Amsterdam, house prices, real estate, property market, interactive map"
        />
      </Head>
      <body className={"font-sans font-light"}>
        <a href="https://haydnjm.com" target="_blank" rel="noopener noreferrer">
          <Image
            src={haydnLogo}
            alt="Haydn logo"
            width={30}
            height={30}
            className="fixed top-5 right-5 z-50"
          />
        </a>
        <div className="min-h-screen max-lg:px-4 py-20 z-10 w-full">
          <div className="max-w-3xl m-auto">
            <h1 className="text-5xl font-bold text-center my-20">
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
        <div className="bg-gray-800">
          <div className="max-w-3xl m-auto py-10 text-center text-white">
            <p>
              Made by{" "}
              <a
                href="https://haydnjm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Haydn
              </a>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
