const toDoData = [
  {
    id: 1,
    title: "Design Roadmap Page",
    description:
      "Sketch and design the layout for the upcoming Roadmap page on TheDevStarter website.",
  },
  {
    id: 2,
    title: "Implement Roadmap UI",
    description:
      "Code the frontend of the Roadmap page, ensuring it aligns with the overall design and theme of TheDevStarter.",
  },
  {
    id: 3,
    title: "Integrate Dynamic Data",
    description:
      "Implement functionality to dynamically populate the Roadmap page with real-time data, ensuring accuracy and relevance.",
  },
  {
    id: 4,
    title: "Test Roadmap Page",
    description:
      "Conduct thorough testing of the Roadmap page to identify and fix any bugs or issues, ensuring a smooth user experience.",
  },
  {
    id: 5,
    title: "Update Documentation",
    description:
      "Update the documentation to include details about the newly added Roadmap page, providing users with comprehensive information.",
  },
  {
    id: 6,
    title: "Deploy Changes",
    description:
      "Deploy the updated version of TheDevStarter website, including the newly added Roadmap page, to make it accessible to users.",
  },
];

const inProgressData = [
  {
    id: 1,
    title: "Implement Roadmap UI",
    description:
      "Currently working on coding the frontend of the Roadmap page, ensuring it aligns with the overall design and theme of TheDevStarter.",
  },
  {
    id: 2,
    title: "Integrate Dynamic Data",
    description:
      "In the process of implementing functionality to dynamically populate the Roadmap page with real-time data, ensuring accuracy and relevance.",
  },
  {
    id: 3,
    title: "Test Roadmap Page",
    description:
      "Currently conducting thorough testing of the Roadmap page to identify and fix any bugs or issues, ensuring a smooth user experience.",
  },
  {
    id: 4,
    title: "Update Documentation",
    description:
      "Currently updating the documentation to include details about the newly added Roadmap page, providing users with comprehensive information.",
  },
];

const doneData = [
  {
    id: 1,
    title: "Design Roadmap Page",
    description:
      "Successfully designed the layout for the Roadmap page on TheDevStarter website.",
  },
  {
    id: 2,
    title: "Implement Roadmap UI",
    description:
      "Completed coding the frontend of the Roadmap page, ensuring it aligns with the overall design and theme of TheDevStarter.",
  },
  {
    id: 3,
    title: "Integrate Dynamic Data",
    description:
      "Implemented functionality to dynamically populate the Roadmap page with real-time data, ensuring accuracy and relevance.",
  },
  {
    id: 4,
    title: "Test Roadmap Page",
    description:
      "Conducted thorough testing of the Roadmap page, identifying and fixing any bugs or issues for a smooth user experience.",
  },
  {
    id: 5,
    title: "Update Documentation",
    description:
      "Successfully updated the documentation to include details about the newly added Roadmap page, providing users with comprehensive information.",
  },
];

export default function Roadmap() {
  return (
    <>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 dark:text-gray-100 max-w-7xl mx-auto py-20 px-6">
        <div className="space-y-3 rounded-lg bg-gray-200/75 p-3.5 dark:bg-gray-700/75">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">To-Do</h3>
            <button
              type="button"
              className="inline-flex items-center justify-center space-x-1 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
            ></button>
          </div>
          <div className="space-y-3">
            {toDoData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100"
              >
                <div className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
                  <h3 className="font-medium">{item.title}</h3>
                </div>
                <div className="grow p-5">
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3 rounded-lg bg-gray-200/75 p-3.5 dark:bg-gray-700/75">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">In Progress</h3>
            <button
              type="button"
              className="inline-flex items-center justify-center space-x-1 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
            ></button>
          </div>
          <div className="space-y-3">
            {inProgressData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100"
              >
                <div className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
                  <h3 className="font-medium">{item.title}</h3>
                </div>
                <div className="grow p-5">
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3 rounded-lg bg-gray-200/75 p-3.5 dark:bg-gray-700/75">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Completed</h3>
            <button
              type="button"
              className="inline-flex items-center justify-center space-x-1 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
            ></button>
          </div>
          <div className="space-y-3">
            {doneData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100"
              >
                <div className="bg-gray-50 px-5 py-4 dark:bg-gray-700/50">
                  <h3 className="font-medium">{item.title}</h3>
                </div>
                <div className="grow p-5">
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
