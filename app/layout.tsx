import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ape Boys Club",
  description:
    "The Ape Boys Club is a Limited collection of 1,500 unique Ape Boy NFTs unique digital collectibles living on the Injective blockchain. Your Ape Boy doubles as your Ape Boys Club membership card, and grants access to members-only benefits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
