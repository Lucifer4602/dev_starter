"use client";
import SettingTabs from "./tabs";

export default function SettingsPage() {
  return (
    <div className="bg-white dark:bg-gray-900 flex flex-1  ">
      <div className=" py-6 md:px-16 md:py-16 ">
        <SettingTabs />
      </div>
    </div>
  );
}
