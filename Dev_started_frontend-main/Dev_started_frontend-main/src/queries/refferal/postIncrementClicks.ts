import authRequest from "../authRequest";

async function postIncrementClicks(affiliateCode: string) {
  try {
    const response = await authRequest({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/affiliate/increment-clicks`,
      params: {
        affiliate_code: affiliateCode,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default postIncrementClicks;
