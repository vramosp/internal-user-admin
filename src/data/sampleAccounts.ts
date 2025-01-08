import { Account } from '../types/account';

export const sampleAccounts: Account[] = [
  {
    id: 'acc_1',
    name: 'TechCorp Inc.',
    status: 'active',
    createdAt: '2023-12-01T10:00:00Z',
    industry: 'Technology',
    size: 'enterprise',
    planTier: 'enterprise',
    billingCycle: 'yearly',
    customDomain: 'app.techcorp.com',
    settings: {
      mfa_required: true,
      sso_enabled: true,
      api_access: true
    },
    billing: {
      status: 'active',
      nextBillingDate: '2024-12-01T00:00:00Z',
      paymentMethod: {
        type: 'card',
        last4: '4242'
      }
    },
    usage: {
      storage: 1024,
      bandwidth: 5000,
      apiCalls: 1000000
    },
    limits: {
      users: 100,
      storage: 5000,
      apiCallsPerMonth: 5000000
    }
  },
  {
    id: 'acc_2',
    name: 'StartupHub',
    status: 'trial',
    createdAt: '2024-02-15T08:30:00Z',
    industry: 'Software',
    size: 'small',
    planTier: 'pro',
    billingCycle: 'monthly',
    settings: {
      mfa_required: false,
      sso_enabled: false,
      api_access: true
    },
    billing: {
      status: 'active',
      nextBillingDate: '2024-04-15T00:00:00Z',
      paymentMethod: {
        type: 'card',
        last4: '8888'
      }
    },
    usage: {
      storage: 50,
      bandwidth: 200,
      apiCalls: 50000
    },
    limits: {
      users: 10,
      storage: 100,
      apiCallsPerMonth: 100000
    }
  },
  {
    id: 'acc_3',
    name: 'Global Retail Co',
    status: 'active',
    createdAt: '2023-06-20T14:15:00Z',
    industry: 'Retail',
    size: 'enterprise',
    planTier: 'enterprise',
    billingCycle: 'yearly',
    customDomain: 'dashboard.globalretail.com',
    settings: {
      mfa_required: true,
      sso_enabled: true,
      api_access: true
    },
    billing: {
      status: 'active',
      nextBillingDate: '2024-06-20T00:00:00Z',
      paymentMethod: {
        type: 'bank_transfer',
        last4: '9999'
      }
    },
    usage: {
      storage: 2048,
      bandwidth: 8000,
      apiCalls: 2000000
    },
    limits: {
      users: 250,
      storage: 10000,
      apiCallsPerMonth: 10000000
    }
  },
  {
    id: 'acc_4',
    name: 'HealthTech Solutions',
    status: 'active',
    createdAt: '2023-09-10T09:00:00Z',
    industry: 'Healthcare',
    size: 'medium',
    planTier: 'pro',
    billingCycle: 'yearly',
    customDomain: 'portal.healthtech.med',
    settings: {
      mfa_required: true,
      sso_enabled: false,
      api_access: true
    },
    billing: {
      status: 'active',
      nextBillingDate: '2024-09-10T00:00:00Z',
      paymentMethod: {
        type: 'card',
        last4: '3333'
      }
    },
    usage: {
      storage: 750,
      bandwidth: 3000,
      apiCalls: 800000
    },
    limits: {
      users: 50,
      storage: 1000,
      apiCallsPerMonth: 1000000
    }
  },
  {
    id: 'acc_5',
    name: 'EduLearn Academy',
    status: 'trial',
    createdAt: '2024-03-01T12:00:00Z',
    industry: 'Education',
    size: 'small',
    planTier: 'pro',
    billingCycle: 'monthly',
    settings: {
      mfa_required: false,
      sso_enabled: false,
      api_access: true
    },
    billing: {
      status: 'active',
      nextBillingDate: '2024-04-01T00:00:00Z',
      paymentMethod: {
        type: 'card',
        last4: '7777'
      }
    },
    usage: {
      storage: 25,
      bandwidth: 100,
      apiCalls: 20000
    },
    limits: {
      users: 10,
      storage: 100,
      apiCallsPerMonth: 100000
    }
  }
];