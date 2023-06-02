import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Dave's Blog",
  description: "Created by Dave Gray",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-slate-800">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
