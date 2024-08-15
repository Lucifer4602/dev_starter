import ContactUs from "./ContactUs";
import { Metadata } from "next";
import { metaData, jsonLdData } from "./metainfo";

export const metadata: Metadata = metaData;
export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <>
      <section>
        <script
          key="structured-data-contact-us"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </section>
      <ContactUs />;
    </>
  );
}
