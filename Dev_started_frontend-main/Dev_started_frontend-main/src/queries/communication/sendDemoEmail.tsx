import authRequest from "../authRequest";

const sendDemoEmail = async (data: Object) => {
  try {
    const response = await authRequest({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/communication/send-demo-email`,
      method: "POST",
      data: data,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to send email");
  }
};
export default sendDemoEmail;
