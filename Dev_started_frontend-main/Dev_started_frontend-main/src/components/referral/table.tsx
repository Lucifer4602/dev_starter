import React from "react";
import { AffiliateDetails } from "./types";

interface EarningsComponentProps {
  statsData: AffiliateDetails;
}

const EarningsComponent = (Props: EarningsComponentProps) => {
  const { statsData } = Props;

  return (
    <>
      <h1 className="text-5xl text-gray-500-700 m-5 text-center">
        Your Earnings
      </h1>
      <p className="text-gray-600 mx-6 px-64  my-6 w-full text-center">
        track your refferal here, we provide all stats required for tracking.
      </p>
      <div className="flex justify-center">
        <div className="w-1/3 p-4">
          <div className="bg-white rounded-lg shadow-md h-full dark:bg-gray-600">
            <div className="flex flex-col h-1/4 border-b p-5">
              <span className="text-gray-500 dark:text-gray-50">Total Referrals</span>
              <span className="float-right text-3xl">
                {statsData.totalReferrals}
              </span>
            </div>
            <div className="flex flex-col h-1/4 border-b p-5">
              <span className="text-gray-500 dark:text-gray-50">Earnings</span>
              <span className="float-right text-3xl">
                ${statsData.earnings}
              </span>
            </div>
            <div className="flex flex-col h-1/4 border-b p-5">
              <span className="text-gray-500 dark:text-gray-50">Total Clicks</span>
              <span className="float-right text-3xl">{statsData.ctr}</span>
            </div>
            <div className="flex flex-col mb-4 h-1/4 border-b p-5">
              <span className="text-gray-500 dark:text-gray-50">Total sign-ups</span>
              <span className="float-right text-3xl">
                {statsData.totalSignups}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EarningsComponent;
