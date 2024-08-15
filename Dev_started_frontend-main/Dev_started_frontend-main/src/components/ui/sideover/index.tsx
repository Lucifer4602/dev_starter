import { Fragment } from "react";

// Headless UI, for more info and examples you can check out https://github.com/tailwindlabs/headlessui
import { Dialog, Transition } from "@headlessui/react";
import { X } from "lucide-react";

interface OpenSideOver {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
  title: string;
}
export default function SideOver(props: OpenSideOver) {
  const { isOpen, setIsOpen, children, title } = props;

  function closeOffcanvas() {
    setIsOpen(false);
  }

  return (
    <>
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40" onClose={closeOffcanvas}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-300/75 backdrop-blur-sm dark:bg-gray-800/75" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="absolute z-50 right-0 top-0   h-[100vh] flex  w-72 flex-col bg-white shadow-lg dark:bg-gray-900 dark:text-gray-100 dark:shadow-gray-950 sm:w-full sm:max-w-md">
                  <div className="flex min-h-16 flex-none  items-center justify-between border-b border-gray-100 px-5 dark:border-gray-800 md:px-7">
                    <Dialog.Title as="h3" className="py-5 font-medium">
                      {title}
                    </Dialog.Title>

                    <button
                      onClick={closeOffcanvas}
                      type="button"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-transparent dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div>{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
