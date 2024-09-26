import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/Navbar";

import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Urban Nest – Curated City Stays | Book Unique Urban Homes",
  description:
    "Find your perfect stay with Urban Nest, a property rental platform offering handpicked city accommodations. Book stylish apartments, lofts, and homes in vibrant neighborhoods with seamless booking and personalized experiences.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar currentUser={currentUser} />
        <SearchModal />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <ToasterProvider />
        <div className="pb-20 pt-20">{children}</div>
      </body>
    </html>
  );
}
