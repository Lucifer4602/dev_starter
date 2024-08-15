import React from "react";
import { Metadata } from "next";
import { jsonLdData, metaData } from "./metainfo";
import Changelog from "@/components/Changelog";
export const metadata: Metadata = metaData;
export const dynamic = "force-dynamic";

const page = () => {
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
      <Changelog />
    </>
  );
};

export default page;
