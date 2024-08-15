import Terms from "./terms";
import { Metadata } from "next";
import { jsonLdData, metaData } from "./metainfo";

export const metadata: Metadata = metaData;
export const dynamic = "force-dynamic";
export default function TermsPage() {
  return (
    <>
      <section>
        {" "}
        <script
          key="structured-data-terms"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </section>

      <Terms />
    </>
  );
}
