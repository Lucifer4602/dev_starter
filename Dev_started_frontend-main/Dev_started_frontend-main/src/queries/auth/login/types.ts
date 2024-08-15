export interface User {
  providers: Array<string>;
  avatar_url: string;
  stripe_customer_id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  is_active: boolean;
  github_username: string;
  is_impersonated?: boolean;
}
