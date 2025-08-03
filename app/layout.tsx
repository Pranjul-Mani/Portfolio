import "./globals.css";
import { ThemeProvider } from "./provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pranjul's Portfolio",
  description: "Portfolio of Pranjul",
  icons: {
    icon: "/profile.svg", // Path to your favicon file
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}