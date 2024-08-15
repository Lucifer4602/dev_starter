"use client";
import { Fragment, useEffect } from "react";
import Link from "next/link";
import React from "react";
import { useGeneralModalContext } from "../../contexts/ModalProvider";
// Headless UI, for more info and examples you can check out https://github.com/tailwindlabs/headlessui
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "lucide-react";

const GeneralModal: React.FC = () => {
  const { isGeneralOpen, closeGeneralModal, modalContent } =
    useGeneralModalContext();
  useEffect(() => {
    const handlePopstate = () => {
      if (isGeneralOpen) {
        closeGeneralModal();
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isGeneralOpen, closeGeneralModal]);
  return (
    isGeneralOpen && (
      <>
        {/* Modals: Notification */}
        <div onClick={closeGeneralModal}>
          <Transition appear show={isGeneralOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-90"
              onClose={closeGeneralModal}
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
                  <Dialog.Panel className="mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100 relative">
                    <XCircleIcon
                      onClick={closeGeneralModal}
                      className="h-7 w-7 hover:cursor-pointer font-normal text-base right-1 top-1 absolute text-gray-600"
                    />
                    <div className="grow p-5 text-center">
                      {modalContent?.icon && (
                        <div className=" ">{modalContent?.icon}</div>
                      )}
                      <div>
                        {modalContent?.heading && (
                          <Dialog.Title
                            as="h4"
                            className="mb-1 text-lg font-bold"
                          >
                            {modalContent?.heading}
                          </Dialog.Title>
                        )}
                        {modalContent?.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {modalContent?.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {modalContent?.buttonName && (
                      <div className="px-5 py-4">
                        <Link
                          onClick={closeGeneralModal}
                          href={` ${
                            modalContent?.buttonHref
                              ? modalContent?.buttonHref
                              : "/"
                          }`}
                          type="button"
                          className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-4 py-2 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
                        >
                          {modalContent?.buttonName}
                        </Link>
                      </div>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
              {/* END Modal Dialog */}
            </Dialog>
          </Transition>
          {/* END Modal Container */}
        </div>
        {/* END Modals: Notification */}
      </>
    )
  );
};
export default GeneralModal;
