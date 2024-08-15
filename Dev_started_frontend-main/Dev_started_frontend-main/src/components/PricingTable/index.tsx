"use client";
import { useState, useCallback, Key } from "react";
import { CheckIcon } from "lucide-react";
import { useGeoIp } from "../../hooks/useGeoIp";
import { useCreateCheckoutSessionMutation } from "../../queries/payments/useCreatCheckoutSessionMutation";
import { getStripe } from "../../utils/stripe-client";
import { parseError } from "../../utils/errors";
import useGetAllActivePlans from "../../queries/payments/useGetAllActiveProducts";
import { Price } from "../../queries/payments/types";

import toast from "react-hot-toast";
import CurrentPlan from "../payments/currentPlan";
import { useUserContext } from "@/contexts/userContext";
import { NEXT_ROUTE_KEY } from "@/utils/constants";

import { classNames } from "@/utils/classNames";
import { useRouter } from "next/navigation";
import PricingHeader from "./header";

const frequencies = [
  { value: "month", label: "Monthly", priceSuffix: "/month" },
  { value: "year", label: "Annually", priceSuffix: "/year" },
];

interface IPricingTableProps {
  showCurrentPlan: boolean;
}
export function PricingTable(props: IPricingTableProps) {
  const { showCurrentPlan } = props;

  const [frequency, setFrequency] = useState(frequencies[0]);

  const router = useRouter();
  const { user, setUser, subscription: currentSubscription } = useUserContext();

  const { geoIp, error: ipError, loading: ipLoading } = useGeoIp();
  const {
    data: activePlans,
    isLoading: isLoadingPlans,
    error,
  } = useGetAllActivePlans();

  const filterPrice = useCallback(
    (prices: Price[]) => {
      let price = prices[0];

      let filteredPrice = prices?.find((price) => {
        if (geoIp?.currency === "INR") {
          return (
            price.currency === "inr" &&
            price.frequency === (frequency.value ? "year" : "month")
          );
        } else {
          return (
            price.currency === "usd" &&
            price.frequency === (frequency.value ? "year" : "month")
          );
        }
      });

      return filteredPrice ? filteredPrice : price;
    },
    [geoIp, frequency],
  );

  const {
    mutate: createCheckoutSession,
    isLoading: isLoadingCheckoutSession,
    error: checkoutError,
  } = useCreateCheckoutSessionMutation({
    onSuccess: async (sessionId, invoiceUrl, message) => {
      try {
        if (sessionId) {
          const stripe = await getStripe();

          await stripe?.redirectToCheckout({ sessionId: sessionId });
        } else if (invoiceUrl) {
          router.push(invoiceUrl);
        } else if (message) {
          toast.success(message);
        }
      } catch (err) {
        toast.error(parseError(err));
      }
    },
    onError: (error) => {
      toast.error(parseError(error));
    },
  });

  const handleSubmit = (priceId: string) => {
    if (!user) {
      router.push(`/login?${NEXT_ROUTE_KEY}=/pricing`);
      return;
    }

    createCheckoutSession(priceId);
  };

  return (
    <div className="py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <PricingHeader />

        {showCurrentPlan && <CurrentPlan />}

        <div className="mt-16 flex justify-center">
          {/* <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">
              Payment frequency
            </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? "bg-pink-600 text-white" : "text-gray-500",
                    "cursor-pointer rounded-full px-2.5 py-1",
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup> */}
        </div>
        <div className="isolate mx-auto mt-10   gap-8  flex justify-center">
          {activePlans?.map(
            (product: {
              prices: Price[];
              id: Key | null | undefined;
              title: string;
              description: string;
              metadata: { [x: string]: string };
              features: any[];
            }) => {
              let price = filterPrice(product.prices);
              return (
                <div
                  key={product.id}
                  className={classNames(
                    product.metadata?.["isFeatured"] === "true"
                      ? "ring-2 ring-pink-600"
                      : "ring-1 ring-gray-200",
                    "rounded-3xl p-8 xl:p-10 max-w-md",
                  )}
                >
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      id={product.id as string}
                      className={classNames(
                        product.metadata?.["isFeatured"] === "true"
                          ? "text-pink-600"
                          : "text-gray-900 dark:text-white",
                        "text-lg font-semibold leading-8",
                      )}
                    >
                      {product.title}
                    </h3>
                    {product.metadata?.["isFeatured"] === "true" ? (
                      <p className="rounded-full bg-pink-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-pink-600">
                        Most popular
                      </p>
                    ) : null}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {product.description}
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {" "}
                      {`${price.currency.toUpperCase()} ${price.amount / 100} `}
                    </span>
                    {/* <span className="text-sm font-semibold leading-6 text-gray-600">
                      {frequency.priceSuffix}
                    </span> */}
                  </p>
                  <button
                    className={classNames(
                      product.metadata?.["isFeatured"] === "true"
                        ? "bg-pink-600 text-white shadow-sm hover:bg-pink-500"
                        : "text-pink-600 ring-1 ring-inset ring-pink-200 hover:ring-pink-300",
                      "mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 w-full cursor-pointer",
                    )}
                    onClick={async () => {
                      await handleSubmit(price.id);
                    }}
                  >
                    {currentSubscription?.price.id == price.id
                      ? "Current Plan"
                      : "Start Now"}
                  </button>
                  <ul
                    role="list"
                    className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400 xl:mt-10"
                  >
                    {product?.features?.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckIcon
                          className="h-6 w-5 flex-none text-pink-600"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
