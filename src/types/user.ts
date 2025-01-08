export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'owner';
  status: 'active' | 'inactive' | 'pending';
  lastLoginAt: string | null;
  createdAt: string;
  company: string;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  accountId: string;
  accountName: string;
  accountStatus: 'active' | 'suspended' | 'trial';
  avatar?: string;
  phoneNumber?: string;
  jobTitle?: string;
  department?: string;
  timezone?: string;
  language?: string;
  twoFactorEnabled: boolean;
  lastPasswordChange?: string;
  loginCount: number;
  preferences: {
    emailNotifications: boolean;
    marketingEmails: boolean;
    theme: 'light' | 'dark' | 'system';
  };
  billing?: {
    plan: string;
    interval: 'monthly' | 'yearly';
    status: 'active' | 'past_due' | 'canceled';
    nextBillingDate: string;
  };
}