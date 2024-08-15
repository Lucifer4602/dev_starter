import { CreditCard } from "lucide-react";
import Header from "./header";
import { PricingTable } from "@/components/PricingTable";

export default function Billing() {
  return (
    <div>
      <Header title={"Billing Information"}>
        <CreditCard className="text-pink-400" />
      </Header>
      <PricingTable showCurrentPlan={false} />
    </div>
  );
}
