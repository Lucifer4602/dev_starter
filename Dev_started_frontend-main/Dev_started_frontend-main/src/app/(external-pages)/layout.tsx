import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Nav from "@/components/Navbar";
import Toggle from "@/components/ThemeToggle";

import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-tr from-pink-50 via-violet-50 to-amber-50 dark:from-pink-950 dark:via-indigo-950 dark:to-orange-950 dark:text-gray-100">
      <Banner />
      <Toggle />
      {process.env.NEXT_PUBLIC_IS_WAITING_LIST_ENABLED !== "true" && <Nav />}
      {children}
      {process.env.NEXT_PUBLIC_IS_WAITING_LIST_ENABLED !== "true" && <Footer />}
    </div>
  );
}
