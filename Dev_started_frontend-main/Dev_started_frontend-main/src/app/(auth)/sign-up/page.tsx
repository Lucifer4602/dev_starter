import { Metadata } from "next";
import SignupPage from "../../../components/auth/signupPage";
import { metaData, jsonLdData } from "./metainfo";

export const metadata: Metadata = metaData;
export const dynamic = "force-dynamic";
export default function Signup() {
  return (
    <>
      <section>
        <script
          key="structured-data-signup"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </section>
      <SignupPage />
    </>
  );
}
