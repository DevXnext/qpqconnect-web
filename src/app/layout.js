import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/page";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'QPQ Connect',
  description: 'A trade platform',
};

export default function RootLayout({ children }) {
  const isDashboardLayout = children.type.name === "DashboardLayout";
  return (

    <html lang="en">
      <body className={inter.className}>
      {!isDashboardLayout && <Header/>}
        {children}
        </body>
    </html>
  );
}
