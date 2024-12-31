import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Manejo de Ventas",
  description: "Proyecto para manejo de ventas y stock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
