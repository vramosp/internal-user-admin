import React from 'react';
import { Account } from '../types/account';
import { User } from '../types/user';
import { 
  Building2, Users, Calendar, CreditCard, Shield, 
  Globe, Gauge, HardDrive, Activity, Zap, Settings
} from 'lucide-react';

interface AccountProfileProps {
  account: Account;
  users: User[];
  onViewUsers: () => void;
}

export function AccountProfile({ account, users, onViewUsers }: AccountProfileProps) {
  const formatBytes = (bytes: number) => {
    const gb = bytes;
    return `${gb.toLocaleString()} GB`;
  };

  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building2 className="h-12 w-12 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{account.name}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${account.status === 'active' ? 'bg-green-100 text-green-800' :
                      account.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {account.status}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${account.planTier === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                      account.planTier === 'pro' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {account.planTier}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onViewUsers}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Users className="h-5 w-5 mr-2" />
              View {users.length} Users
            </button>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Created</p>
                <p className="text-gray-900">{new Date(account.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Industry</p>
                <p className="text-gray-900">{account.industry}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Company Size</p>
                <p className="text-gray-900">{account.size}</p>
              </div>
            </div>
            {account.customDomain && (
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Custom Domain</p>
                  <p className="text-gray-900">{account.customDomain}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Usage & Limits */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Usage & Limits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Users</p>
                <p className="text-gray-900">{users.length} / {account.limits.users}</p>
                <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${(users.length / account.limits.users) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <HardDrive className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Storage</p>
                <p className="text-gray-900">
                  {formatBytes(account.usage.storage)} / {formatBytes(account.limits.storage)}
                </p>
                <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${(account.usage.storage / account.limits.storage) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">API Calls</p>
                <p className="text-gray-900">
                  {formatNumber(account.usage.apiCalls)} / {formatNumber(account.limits.apiCallsPerMonth)}
                </p>
                <div className="w-32 h-2 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${(account.usage.apiCalls / account.limits.apiCallsPerMonth) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Security & Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">MFA Required</p>
                <p className="text-gray-900">{account.settings.mfa_required ? 'Yes' : 'No'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">SSO</p>
                <p className="text-gray-900">{account.settings.sso_enabled ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Gauge className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">API Access</p>
                <p className="text-gray-900">{account.settings.api_access ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Payment Method</p>
                <p className="text-gray-900">
                  {account.billing.paymentMethod.type === 'card' ? 'Card' : 'Bank Transfer'} 
                  (**** {account.billing.paymentMethod.last4})
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Next Billing Date</p>
                <p className="text-gray-900">
                  {new Date(account.billing.nextBillingDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Activity className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Billing Status</p>
                <p className="text-gray-900">{account.billing.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}