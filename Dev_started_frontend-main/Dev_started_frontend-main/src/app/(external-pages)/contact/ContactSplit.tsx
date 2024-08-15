"use client";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { parseError } from "../../../utils/errors";
import { SendHorizonalIcon } from "lucide-react";
import { useSubmitContactFormWithMutation } from "@/queries/communication/SubmitcontactForm";
import ReCAPTCHA from "react-google-recaptcha";
export default function ContactWithImageCover() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const recaptcha_site_key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const { mutate: submitContactForm } = useSubmitContactFormWithMutation({
    onSuccess: async (message) => {
      toast.success(message);

      setFirstName(" ");
      setLastName(" ");
      setEmail(" ");
      setMessage(" ");
    },
    onError: (error: any) => {
      toast.error(parseError(error));

      setFirstName(" ");
      setLastName(" ");
      setEmail(" ");
      setMessage(" ");
    },
  });
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleContact = async (e: { preventDefault: () => void }) => {
    // Validation logic
    let token = null;
    if (recaptcha_site_key) {
      token = await recaptchaRef.current?.executeAsync();
    }

    console.log(token);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter valid email address.");
      return;
    }
    submitContactForm({
      first_name: firstName,
      last_name: lastName,
      email: email,
      message: message,
      token: token as string,
    });
  };
  return (
    <>
      {/* Contact Section: With Image Cover */}
      <div
        className="bg-cover"
        style={{
          backgroundImage: 'url("/contactbackground.jpg")',
        }}
      >
        <div className="bg-gray-50/95 dark:bg-gray-900/95 dark:text-gray-100">
          <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
            <div className="flex flex-col space-y-16 lg:flex-row lg:items-center lg:space-x-16 lg:space-y-0">
              {/* Heading with Company Info */}
              <div className="lg:w-2/5">
                <div className="mb-1 text-sm font-bold uppercase tracking-wider text-pink-600 dark:text-pink-500">
                  We reply in 24hrs
                </div>
                <h2 className="mb-4 text-4xl font-black text-black dark:text-white">
                  Get in touch
                </h2>
                <h3 className="text-xl font-medium leading-relaxed text-gray-700 dark:text-gray-300">
                  If something does not make sense, feel free to contact us and
                  we will get back to you as soon as possible.
                </h3>
                <h4 className="mb-4 mt-10 font-semibold uppercase tracking-wider">
                  Byteoski Developers (The DevAngel).
                </h4>
                <div className="leading-relaxed text-gray-600 dark:text-gray-400">
                  2829 Street no6 ATI Road
                  <br />
                  Ludhiana, 141003
                  <br />
                  <abbr title="Phone">P:</abbr> +91 7347298215
                </div>
              </div>
              {/* END Heading with Company Info */}

              {/* Contact Form */}
              <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100 lg:mx-auto lg:w-1/2">
                <div className="space-y-6 p-5 md:p-10">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="firstname" className="font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        required={true}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="lastname" className="font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={lastName}
                        required={true}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="email" className="font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required={true}
                      value={email}
                      onChange={(e) => {
                        return setEmail(e.target.value);
                      }}
                      className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="message" className="font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={message}
                      required={true}
                      onChange={(e) => setMessage(e.target.value)}
                      className="block w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
                      defaultValue={""}
                    />
                  </div>
                  {recaptcha_site_key && (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      size="invisible"
                      sitekey={recaptcha_site_key}
                    />
                  )}
                  <button
                    type="submit"
                    onClick={handleContact}
                    disabled={!firstName || !lastName || !email || !message}
                    className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-8 py-4 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
                  >
                    <SendHorizonalIcon className="hi-mini hi-paper-airplane inline-block h-5 w-5 opacity-50" />

                    <span>Send Message</span>
                  </button>
                </div>
              </div>
              {/* END Contact Form */}
            </div>
          </div>
        </div>
      </div>
      {/* END Contact Section: With Image Cover */}
    </>
  );
}
