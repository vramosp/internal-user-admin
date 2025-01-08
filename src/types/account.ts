export interface Account {
  id: string;
  name: string;
  status: 'active' | 'suspended' | 'trial';
  createdAt: string;
  industry: string;
  size: 'small' | 'medium' | 'enterprise';
  planTier: 'free' | 'pro' | 'enterprise';
  billingCycle: 'monthly' | 'yearly';
  customDomain?: string;
  settings: {
    mfa_required: boolean;
    sso_enabled: boolean;
    api_access: boolean;
  };
  billing: {
    status: 'active' | 'past_due' | 'canceled';
    nextBillingDate: string;
    paymentMethod: {
      type: 'card' | 'bank_transfer';
      last4: string;
    };
  };
  usage: {
    storage: number;
    bandwidth: number;
    apiCalls: number;
  };
  limits: {
    users: number;
    storage: number;
    apiCallsPerMonth: number;
  };
}