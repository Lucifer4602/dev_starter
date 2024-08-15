import Roadmap from "@/components/Roadmap";
import React from "react";
import { Metadata } from "next";
import { jsonLdData, metaData } from "./metainfo";
export const metadata: Metadata = metaData;
export const dynamic = "force-dynamic";
const page = () => {
  return (
    <div>
      <section>
        {" "}
        <script
          key="structured-data-terms"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </section>
      <Roadmap />
    </div>
  );
};

export default page;
