"use client";
import LogoToggle from '../LogoToggle';
import { MailIcon } from "lucide-react";
import { useState } from "react";
import { parseError } from "../../utils/errors";
import toast from "react-hot-toast";
import Image from "next/image";
import { useSubscribeWaitingListMutation } from "@/queries/communication/SubscribeWaitingList";

export default function WaitingList() {
  const logoSrc =LogoToggle();
  const [email, setEmail] = useState("");
  const { mutate: subscribeToWaitingList } = useSubscribeWaitingListMutation({
    onSuccess: async (message) => {
      toast.success(message);
      setEmail("");
    },
    onError: (error: any) => {
      toast.error(parseError(error));
      setEmail("");
    },
  });
  const handleSubmit = async () => {
    subscribeToWaitingList({ email: email });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:text-gray-100">
        <div className="text-3xl p-6 font-bold flex">
          
        <Image
          src={logoSrc}
          alt={`${process.env.NEXT_PUBLIC_COMPANY_NAME} Logo`}
          width={200}
          height={180}
        />

          {/* <h1 className="pl-1">{process.env.NEXT_PUBLIC_COMPANY_NAME}</h1> */}
        </div>
        <div className="container mx-auto space-y-8 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
          <div className="text-center">
            <MailIcon className="mb-5 inline-block h-12 w-12 text-pink-600 dark:text-pink-500" />
            <h2 className="mb-4 text-4xl font-black text-black dark:text-white">
              Join Our Waiting List
            </h2>
            <h3 className="mx-auto text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300 lg:w-2/3">
              Subscribe now and be among the first to access exclusive content,
              early releases, and special offers!
            </h3>
          </div>

          <form className="mx-auto space-y-4 text-center lg:max-w-lg">
            <div className="flex flex-col gap-3 rounded-xl bg-gray-100 p-3 dark:bg-gray-700/50 sm:flex-row">
              {/* MAKE a captcha token if recaptcha is present in .env */}
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
              />
              <button
                type="button"
                className="inline-flex items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-6 py-3 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
                onClick={handleSubmit}
                disabled={!email}
              >
                Subscribe
              </button>
            </div>
            <div className="space-y-0.5 text-sm font-medium leading-relaxed text-gray-600 dark:text-gray-400">
              <p>No spam ever (pinky promise), unsubscribe at any time.</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
