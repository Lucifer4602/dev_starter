"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginProvider } from "./types";

import toast from "react-hot-toast";
import { useCookies } from "react-cookie";

import { useRouter, useSearchParams } from "next/navigation";
import { NEXT_ROUTE_KEY, TokenKey } from "../../utils/constants";
import { useUserContext } from "../../contexts/userContext";
import useHandleLoginSuccess from "../../hooks/auth/usehandleLoginSuccess";
import { useLoginWithPasswordMutation } from "../../queries/auth/login/useLoginWithPasswordMutation";
import { parseError } from "../../utils/errors";
import { getSocialAuthInitUrl } from "../../queries/auth/login/useGetSocialAuthUrl";
import { ForwardIcon } from "lucide-react";

export default function LoginPage() {
  const [cookies, setCookie] = useCookies([TokenKey]);
  const { user, setUser } = useUserContext();
  const router = useRouter();
  useEffect(() => {
    if (user?.is_active) {
      router.push("/dashboard");
    }
  }, [router, user]);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleLoginSuccess } = useHandleLoginSuccess();

  const searchParams = useSearchParams();

  const {
    mutate: loginWithPassword,
    isLoading: isLoadingCheckoutSession,
    error: loginError,
  } = useLoginWithPasswordMutation({
    onSuccess: async (token, verificationRequired) => {
      if (verificationRequired) {
        toast.error("Please check your email for verification");

        return;
      }
      await handleLoginSuccess(token);
    },
    onError: (error: any) => {
      toast.error(parseError(error));
    },
  });
  const handleLogin = async (provider: LoginProvider) => {
    switch (provider) {
      case "password":
        if (!email) {
          toast.error("Please enter password");
          return;
        }
        if (!password) {
          toast.error("Please enter password");
          return;
        }
        loginWithPassword({ email: email, password: password });
        break;
      case "google":
        const nextRoute = searchParams.get(NEXT_ROUTE_KEY);
        const authUrl = await getSocialAuthInitUrl(nextRoute ?? "");
        router.push(authUrl);
    }
  };

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
        <div className="w-full max-w-xl  text-center">
          <h2 className="text-md font-medium text-gray-500 md:pt-12 dark:text-gray-400">
            Welcome, please sign in to your dashboard
          </h2>
        </div>
        <div className="grow px-5 pb-5 md:px-16 ">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="block text-gray-600 w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              autoComplete="current-password"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="block w-full text-gray-600 rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
            />
          </div>
          <div>
            <div className="mb-5 flex items-center justify-between space-x-2 pt-2">
              <Link
                href="/forgot-password"
                className="inline-block text-sm font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              onClick={() => handleLogin("password")}
              className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-6 py-3 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-gray-600 focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
            >
              <ForwardIcon className="hi-mini hi-arrow-uturn-right inline-block h-5 w-5 opacity-50" />

              <span>Sign In</span>
            </button>
            {/* Divider: With Label */}
            <div className="my-5 flex items-center">
              <span
                aria-hidden="true"
                className="h-0.5 grow rounded bg-gray-100 dark:bg-gray-700/75"
              />
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                or sign in with
              </span>
              <span
                aria-hidden="true"
                className="h-0.5 grow rounded bg-gray-100 dark:bg-gray-700/75"
              />
            </div>
            {/* END Divider: With Label */}
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleLogin("google")}
                type="button"
                className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
              >
                <Image
                  src="/icons/google.svg"
                  height={30}
                  width={30}
                  alt="Login to TheDevStarter with google"
                />
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>
        <div className="grow bg-gray-50 p-5 text-center text-sm dark:bg-gray-700/50 md:px-16 text-gray-500">
          Don’t have an account yet?
          <Link
            href="/sign-up"
            className="font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
