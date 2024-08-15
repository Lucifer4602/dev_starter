import { useRouter } from "next/navigation";
import { clearAllCookie } from "../../utils/auth";
import { useUserContext } from "../../contexts/userContext";

export default function useLogout() {
  const router = useRouter();
  const { user, setUser } = useUserContext();

  return () => {
    try {
      setUser({ newUser: null, newSubscription: null });
      clearAllCookie();
      router.push("/login");
    } catch (err) {
      console.log("err---<>", err);
    }
  };
}
