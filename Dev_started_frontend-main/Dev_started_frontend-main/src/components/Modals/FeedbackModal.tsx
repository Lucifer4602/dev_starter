import { Fragment, useState, useEffect } from "react";
import { XCircleIcon, SendHorizonalIcon } from "lucide-react";
// Headless UI, for more info and examples you can check out https://github.com/tailwindlabs/headlessui
import { Dialog, Transition } from "@headlessui/react";
import { useFeedbackModalContext } from "../../contexts/ModalProvider";
import {
  AnnoyedIcon,
  FrownIcon,
  LaughIcon,
  MehIcon,
  SmileIcon,
} from "lucide-react";
import { useSubmitFeedbackFormWithMutation } from "@/queries/communication/SubmitFeedback";
import toast from "react-hot-toast";
import { parseError } from "../../utils/errors";

export default function FeedbackModal() {
  const [feedbackScore, setFeedbackScore] = useState(0);
  const [feedbackSuggestion, setFeedbackSuggestion] = useState("");
  const [feedbackOtherSuggestions, setFeedbackOtherSuggestions] = useState("");

  const icons = [FrownIcon, AnnoyedIcon, MehIcon, SmileIcon, LaughIcon];

  const { isFeedbackOpen, closeFeedbackModal } = useFeedbackModalContext();
  const feedbackSuggestions = [
    "Customer Support",
    "Template structure",
    "UI Design",
    "Overall Service",
  ];
  useEffect(() => {
    const handlePopstate = () => {
      if (isFeedbackOpen) {
        closeFeedbackModal();
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isFeedbackOpen, closeFeedbackModal]);
  const { mutate: submitFeedbackForm } = useSubmitFeedbackFormWithMutation({
    onSuccess: async (message) => {
      toast.success(message);
      closeFeedbackModal();
      setFeedbackScore(0);
      setFeedbackOtherSuggestions("");
      setFeedbackSuggestion("");
    },
    onError: (error: any) => {
      toast.error(parseError(error));
      closeFeedbackModal();
      setFeedbackScore(0);
      setFeedbackOtherSuggestions("");
      setFeedbackSuggestion("");
    },
  });
  const handleSubmit = () => {
    if (!feedbackScore) {
      toast.error("Please choose a feedback reaction");
      return;
    }
    submitFeedbackForm({
      feedback_score: feedbackScore,
      feedback_suggestion: feedbackSuggestion,
      feedback_other_suggestions: feedbackOtherSuggestions,
    });
  };

  return (
    isFeedbackOpen && (
      <>
        {/* Modals: With Form */}
        <div className="">
          {/* Modal Container */}
          <Transition appear show={isFeedbackOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-100"
              onClose={closeFeedbackModal}
            >
              {/* Modal Backdrop */}
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm" />
              </Transition.Child>
              {/* END Modal Backdrop */}

              {/* Modal Dialog */}
              <div className="fixed inset-0 overflow-y-auto p-4 lg:p-8 flex flex-col justify-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-200"
                  enterFrom="opacity-0 scale-125"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-100"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-125"
                >
                  <Dialog.Panel className="mx-auto  border border-slate-200 flex w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:text-gray-100">
                    <div className="flex items-center justify-between bg-gray-100/50 px-5 py-6 dark:bg-gray-700/50">
                      <Dialog.Title
                        as="h3"
                        className="flex items-center space-x-2 font-medium text-base"
                      >
                        <span>Feedback Form</span>
                      </Dialog.Title>

                      <XCircleIcon
                        onClick={closeFeedbackModal}
                        className="h-6 w-6 hover:cursor-pointer font-normal text-base"
                      />
                    </div>

                    <div className="grow p-5">
                      <p className="mb-6 text-md font-medium">
                        Tell us what we can improve?
                      </p>
                      <div className="grid grid-cols-2 gap-4 mb-6 ">
                        {feedbackSuggestions?.map((suggestion, index) => (
                          <div
                            key={index}
                            onClick={() => setFeedbackSuggestion(suggestion)}
                            className={`text-sm rounded-xl hover:cursor-pointer  hover:bg-pink-700 hover:text-white hover:border-none py-2 text-center ${
                              feedbackSuggestions[index] == feedbackSuggestion
                                ? "bg-pink-700 text-white border border-pink-700"
                                : "border-gray-300 border text-black bg-slate-50/80"
                            }`}
                          >
                            {suggestion}
                          </div>
                        ))}
                      </div>
                      <p className="mb-6 text-md font-medium">
                        Other Suggestions
                      </p>
                      <textarea
                        id="suggestion"
                        name="suggestion"
                        rows={6}
                        value={feedbackOtherSuggestions}
                        onChange={(e) =>
                          setFeedbackOtherSuggestions(e.target.value)
                        }
                        placeholder="Write suggestion"
                        className=" border border-gray-300 block w-full rounded-lg px-3 py-2 text-sm leading-5 placeholder-gray-400"
                      />
                    </div>
                    <div className="flex justify-center space-x-4 mb-3 border border-gray-200 w-[90%] mx-auto py-2 rounded-xl">
                      {icons.map((Icon, index) => (
                        <Icon
                          onClick={() => setFeedbackScore(index + 1)}
                          key={index}
                          className={`h-10 w-7 hover:cursor-pointer hover:text-pink-600 font-light ${
                            index == feedbackScore - 1
                              ? "text-pink-600"
                              : "text-pink-200"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="space-x-2 bg-gray-50 px-5 py-6 text-right dark:bg-gray-700/50">
                      <button
                        onClick={closeFeedbackModal}
                        type="button"
                        className="inline-flex items-center justify-center space-x-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className="inline-flex items-center justify-center space-x-2 rounded-xl border border-pink-700 bg-pink-700 px-3 py-2 text-base font-semibold leading-5 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
                      >
                        Submit <SendHorizonalIcon className="h-5 w-5 ml-2" />
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
              {/* END Modal Dialog */}
            </Dialog>
          </Transition>
          {/* END Modal Container */}
        </div>
        {/* END Modals: With Form */}
      </>
    )
  );
}
