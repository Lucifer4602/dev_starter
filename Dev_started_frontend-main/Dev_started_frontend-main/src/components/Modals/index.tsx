// Modals.tsx
import React from "react";
import GeneralModal from "./GeneralModal";
import FeedbackModal from "./FeedbackModal";
import LoadingScreen from "./LoadingScreen";
const Modals: React.FC = () => {
  return (
    <>
      <GeneralModal />
      <FeedbackModal />
      <LoadingScreen />
    </>
  );
};

export default Modals;
