import "./globals.css";
import { cx } from "@/src/utils";
import { Inter, Manrope, Poppins } from "next/font/google";
import Header from "@/src/components/Header";
import Footer from "../components/Footer";
import siteMetadata from "../utils/siteMetaData";
import Script from "next/script";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

const poppin = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pop",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const neueMontreal = localFont({
  src: [
    {
      path: "../../public/fonts/neue-montreal/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
});

export const metadata = {
  metadataBase: siteMetadata.siteUrl ? new URL(siteMetadata.siteUrl) : null,
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cx(
          inter.variable,
          manrope.variable,
          poppin.variable,
          neueMontreal.variable, 
          "font-mr bg-light"
        )}
      >
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }`}
        </Script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
