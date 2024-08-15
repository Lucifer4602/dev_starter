import { Metadata } from "next";
import LandingPage from "../../components/LandingPage";
import { jsonLdData, metaData } from "./homemetainfo";
import WaitingList from "@/components/WaitingList";

export const metadata: Metadata = metaData;

// @link https://github.com/vercel/next.js/issues/58615#issuecomment-1839619903
// Force-dynamic required to avoid a noindex tag
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <section>
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </section>
      {process.env.NEXT_PUBLIC_IS_WAITING_LIST_ENABLED === "true" ? (
        <WaitingList />
      ) : (
        <LandingPage />
      )}
    </>
  );
}
