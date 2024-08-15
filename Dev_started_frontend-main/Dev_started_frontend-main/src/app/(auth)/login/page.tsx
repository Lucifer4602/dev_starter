import { Metadata } from "next";
import LoginPage from "../../../components/auth/loginPage";
import { metaData, jsonLdData } from "./metainfo";

export const metadata: Metadata = metaData;

// @link https://github.com/vercel/next.js/issues/58615#issuecomment-1839619903
// Force-dynamic required to avoid a noindex tag
export const dynamic = "force-dynamic";
export default function Login() {
  return (
    <>
      <section>
        <script
          key="structured-data-login"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </section>
      <LoginPage />
    </>
  );
}
