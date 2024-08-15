import PrivacyComponent from "./PrivacyComponent";
import { metaData, jsonLdData } from "./metainfo";
import { Metadata } from "next";

export const metadata: Metadata = metaData;
export const dynamic = "force-dynamic";
export default function PrivacyPage() {
  return (
    <>
      <section>
        {" "}
        <script
          key="structured-data-privacy"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </section>

      <PrivacyComponent />
    </>
  );
}
