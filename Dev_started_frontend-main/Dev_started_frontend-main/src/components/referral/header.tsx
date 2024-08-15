import { DollarSign, Grid3X3, Play } from "lucide-react";
import React from "react";

const ReferralHeader = () => {
  const Introduction = [
    {
      title: "Invite people",
      description:
        "These are the steps that you need to follow to be able to earn with us.",
      icon: <Play />,
    },
    {
      title: "Buy first Template",
      description:
        "These are the steps that you need to follow to be able to earn with us.",
      icon: <Grid3X3 />,
    },
    {
      title: "Earn Money",
      description:
        "These are the steps that you need to follow to be able to earn with us.",
      icon: <DollarSign />,
    },
  ];
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-lg py-12 flex flex-col items-center">
      <h1 className="text-5xl font-bold-700 text-pink-600 dark:text-pink-800 mb-8 ">
        Referral System
      </h1>
      <p className="text-gray-600 dark:text-white mx-6 px-64  w-full text-center">
        Empower enterprise solutions with our Next.js & Django SaaS Boilerplate.
        Built for peak performance, scalability, and reliability—an MVP-ready
        solution accelerating your development journey.
      </p>
      <div className="bg-gray-100 dark:bg-gray-900 py-12 flex flex-row items-center mb-8 space-x-10">
        {Introduction.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-pink-300 rounded-full w-20 h-20 flex items-center justify-center text-pink-900 text-3xl font-bold mb-4">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm text-center">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralHeader;
