import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { useUserContext } from "../../contexts/userContext";
import { NEXT_ROUTE_KEY, TokenKey } from "../../utils/constants";
import { getUserInfo } from "../../queries/auth/login/useGetUserInfo";

export default function useHandleLoginSuccess() {
  const { setUser } = useUserContext();
  const [cookies, setCookie] = useCookies([TokenKey]);

  const router = useRouter();

  const searchParams = useSearchParams();

  return {
    handleLoginSuccess: async (
      token: string,
      isImpersonated: boolean = false,
    ) => {
      try {
        setCookie(TokenKey, token);
        const userInfo = await getUserInfo();
        setUser({
          newUser: {
            providers: userInfo.providers,
            avatar_url: userInfo.avatar_url,
            stripe_customer_id: userInfo.stripe_customer_id,
            first_name: userInfo.first_name,
            last_name: userInfo.last_name,
            username: userInfo.username,
            email: userInfo.email,
            is_active: userInfo.is_active,
            is_impersonated: userInfo.is_impersonated,
            github_username: userInfo.github_username,
          },
          newSubscription: userInfo.subscriptions,
        });

        let nextRoute = searchParams.get(NEXT_ROUTE_KEY);
        const state = searchParams.get("state");
        if (state) {
          let decodedState = atob(state);
          nextRoute = JSON.parse(decodedState ?? "{}")?.next;
        }
        if (nextRoute === "" || nextRoute == null) {
          router.push("/dashboard");
          return;
        } else {
          router.push(nextRoute);
        }
      } catch (err) {
        console.log("err --<>",err)
      }
    },
  };
}
