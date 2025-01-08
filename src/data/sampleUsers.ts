import { User } from '../types/user';

export const sampleUsers: User[] = [
  // ... (keep existing users 1-6)

  {
    id: '7',
    email: 'lisa.wong@healthtech.med',
    firstName: 'Lisa',
    lastName: 'Wong',
    role: 'admin',
    status: 'active',
    lastLoginAt: '2024-03-11T10:15:00Z',
    createdAt: '2023-09-10T09:00:00Z',
    company: 'HealthTech Solutions',
    subscriptionTier: 'pro',
    accountId: 'acc_4',
    accountName: 'HealthTech Solutions',
    accountStatus: 'active',
    jobTitle: 'Operations Director',
    department: 'Operations',
    timezone: 'America/Chicago',
    language: 'English',
    phoneNumber: '+1 (312) 555-0123',
    twoFactorEnabled: true,
    loginCount: 320,
    preferences: {
      emailNotifications: true,
      marketingEmails: false,
      theme: 'light'
    }
  },
  {
    id: '8',
    email: 'michael.patel@healthtech.med',
    firstName: 'Michael',
    lastName: 'Patel',
    role: 'user',
    status: 'active',
    lastLoginAt: '2024-03-11T15:45:00Z',
    createdAt: '2023-10-01T14:30:00Z',
    company: 'HealthTech Solutions',
    subscriptionTier: 'pro',
    accountId: 'acc_4',
    accountName: 'HealthTech Solutions',
    accountStatus: 'active',
    jobTitle: 'Medical Data Specialist',
    department: 'Data Science',
    timezone: 'America/Chicago',
    language: 'English',
    twoFactorEnabled: true,
    loginCount: 180,
    preferences: {
      emailNotifications: true,
      marketingEmails: true,
      theme: 'system'
    }
  },
  {
    id: '9',
    email: 'rachel.green@edulearn.com',
    firstName: 'Rachel',
    lastName: 'Green',
    role: 'owner',
    status: 'active',
    lastLoginAt: '2024-03-11T16:20:00Z',
    createdAt: '2024-03-01T12:00:00Z',
    company: 'EduLearn Academy',
    subscriptionTier: 'pro',
    accountId: 'acc_5',
    accountName: 'EduLearn Academy',
    accountStatus: 'trial',
    jobTitle: 'Founder',
    department: 'Management',
    timezone: 'America/New_York',
    language: 'English',
    phoneNumber: '+1 (212) 555-9876',
    twoFactorEnabled: false,
    loginCount: 25,
    preferences: {
      emailNotifications: true,
      marketingEmails: true,
      theme: 'light'
    }
  },
  {
    id: '10',
    email: 'james.wilson@edulearn.com',
    firstName: 'James',
    lastName: 'Wilson',
    role: 'user',
    status: 'pending',
    lastLoginAt: null,
    createdAt: '2024-03-05T09:15:00Z',
    company: 'EduLearn Academy',
    subscriptionTier: 'pro',
    accountId: 'acc_5',
    accountName: 'EduLearn Academy',
    accountStatus: 'trial',
    jobTitle: 'Course Director',
    department: 'Education',
    timezone: 'America/New_York',
    twoFactorEnabled: false,
    loginCount: 0,
    preferences: {
      emailNotifications: true,
      marketingEmails: false,
      theme: 'system'
    }
  }
];