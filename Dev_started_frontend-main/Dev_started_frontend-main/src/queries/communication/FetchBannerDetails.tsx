import axios from "axios";
import { useQuery } from "react-query";

const useGetBannerDetails = () => {
  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/communication/fetch_banner_details`,
      );
      return response.data;
    } catch (error) {
      console.log("Failed to fetch banner");
    }
  };

  return useQuery("data", fetchDetails);
};

export default useGetBannerDetails;
