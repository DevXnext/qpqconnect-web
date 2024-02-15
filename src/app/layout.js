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
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={inter.className}>
      {!isDashboardLayout && <Header/>}
        {children}
        </body>
    </html>
  );
}
