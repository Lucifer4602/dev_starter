// Import necessary modules from React
import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the general modal content
type GeneralModalContent = Partial<{
  heading: string;
  description: string;
  buttonName: string;
  buttonHref: string;
  icon: ReactNode;
}>;

// Define the type for the general modal context
type GeneralModalContextType = {
  isGeneralOpen: boolean;
  openGeneralModal: (content: GeneralModalContent) => void;
  closeGeneralModal: () => void;
  modalContent: GeneralModalContent | null;
};
type FeedbackModalContextType = {
  isFeedbackOpen: boolean;
  openFeedbackModal: () => void;
  closeFeedbackModal: () => void;
};
type LoadingModalContextType = {
  isLoading: boolean;
  openLoadingModal: () => void;
  closeLoadingModal: () => void;
};

// Create the general modal context
type CombinedModalContextType = GeneralModalContextType &
  FeedbackModalContextType &
  LoadingModalContextType;

export const ModalContext = createContext<CombinedModalContextType>({
  isGeneralOpen: false,
  openGeneralModal: () => {},
  closeGeneralModal: () => {},
  modalContent: null,
  isFeedbackOpen: false,
  openFeedbackModal: () => {},
  closeFeedbackModal: () => {},
  isLoading: false,
  openLoadingModal: () => {},
  closeLoadingModal: () => {},
});
// Create a custom hook to use the general modal context
export function useGeneralModalContext() {
  return useContext(ModalContext);
}
export function useFeedbackModalContext() {
  return useContext(ModalContext);
}
export function useLoadingModalContext() {
  return useContext(ModalContext);
}
// Define the general modal provider component
export function ModalContextProvider({ children }: { children: ReactNode }) {
  // State to manage the modal's open/closed status
  const [isGeneralOpen, setIsGeneralOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State to manage the content of the modal
  const [modalContent, setModalContent] = useState<GeneralModalContent | null>(
    null,
  );

  // Function to open the modal with dynamic content
  const openGeneralModal = (content: GeneralModalContent) => {
    setModalContent(content);
    setIsGeneralOpen(true);
  };

  // Function to close the modal
  const closeGeneralModal = () => {
    setModalContent(null);
    setIsGeneralOpen(false);
  };
  const openFeedbackModal = () => {
    setIsFeedbackOpen(true);
  };

  // Function to close the modal
  const closeFeedbackModal = () => {
    setIsFeedbackOpen(false);
  };

  const openLoadingModal = () => {
    setIsLoading(true);
  };

  // Function to close the modal
  const closeLoadingModal = () => {
    setIsLoading(false);
  };
  // Provide the context value to the components in the subtree
  const contextValue: CombinedModalContextType = {
    isGeneralOpen,
    openGeneralModal,
    closeGeneralModal,
    modalContent,
    isFeedbackOpen,
    openFeedbackModal,
    closeFeedbackModal,
    isLoading,
    openLoadingModal,
    closeLoadingModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}
