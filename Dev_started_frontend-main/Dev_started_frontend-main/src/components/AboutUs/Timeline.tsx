export default function TimelineWithExtraInfo() {
  return (
    <>
      {/* Timeline: With Extra Info */}
      <div className="relative py-5 dark:text-gray-100">
        {/* Vertical Guide */}
        <div
          className="absolute bottom-0 left-0 top-0 flex w-10 flex-col justify-center md:w-12 lg:ml-40"
          aria-hidden="true"
        >
          <div className="mx-auto h-2.5 w-1 grow-0 rounded-t bg-gradient-to-b from-transparent to-pink-100 dark:to-pink-900" />
          <div className="mx-auto w-1 grow bg-pink-100 dark:bg-pink-900" />
          <div className="mx-auto h-2.5 w-1 grow-0 rounded-b bg-gradient-to-t from-transparent to-pink-100 dark:to-pink-900" />
        </div>
        {/* END Vertical Guide */}

        {/* Timeline */}
        <ul className="relative space-y-4 pl-10 md:pl-12 lg:ml-40">
          {/* Event */}
          <li className="relative">
            <div className="absolute bottom-0 left-0 top-0 mt-5 flex w-10 -translate-x-full justify-center md:w-12">
              <div className="size-3 rounded-full bg-pink-500 ring ring-pink-100 ring-opacity-100 ring-offset-2 dark:bg-pink-300 dark:ring-pink-900 dark:ring-offset-gray-900" />
            </div>
            <div className="rounded-xl bg-gray-100 p-4 hover:ring hover:ring-gray-100 hover:ring-offset-2 dark:bg-gray-800 dark:ring-offset-gray-900 dark:hover:ring-gray-700">
              <h4 className="mb-2 font-semibold">3.0 update is now live!</h4>
              <p className="text-sm leading-relaxed">
                It&apos;s finally here are comes packed with many awesome
                features. Be sure to
                <a
                  href="#"
                  className="font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
                >
                  download it
                </a>
                and let us know
                <a
                  href="#"
                  className="font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
                >
                  what you think
                </a>
                !
              </p>
            </div>
            <div className="px-4 py-2 lg:absolute lg:bottom-0 lg:left-0 lg:top-0 lg:-ml-12 lg:mt-4 lg:flex lg:w-40 lg:-translate-x-full lg:flex-col lg:p-0 lg:text-right">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                February 01, 2023
              </p>
            </div>
          </li>
          {/* END Event */}

          {/* Event */}
          <li className="relative">
            <div className="absolute bottom-0 left-0 top-0 mt-5 flex w-10 -translate-x-full justify-center md:w-12">
              <div className="size-3 rounded-full bg-pink-500 ring ring-pink-100 ring-opacity-100 ring-offset-2 dark:bg-pink-300 dark:ring-pink-900 dark:ring-offset-gray-900" />
            </div>
            <div className="rounded-xl bg-gray-100 p-4 hover:ring hover:ring-gray-100 hover:ring-offset-2 dark:bg-gray-800 dark:ring-offset-gray-900 dark:hover:ring-gray-700">
              <h4 className="mb-2 font-semibold">Maintenance notice</h4>
              <p className="text-sm leading-relaxed">
                We are going to apply some security fixes next week. Please
                check out the
                <a
                  href="#"
                  className="font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
                >
                  schedule
                </a>
                for more information about any downtime.
              </p>
            </div>
            <div className="px-4 py-2 lg:absolute lg:bottom-0 lg:left-0 lg:top-0 lg:-ml-12 lg:mt-4 lg:flex lg:w-40 lg:-translate-x-full lg:flex-col lg:p-0 lg:text-right">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                January 22, 2023
              </p>
            </div>
          </li>
          {/* END Event */}

          {/* Event */}
          <li className="relative">
            <div className="absolute bottom-0 left-0 top-0 mt-5 flex w-10 -translate-x-full justify-center md:w-12">
              <div className="size-3 rounded-full bg-pink-500 ring ring-pink-100 ring-opacity-100 ring-offset-2 dark:bg-pink-300 dark:ring-pink-900 dark:ring-offset-gray-900" />
            </div>
            <div className="rounded-xl bg-gray-100 p-4 hover:ring hover:ring-gray-100 hover:ring-offset-2 dark:bg-gray-800 dark:ring-offset-gray-900 dark:hover:ring-gray-700">
              <h4 className="mb-2 font-semibold">
                We reached 3,500 paying users
              </h4>
              <p className="text-sm leading-relaxed">
                Thank you all so much for your support!
              </p>
            </div>
            <div className="px-4 py-2 lg:absolute lg:bottom-0 lg:left-0 lg:top-0 lg:-ml-12 lg:mt-4 lg:flex lg:w-40 lg:-translate-x-full lg:flex-col lg:p-0 lg:text-right">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                January 02, 2023
              </p>
            </div>
          </li>
          {/* END Event */}

          {/* Event */}
          <li className="relative">
            <div className="absolute bottom-0 left-0 top-0 mt-5 flex w-10 -translate-x-full justify-center md:w-12">
              <div className="size-3 rounded-full bg-pink-500 ring ring-pink-100 ring-opacity-100 ring-offset-2 dark:bg-pink-300 dark:ring-pink-900 dark:ring-offset-gray-900" />
            </div>
            <div className="rounded-xl bg-gray-100 p-4 hover:ring hover:ring-gray-100 hover:ring-offset-2 dark:bg-gray-800 dark:ring-offset-gray-900 dark:hover:ring-gray-700">
              <h4 className="mb-2 font-semibold">
                Beta registrations are now open
              </h4>
              <p className="text-sm leading-relaxed">
                We are going to be beta testing our 3.0 release. Be sure to
                <a
                  href="#"
                  className="font-medium text-pink-600 hover:text-pink-400 dark:text-pink-400 dark:hover:text-pink-300"
                >
                  register
                </a>
                for a chance to participate and check out all the new features
                before everyone else.
              </p>
            </div>
            <div className="px-4 py-2 lg:absolute lg:bottom-0 lg:left-0 lg:top-0 lg:-ml-12 lg:mt-4 lg:flex lg:w-40 lg:-translate-x-full lg:flex-col lg:p-0 lg:text-right">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                December 20, 2022
              </p>
            </div>
          </li>
          {/* END Event */}
        </ul>
        {/* END Timeline */}
      </div>
      {/* END Timeline: With Extra Info */}
    </>
  );
}
