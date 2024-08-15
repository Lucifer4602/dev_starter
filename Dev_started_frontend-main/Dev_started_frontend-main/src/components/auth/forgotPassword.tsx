"use client";
import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useUserContext } from "../../contexts/userContext";
import { TokenKey } from "../../utils/constants";
import { useRouter, useSearchParams } from "next/navigation";
import useHandleLoginSuccess from "../../hooks/auth/usehandleLoginSuccess";
import { useForgotPasswordMutation } from "../../queries/auth/useForgotPasswordMutation";
import toast from "react-hot-toast";
import { parseError } from "../../utils/errors";
import { useResetPasswordMutation } from "../../queries/auth/useResetPasswordMutation";
import { ForwardIcon } from "lucide-react";

export default function ForgotPasswordPage() {
  const [cookies, setCookie] = useCookies([TokenKey]);
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const [email, setEmail] = useState<string>("");

  const { handleLoginSuccess } = useHandleLoginSuccess();

  const searchParams = useSearchParams();

  const resetCode = searchParams.get("code");

  const [password2, setPassword2] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const {
    mutate: handleForgotPassword,
    isLoading: isLoadingForgotPassword,
    error: authError,
  } = useForgotPasswordMutation({
    onSuccess: async (token) => {
      toast.success("Please check your email for a Reset link");
    },
    onError: (error: any) => {
      toast.error(parseError(error));
    },
  });

  const {
    mutate: handleResetPassword,
    isLoading: isLoadingResetPassword,
    error: resetPasswordError,
  } = useResetPasswordMutation({
    onSuccess: async (token) => {
      await handleLoginSuccess(token);
    },
    onError: (error: any) => {
      toast.error(parseError(error));
    },
  });

  const handleChangePassword = () => {
    if (!resetCode) {
      toast.error(
        `Invalid request, please contact ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`,
      );
      return;
    }
    if (password !== password2) {
      toast.error("Both passwords don't match ");
      return;
    } else {
      handleResetPassword({
        code: resetCode,
        password: password,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
        <div className="w-full max-w-xl  text-center">
          <h2 className="text-md font-medium text-gray-500 md:pt-12 dark:text-gray-400">
            Reset Password
          </h2>
        </div>
        {!!!resetCode ? (
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

            <div>
              <div className="mb-5 flex items-center justify-between space-x-2 pt-2">
                <Link
                  href="/login"
                  className="inline-block text-sm font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
                >
                  Login instead ?
                </Link>
              </div>
              <button
                onClick={() => handleForgotPassword({ email })}
                className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-6 py-3 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-gray-600 focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
              >
                {" "}
                <ForwardIcon className="hi-mini hi-arrow-uturn-right inline-block h-5 w-5 opacity-50" />
                <span>Send Link</span>
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
            </div>
          </div>
        ) : (
          <div className="grow px-5 pb-5 md:px-16 ">
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
                placeholder="Enter your password"
                className="block w-full text-gray-600 rounded-lg border border-gray-200 px-5 py-3 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
              />
            </div>
            <button
              onClick={() => handleChangePassword()}
              className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-6 py-3 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-gray-600 focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
            >
              <ForwardIcon className="hi-mini hi-arrow-uturn-right inline-block h-5 w-5 opacity-50" />
              <span>Reset Password</span>
            </button>
          </div>
        )}
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
