import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

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
            <body className={``}>
                <div className="bg-white min-h-screen max-h-screen">
                    <Header />
                    <div className="container mx-auto p-3">{children}</div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
