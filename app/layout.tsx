import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Birthday Seori!",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <p className="text-lg text-gray-700 leading-relaxed fade-in-4">
          Also sorry for being late y&apos;know coding this was somehow a disaster
          :P
        </p>
        <Image
          src="/your-image.jpg"
          alt="Description"
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </body>
    </html>
  );
}
