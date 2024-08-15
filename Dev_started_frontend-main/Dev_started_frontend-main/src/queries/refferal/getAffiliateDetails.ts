import authRequest from "../authRequest";

async function getAffiliateDetails() {
  try {
    const response = await authRequest({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/affiliate`,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export default getAffiliateDetails;
