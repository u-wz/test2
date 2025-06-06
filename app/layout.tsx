import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Birthday Seori!",
  description: "A special birthday website for Seori",
  icons: {
    icon: [
      { url: "./favicon.ico", sizes: "any" },
      { url: "./favicon.ico", sizes: "32x32" },
    ],
    shortcut: ["./favicon.ico"],
    apple: [
      { url: "./favicon.ico" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="./favicon.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
