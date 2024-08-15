"use client";

import sendDemoEmail from "@/queries/communication/sendDemoEmail";
import { parseError } from "@/utils/errors";
import toast from "react-hot-toast";
import "tailwindcss/tailwind.css";

export default function Emailform() {
  const handeSubmit = async (e: any) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      const formData = new FormData(e.target);
      let data = Object.fromEntries(formData);
      console.log(data);
      await sendDemoEmail(data);

      toast.success("Email sent successfully");
    } catch (e) {
      toast.error(parseError(e));
    }
  };
  return (
    <div className="">
      <div className="container mx-auto space-y-16 px-4 py-16 lg:px-6 lg:py-32 xl:max-w-7xl">
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100 max-w-lg">
          <div className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
            <h3 className="font-medium text-lg">Email Form</h3>
          </div>

          <form
            className="space-y-6 dark:text-gray-100 px-5 py-4"
            onSubmit={handeSubmit}
          >
            <div className="space-y-1">
              <label htmlFor="heading" className="font-medium">
                To
              </label>
              <input
                type="email"
                id="to"
                name="to"
                placeholder="Receiver's mail Id"
                className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="Button Name" className="font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject of Mail"
                className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="Description" className="font-medium">
                Message
              </label>
              <textarea
                rows={5}
                id="message"
                name="message"
                placeholder="Enter your Message"
                className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="" className="font-medium"></label>
              <input
                type="submit"
                id="submit"
                name="submit"
                placeholder=""
                className="bg-pink-500 hover:bg-pink-600 px-5 py-4 text-xl text-white cursor-pointer rounded-b-lg container"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
