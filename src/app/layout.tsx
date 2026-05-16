import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Providers from "./providers";
import { PublicEnvScript } from "next-runtime-env";

export const metadata: Metadata = {
  title: "Đội ngũ giảng viên",
  description: "Đội ngủ giảng viên HUCE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body className={``}>
        <div className="bg-white min-h-screen flex flex-col">
          <Providers>
            <Header />
            <main className="flex-1 container mx-auto p-3">{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
