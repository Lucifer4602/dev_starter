import { CircleUserRound, UserRound } from "lucide-react";
import Header from "./header";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserContext } from "@/contexts/userContext";
import toast from "react-hot-toast";
import { parseError } from "@/utils/errors";
import { useUpdateUserProfileMutation } from "@/queries/auth/useUpdateUserProfileMutation";

export default function Profile() {
  const { user } = useUserContext();
  const [userAvatar, setUserAvatar] = useState<File>();
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    setUserAvatarUrl(user?.avatar_url ?? "");
    setUserEmail(user?.email ?? "");
    setFirstName(user?.first_name ?? "");
    setLastName(user?.last_name ?? "");
  }, [user?.email, user?.avatar_url, user?.first_name, user?.last_name]);

  const handleImageChange = (event: any) => {
    if (event.target.files[0]) {
      const url = URL.createObjectURL(event.target.files[0]);
      setUserAvatar(event.target.files[0]);
      setUserAvatarUrl(url);
    }
  };

  const {
    mutate: updateUserProfile,
    isLoading: isLoading,
    error: checkoutError,
  } = useUpdateUserProfileMutation({
    onError: (error: any) => {
      toast.error(parseError(error));
    },
  });

  const handleSubmit = async () => {
    const toastId = toast.loading("Updating data...");
    try {
      const formData = new FormData();

      formData.append(
        "input_data",
        JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: userEmail,
        }),
      );
      formData.append("user_avatar", userAvatar ?? "");
      await updateUserProfile(formData);
    } finally {
      toast.dismiss(toastId);
      toast.success("Update successful");
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
      {/* Header */}

      <Header title={"Profile"}>
        {" "}
        <UserRound className="text-pink-500" />{" "}
      </Header>
      {/* END Header */}

      {/* Body */}
      <div className="grow p-5 md:flex md:space-x-5">
        <p className="mb-5 text-sm text-gray-500 dark:text-gray-400 md:w-1/3 md:flex-none">
          Your account’s vital info. Only your username and photo will be
          publicly visible.
        </p>
        <div className="space-y-6 md:w-1/2">
          <div className="space-y-1">
            <label className="font-medium">Photo</label>
            <div className="space-y-4 sm:flex sm:items-center sm:space-x-4 sm:space-y-0">
              {userAvatarUrl ? (
                <Image
                  src={userAvatarUrl}
                  alt="User Avatar"
                  height="64"
                  width={64}
                />
              ) : (
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-300 dark:bg-gray-700 dark:text-gray-500">
                  <CircleUserRound className="text-gray-500 inline-block h-8 w-8" />
                </div>
              )}

              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                  type="file"
                  id="photo"
                  name="photo"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-pink-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-pink-700 hover:file:bg-pink-100 dark:text-gray-400 dark:file:bg-pink-200 dark:file:text-pink-800 dark:hover:file:bg-pink-300"
                />
              </label>
            </div>
          </div>
          <div className="space-y-1">
            <label htmlFor="username" className="font-medium">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              name="firstName"
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="name" className="font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="LastName"
              name="LastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
              className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
            />
          </div>

          <button
            onClick={async () => {
              await handleSubmit();
            }}
            type="submit"
            className="inline-flex items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-3 py-2 text-sm font-semibold leading-5 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
          >
            Update Profile
          </button>
        </div>
      </div>
      {/* END Body */}
    </div>
  );
}
