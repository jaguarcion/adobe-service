import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AdminWrapper from "./components/AdminWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adobe Admin",
  description: "Admin panel for Adobe Org Checker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdminWrapper>{children}</AdminWrapper>
      </body>
    </html>
  );
}
