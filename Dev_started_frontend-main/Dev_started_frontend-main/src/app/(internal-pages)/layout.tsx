"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { getToken } from "../../utils/auth";
import DashboardSidebar from "../../components/dashboard/sidebar";
import DashboardHeader from "../../components/dashboard/header";
import DashboardFooter from "../../components/dashboard/footer";
import Toggle from "../../components/ThemeToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const token = getToken();
  const router = useRouter();
  // TODO: check if DB call required!
  if (!token) {
    router.push("/login");
  }

  return (
    <div
      id="page-container"
      className={`mx-auto flex min-h-screen w-full min-w-[320px] flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100 ${
        desktopSidebarOpen ? "lg:pl-64" : ""
      }`}
    >
      <Toggle/>
      <DashboardSidebar
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        desktopSidebarOpen={desktopSidebarOpen}
      />

      <DashboardHeader
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        desktopSidebarOpen={desktopSidebarOpen}
        setDesktopSidebarOpen={setDesktopSidebarOpen}
      />

      <main
        id="page-content"
        className="flex max-w-full max-h-full  flex-auto flex-col pt-16"
      >
        {children}
      </main>
      <DashboardFooter />
    </div>
  );
}
