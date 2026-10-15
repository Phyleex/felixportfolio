import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LEEX Creative Studio",
  description:
    "LEEX Creative Studio delivers brand identity, graphic design, video editing, social media design, and creative digital solutions.",

  openGraph: {
    title: "LEEX Creative Studio",
    description:
      "Creative design, video editing, branding, and digital solutions by LEEX Creative Studio.",
    url: "https://felixportfolio-sooty.vercel.app",
    siteName: "LEEX Creative Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LEEX Creative Studio",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LEEX Creative Studio",
    description:
      "Creative design, video editing, branding, and digital solutions by LEEX Creative Studio.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
