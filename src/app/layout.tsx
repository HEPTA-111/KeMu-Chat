import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers/AuthProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kemu Chat",
  description:
    "Kemu Chat is an AI-powered chatbot for Universities that provides instant, 24/7 access to campus information, academic support, and administrative services for both current and prospective students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
