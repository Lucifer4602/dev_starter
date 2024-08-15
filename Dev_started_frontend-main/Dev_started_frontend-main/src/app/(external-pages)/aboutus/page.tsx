import AboutUs from "@/components/AboutUs/AboutUs";
import { Metadata } from "next";
import { metaData, jsonLdData } from "./metainfo";

export const metadata: Metadata = metaData;
export const dynamic = "force-dynamic";
export default function Page() {
  return (
    <>
      <section>
        {" "}
        <script
          key="structured-data-aboutus"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </section>

      <AboutUs />
    </>
  );
}
