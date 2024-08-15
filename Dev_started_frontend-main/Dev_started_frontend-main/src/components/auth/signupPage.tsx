"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginProvider } from "./types";
import toast from "react-hot-toast";
import { useUserContext } from "../../contexts/userContext";
import { useRouter, useSearchParams } from "next/navigation";
import useHandleLoginSuccess from "../../hooks/auth/usehandleLoginSuccess";
import { useSignUpWithPasswordMutation } from "../../queries/auth/login/useSignupWithPasswordMutation";
import { parseError } from "../../utils/errors";
import { getSocialAuthInitUrl } from "../../queries/auth/login/useGetSocialAuthUrl";
import { AFFILIATE_CODE_KEY, NEXT_ROUTE_KEY } from "../../utils/constants";
import { ForwardIcon } from "lucide-react";
import Cookies from "js-cookie";
export default function SignupPage() {
  const { user } = useUserContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleLoginSuccess } = useHandleLoginSuccess();
  const [emailVerificationRequired, setEmailVerificationRequired] =
    useState<boolean>(false);

  useEffect(() => {
    const nextRoute = searchParams.get(NEXT_ROUTE_KEY);
    if (user?.is_active) {
      router.push("/dashboard");
      router.push(nextRoute ?? "/dashboard");
    }
  }, [user, router, searchParams]);

  const {
    mutate: signUpWithPassword,
    isLoading: isLoadingCheckoutSession,
    error: loginError,
  } = useSignUpWithPasswordMutation({
    onSuccess: async (token, verificationRequired) => {
      if (verificationRequired) {
        setEmailVerificationRequired(true);
        return;
      }
      await handleLoginSuccess(token);
    },
    onError: (error: any) => {
      toast.error(parseError(error));
    },
  });
  const handleSignup = async (provider: LoginProvider) => {
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
        if (!firstName) {
          toast.error("Please enter FirstName");
          return;
        }
        if (password2 !== password) {
          toast.error("Please enter FirstName");
          return;
        }
        const affiliateCode = Cookies.get(AFFILIATE_CODE_KEY);
        signUpWithPassword({
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          affiliateCode: affiliateCode,
        });
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
            {emailVerificationRequired
              ? "Please check your email for verification link"
              : "Welcome, please sign in to your dashboard"}
          </h2>
        </div>
        {!emailVerificationRequired ? (
          <div className="grow px-5 pb-5 md:px-16  ">
            <div className="flex gap-2">
              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  First Name
                </label>
                <input
                  autoComplete="email"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="First Name"
                  className="block text-gray-600 w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Last Name
                </label>
                <input
                  autoComplete="email"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Last Name"
                  className="block text-gray-600 w-full rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
                />
              </div>
            </div>
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

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">
                Confirm Password
              </label>
              <input
                value={password2}
                onChange={(e) => {
                  setPassword2(e.target.value);
                }}
                autoComplete="current-password"
                type="password"
                id="password"
                name="password"
                placeholder="Confirm Password"
                className="block w-full text-gray-600 rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
              />
            </div>
            <div>
              <div className="mb-5 flex items-center justify-between space-x-2">
                <Link
                  href="/forgot-password"
                  className="inline-block text-sm font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                onClick={() => handleSignup("password")}
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
                  onClick={() => handleSignup("google")}
                  type="button"
                  className="inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                >
                  <Image
                    src="/icons/google.svg"
                    height={30}
                    width={30}
                    alt="Login with google"
                  />
                  <span>Google</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="my-4 text-center mx-6">
            <button
              onClick={() => handleSignup("password")}
              className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-6 py-3 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-gray-600 focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
            >
              <ForwardIcon className="hi-mini hi-arrow-uturn-right inline-block h-5 w-5 opacity-50" />

              <span>Resend Verification Email</span>
            </button>
          </div>
        )}
        <div className="grow bg-gray-50 p-5 text-center text-sm dark:bg-gray-700/50 md:px-16 text-gray-500">
          Already have an account?
          <Link
            href="/login"
            className="font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
          >
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
