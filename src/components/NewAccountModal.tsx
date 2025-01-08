import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Account } from '../types/account';
import { User } from '../types/user';

interface NewAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (accountData: Partial<Account>, adminUser: Partial<User>) => void;
}

export function NewAccountModal({ isOpen, onClose, onSubmit }: NewAccountModalProps) {
  const [accountData, setAccountData] = useState({
    name: '',
    industry: '',
    planTier: 'pro' as const,
    size: 'small' as const,
  });

  const [adminUser, setAdminUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      {
        ...accountData,
        status: 'active',
        createdAt: new Date().toISOString(),
        billingCycle: 'monthly',
        settings: {
          mfa_required: false,
          sso_enabled: false,
          api_access: true,
        },
        usage: {
          storage: 0,
          bandwidth: 0,
          apiCalls: 0,
        },
        limits: {
          users: accountData.planTier === 'enterprise' ? 100 : 10,
          storage: accountData.planTier === 'enterprise' ? 5000 : 100,
          apiCallsPerMonth: accountData.planTier === 'enterprise' ? 5000000 : 100000,
        },
      },
      {
        ...adminUser,
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString(),
        subscriptionTier: accountData.planTier,
        twoFactorEnabled: false,
        loginCount: 0,
        preferences: {
          emailNotifications: true,
          marketingEmails: false,
          theme: 'system',
        },
      }
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Create New Account</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="max-h-[calc(100vh-16rem)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6 space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-200">
                  Account Details
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Account Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={accountData.name}
                      onChange={(e) => setAccountData({ ...accountData, name: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      placeholder="Enter account name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry *
                    </label>
                    <input
                      type="text"
                      required
                      value={accountData.industry}
                      onChange={(e) => setAccountData({ ...accountData, industry: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      placeholder="Enter industry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Plan Tier *
                    </label>
                    <select
                      value={accountData.planTier}
                      onChange={(e) => setAccountData({ ...accountData, planTier: e.target.value as 'free' | 'pro' | 'enterprise' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    >
                      <option value="free">Free</option>
                      <option value="pro">Pro</option>
                      <option value="enterprise">Enterprise</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Size *
                    </label>
                    <select
                      value={accountData.size}
                      onChange={(e) => setAccountData({ ...accountData, size: e.target.value as 'small' | 'medium' | 'enterprise' })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                    >
                      <option value="small">Small (1-50)</option>
                      <option value="medium">Medium (51-200)</option>
                      <option value="enterprise">Enterprise (201+)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900 pb-2 border-b border-gray-200">
                  Admin User
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={adminUser.firstName}
                      onChange={(e) => setAdminUser({ ...adminUser, firstName: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={adminUser.lastName}
                      onChange={(e) => setAdminUser({ ...adminUser, lastName: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={adminUser.email}
                      onChange={(e) => setAdminUser({ ...adminUser, email: e.target.value })}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}