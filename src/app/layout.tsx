import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "PlotTwist — Your Life As A Movie",
  description:
    "Answer a few ridiculous questions and turn your life into an epic cinematic movie. Generate your character, discover your villain, and share your story.",
  keywords: [
    "cinematic story generator",
    "life as a movie",
    "personality quiz",
    "fantasy character generator",
    "movie generator",
    "PlotTwist",
  ],
  openGraph: {
    title: "PlotTwist — Your Life As A Movie",
    description:
      "Your real life is boring. Let's turn it into a movie. Answer 15 questions and create your epic cinematic story.",
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://plottwist.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlotTwist — Your Life As A Movie",
    description:
      "Answer a few ridiculous questions and turn your life into a cinematic masterpiece.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        {/* Google Analytics (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-NLVT4R9NXG"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NLVT4R9NXG');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3934139146949195"
          crossOrigin="anonymous"
        />

        <div className="cinematic-bg" aria-hidden="true" />
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
