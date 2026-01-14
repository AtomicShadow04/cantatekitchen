import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Cantate Kitchen - Authentic Nigerian Cuisine",
  description: "Experience the rich flavors of Nigeria with our signature moimoi, legendary jollof rice, and traditional delicacies. Fresh ingredients, authentic recipes, delivered to your door.",
  keywords: ["Nigerian food", "moimoi", "jollof rice", "African cuisine", "food delivery", "Lagos"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
