import { User } from "../auth/login/types";

export type PlanFrequency = "day" | "week" | "month" | "year";

export interface Price {
  id: string;
  stripe_price_id: string;
  benefits: Object;
  amount: number;
  currency: string;
  frequency: PlanFrequency;
  is_active: boolean;
  is_default: boolean;
  trial_days: number;
  is_recurring: boolean;
  created_at: string;
  updated_at: string;
  plan: Plan;
}

export interface Plan {
  id: string;
  title: string;
  description: string;
  features: Array<string>;
  metadata: Object;
  stripe_plan_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  prices: Array<Price>;
}

export type SubscriptionStatus =
  | "incomplete"
  | "incomplete_expired"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid";

export interface Subscription {
  id: string;
  price: Price;
  user: User;
  status: SubscriptionStatus;
  stripe_subscription_id: string;
}
