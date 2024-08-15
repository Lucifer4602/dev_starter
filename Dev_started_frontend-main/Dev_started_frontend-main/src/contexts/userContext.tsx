"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../queries/auth/login/types";
import { Subscription } from "../queries/payments/types";
import useGetUserInfo from "../queries/auth/login/useGetUserInfo";

type userContextType = {
  user: User | null;
  subscription: Subscription | null;
  setUser: ({
    newUser,
    newSubscription,
  }: {
    newUser: User | null;
    newSubscription: Subscription | null;
  }) => void;
};

export const UserContext = createContext<userContextType>({
  user: null,
  subscription: null,
  setUser: () => {},
});

export function useUserContext() {
  return useContext(UserContext);
}

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const setUserAndSubscriptions = ({
    newUser,
    newSubscription,
  }: {
    newUser: User | null;
    newSubscription: Subscription | null;
  }) => {
    setUser(newUser);
    setSubscription(newSubscription);
  };

  const { data: userInfo, isLoading, error } = useGetUserInfo();

  useEffect(() => {
    if (!userInfo) {
      setUser(null);
    } else {
      setUser({
        providers: userInfo?.providers,
        avatar_url: userInfo?.avatar_url,
        stripe_customer_id: userInfo?.stripe_customer_id,
        first_name: userInfo?.first_name,
        last_name: userInfo?.last_name,
        username: userInfo?.username,
        email: userInfo?.email,
        is_active: userInfo?.is_active,
        github_username: userInfo?.github_username,
        is_impersonated: userInfo?.is_impersonated,
      });
      setSubscription(userInfo?.subscription);
    }
  }, [isLoading, userInfo]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        subscription: subscription,
        setUser: setUserAndSubscriptions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
