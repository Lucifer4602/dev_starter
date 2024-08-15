"use client";
import { TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSubscibeToNewsLetterWithMutation } from "@/queries/communication/SubscribeToNewsLetter";
import { parseError } from "../../utils/errors";
import toast from "react-hot-toast";
const productsLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing Plans", href: "/pricing" },
  { label: "Faqs", href: "/#faq" },
  { label: "Support Center", href: "/contact" },
];

const legalLinks = [
  { label: "About", href: "/aboutus" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];
const socials = [
  { icon: TwitterIcon, href: "https://twitter.com/thedevstarter" },
  { icon: InstagramIcon, href: "https://www.instagram.com/thedevstarter/" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/100653143/" },
];
export default function Footer() {
  const [email, setEmail] = useState(" ");
  const { mutate: subscribeToNewsLetter } = useSubscibeToNewsLetterWithMutation(
    {
      onSuccess: async (message) => {
        toast.success(message);
        setEmail("");
      },
      onError: (error: any) => {
        toast.error(parseError(error));
        setEmail("");
      },
    },
  );
  const handleNewsLetterSubscribe = () => {
    subscribeToNewsLetter({ email: email });
  };
  return (
    <>
      {/* Footer Section: With Links Info Newsletter Dark */}
      <div className="">
        <footer
          id="page-footer"
          className="border-t border-gray-400 dark:bg-gray-900 dark:text-gray-100"
        >
          <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6 lg:gap-10">
              <div className="space-y-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-400/75">
                  Products
                </h4>
                <nav className="flex flex-col space-y-3 text-sm">
                  {productsLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="font-medium text-gray-700 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-400/75">
                  Legal
                </h4>
                <nav className="flex flex-col space-y-3 text-sm">
                  {legalLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="font-medium text-gray-700 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-400/75">
                  Company Inc
                </h4>
                <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  2829 Street no6 ATI Road <br />
                  Ludhiana, 141003
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-400/75">
                  Join Our Newsletter
                </h4>
                <div className="space-y-3 sm:flex sm:items-center sm:space-x-2 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        return setEmail(e.target.value);
                      }}
                      placeholder="Enter your email"
                      className="block w-full grow rounded-l-lg border border-gray-200 px-3 py-2 text-sm leading-5 placeholder-gray-500 focus:z-1 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-900 dark:placeholder-gray-400 dark:focus:border-pink-500"
                    />
                    <button
                      onClick={handleNewsLetterSubscribe}
                      className="-ml-px inline-flex flex-none items-center justify-center space-x-2 rounded-r-lg border border-pink-700 bg-pink-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-10 border-dashed dark:border-gray-700/75" />
            <div className="flex flex-col space-y-6 text-center text-sm md:flex-row-reverse md:justify-between md:space-y-0 md:text-left">
              <nav className="space-x-4 flex justify-between">
                {socials.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-gray-800 dark:hover:text-white"
                  >
                    <social.icon />
                  </Link>
                ))}
              </nav>
              <div className="text-gray-500 dark:text-gray-400/80">
                <span className="font-medium">
                  {process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Company INC"}
                </span>{" "}
                ©
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* END Footer Section: With Links Info Newsletter Dark */}
    </>
  );
}
