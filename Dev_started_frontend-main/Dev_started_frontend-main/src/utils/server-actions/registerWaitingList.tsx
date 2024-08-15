"use server";

import axios from "axios";

export async function registerWaitingList(email: string) {
  // TODO add captcha: Should be valid only env for captcha is present
  try {
    let resp = await axios({
      method: "POST",
      url: `https://api.brevo.com/v3/contacts`,
      data: {
        updateEnabled: false,
        email: email,
      },
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
    });
    console.log(resp.status, resp.data);
    return resp.data;
  } catch (err: any) {
    if (err.response) {
      console.log("Brevo API Error:", err.response.status, err.response.data);
    } else if (err.request) {
      console.log("Network Error:", err.message);
    } else {
      console.log("Other Error:", err.message);
    }
    throw err;
  }
}
