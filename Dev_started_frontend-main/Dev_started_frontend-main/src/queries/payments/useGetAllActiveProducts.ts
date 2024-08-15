import axios from "axios";
import { useQuery } from "react-query";

const useGetAllActivePlans = () => {
  const fetchPlans = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/plans`,
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch plans");
    }
  };

  return useQuery("activePlans", fetchPlans);
};

export default useGetAllActivePlans;
