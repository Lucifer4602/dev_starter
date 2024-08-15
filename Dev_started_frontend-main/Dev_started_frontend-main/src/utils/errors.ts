export const errors = {
  add: (error: unknown) => {
    // link to sentry here
    console.error(error);
  },
};

export function parseError(error: any): string {
  if (error?.response?.data?.detail) {
    const e = error?.response?.data?.detail;
    if (e.length > 0 && typeof e !== "string") {
      let errorMessage = "";

      errorMessage += Object.keys(e).map((err) => {
        if (e[err]?.loc?.length > 1) {
          return e[err]?.loc[1] + "  " + e[err]?.msg + "\n";
        } else {
          return e[err]?.msg + "\n";
        }
      });
      return errorMessage;
    }
    return error?.response?.data?.detail;
  } else if (error?.message) {
    return error?.message;
  }

  return `Something went wrong, please contact ${
    process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "Support team"
  }`;
}
