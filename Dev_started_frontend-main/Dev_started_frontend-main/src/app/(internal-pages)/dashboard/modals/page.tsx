"use client";
import { SetStateAction, useState } from "react";
import { useFeedbackModalContext } from "../../../../contexts/ModalProvider";

export default function Dashboard() {
  const feedbackModalContext = useFeedbackModalContext();
  const { openGeneralModal } = useFeedbackModalContext();

  const openGenModal: any = () => {
    return (
      //openLoadingModal();
      // feedbackModalContext.openFeedbackModal();
      openGeneralModal({
        heading: heading,
        description: description,
        buttonName: buttonName,
        buttonHref: buttonHref,
      })
    );
  };
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [buttonHref, setButtonHref] = useState("");

  // Event handlers to update state on input change
  const handleHeadingChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setHeading(e.target.value);
  const handleDescriptionChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setDescription(e.target.value);
  const handleButtonNameChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setButtonName(e.target.value);
  const handleButtonHrefChange = (e: {
    target: { value: SetStateAction<string> };
  }) => setButtonHref(e.target.value);
  return (
    <div className="">
      <div className="container mx-auto space-y-16 px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
        {/* Heading */}
        <div>
          <h2 className="mb-4 flex items-center space-x-3 text-3xl font-extrabold md:text-4xl">
            <span className="w-1.5 self-stretch rounded-lg bg-pink-600 dark:text-pink-500" />
            <span>Explore Our Range of Modal Options</span>
          </h2>
          <h3 className="text-xl font-medium leading-relaxed text-gray-700 lg:w-2/3 dark:text-gray-300">
            Our diverse collection of modals caters to various needs, whether
            you want to showcase General features, convey important information,
            or gather user feedback.
          </h3>
        </div>

        {/* Cards: Simple */}
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100 max-w-lg">
          {/* Card Header */}
          <div className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
            <h3 className="font-medium text-lg">Feedback Modal</h3>
          </div>
          {/* END Card Header */}

          {/* Card Body */}
          <div className="grow p-5">
            <p className="text-gray-700 dark:text-gray-300">
              Use this modal to gather valuable feedback from users. Whether
              it&apos;s about your product, service, or overall experience,
              we&apos;re here to listen.
            </p>
          </div>
          {/* END Card Body */}

          {/* Card Footer */}
          <div
            onClick={feedbackModalContext.openFeedbackModal}
            className="bg-pink-500 hover:bg-pink-600 px-5 py-4 text-sm text-white cursor-pointer rounded-b-lg"
          >
            <p>Open Feedback Modal</p>
          </div>
          {/* END Card Footer */}
        </div>
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100 max-w-lg">
          {/* Card Header */}
          <div className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
            <h3 className="font-medium text-lg">General Modal</h3>
          </div>
          {/* END Card Header */}

          {/* Card Body */}

          <form className="space-y-6 dark:text-gray-100 px-5 py-4">
            {/* Text Input */}
            <div className="space-y-1">
              <label htmlFor="heading" className="font-medium">
                Heading
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                placeholder="Enter modal heading"
                value={heading}
                onChange={handleHeadingChange}
                className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
              />
            </div>
            {/* END Text Input */}

            {/* Description Input */}
            <div className="space-y-1">
              <label htmlFor="Description" className="font-medium">
                Description
              </label>
              <textarea
                rows={5}
                id="Description"
                name="Description"
                placeholder="Enter your Description"
                value={description}
                onChange={handleDescriptionChange}
                className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
              />
            </div>
            {/* END Description Input */}

            {/* Button Name Input */}
            <div className="space-y-1">
              <label htmlFor="Button Name" className="font-medium">
                Button Name
              </label>
              <input
                type="text"
                id="Button Name"
                name="Button Name"
                placeholder="Enter your Button Name"
                value={buttonName}
                onChange={handleButtonNameChange}
                className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
              />
            </div>
            {/* END Button Name Input */}

            {/* Button Href Input */}
            <div className="space-y-1">
              <label htmlFor="Button Href" className="font-medium">
                Button Href
              </label>
              <input
                type="text"
                id="Button Href"
                name="Button Href"
                placeholder="Enter Button Href"
                value={buttonHref}
                onChange={handleButtonHrefChange}
                className="block w-full rounded-lg border border-gray-200 px-3 py-2 leading-6 placeholder-gray-500 focus:border-pink-500 focus:ring focus:ring-pink-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-400 dark:focus:border-pink-500"
              />
            </div>
            {/* END Button Href Input */}
          </form>
          {/* END Form Elements: Inputs */}

          {/* END Card Body */}

          {/* Card Footer */}
          <div
            onClick={openGenModal}
            className="bg-pink-500 hover:bg-pink-600 px-5 py-4  text-sm text-white cursor-pointer rounded-b-lg"
          >
            <p>Open General Modal</p>
          </div>
          {/* END Card Footer */}
        </div>
      </div>
    </div>
  );
  {
    /* END Features Section: Subtle Link Boxes */
  }
}
