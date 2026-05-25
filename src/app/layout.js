import { Inter, Mukta } from "next/font/google";
import "./globals.css";
import { InvoiceProvider } from "@/context/InvoiceContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-mukta",
});

export const metadata = {
  title: "Ujjain Ride Invoice",
  description: "Internal tool for Ujjain Ride employees to generate customer invoices.",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${mukta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <InvoiceProvider>{children}</InvoiceProvider>
      </body>
    </html>
  );
}
