import React from 'react';
import { User } from '../types/user';
import { 
  User as UserIcon, Mail, Phone, Building2, Calendar, Clock, Shield, 
  Bell, CreditCard, Globe, Languages, Lock, Activity
} from 'lucide-react';

interface UserProfileProps {
  user: User;
  onAccountClick: () => void;
}

export function UserProfile({ user, onAccountClick }: UserProfileProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="h-24 w-24 rounded-full" />
              ) : (
                <UserIcon className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
              <p className="text-sm text-gray-500">{user.jobTitle} at <button onClick={onAccountClick} className="text-blue-600 hover:text-blue-800 font-medium">{user.accountName}</button></p>
              <div className="mt-2 flex items-center space-x-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${user.status === 'active' ? 'bg-green-100 text-green-800' : 
                    user.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {user.status}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                  ${user.subscriptionTier === 'enterprise' ? 'bg-purple-100 text-purple-800' :
                    user.subscriptionTier === 'pro' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'}`}>
                  {user.subscriptionTier}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900">{user.email}</span>
            </div>
            {user.phoneNumber && (
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{user.phoneNumber}</span>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-gray-900">{user.department || 'Not specified'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900">{user.timezone || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Building2 className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Account</p>
                <button onClick={onAccountClick} className="text-blue-600 hover:text-blue-800 font-medium">
                  {user.accountName}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Member Since</p>
                <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Last Login</p>
                <p className="text-gray-900">
                  {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <p className="text-gray-900">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Languages className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Language</p>
                <p className="text-gray-900">{user.language || 'English'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Preferences */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Security & Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Two-Factor Authentication</p>
                <p className="text-gray-900">{user.twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Notifications</p>
                <p className="text-gray-900">
                  {user.preferences.emailNotifications ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Billing Information */}
        {user.billing && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Plan</p>
                  <p className="text-gray-900">{user.billing.plan} ({user.billing.interval})</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-gray-900">{user.billing.status}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}