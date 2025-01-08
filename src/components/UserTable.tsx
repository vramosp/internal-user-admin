import React, { useState } from 'react';
import { User } from '../types/user';
import { Account } from '../types/account';
import { Search, MoreVertical, UserCheck, UserX, Clock, Building2, AlertCircle, Users, PlusCircle, Trash2 } from 'lucide-react';
import { NewAccountModal } from './NewAccountModal';

interface UserTableProps {
  users: User[];
  accounts: Account[];
  onUserSelect: (user: User) => void;
  onAccountSelect: (accountId: string) => void;
  onDeleteUser: (userId: string) => void;
  onDeleteAccount: (accountId: string) => void;
  onCreateAccount: (accountData: Partial<Account>, adminUser: Partial<User>) => void;
}

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
};

const accountStatusColors = {
  active: 'bg-green-100 text-green-800',
  suspended: 'bg-red-100 text-red-800',
  trial: 'bg-yellow-100 text-yellow-800',
};

const subscriptionColors = {
  free: 'bg-gray-100 text-gray-800',
  pro: 'bg-blue-100 text-blue-800',
  enterprise: 'bg-purple-100 text-purple-800',
};

export function UserTable({ 
  users, 
  accounts,
  onUserSelect, 
  onAccountSelect,
  onDeleteUser,
  onDeleteAccount,
  onCreateAccount
}: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'user' | 'account'>('user');
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return user.email.toLowerCase().includes(searchLower) ||
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.accountName.toLowerCase().includes(searchLower);
  });

  const groupedByAccount = filteredUsers.reduce((acc, user) => {
    if (!acc[user.accountId]) {
      acc[user.accountId] = {
        name: user.accountName,
        status: user.accountStatus,
        users: []
      };
    }
    acc[user.accountId].users.push(user);
    return acc;
  }, {} as Record<string, { name: string; status: User['accountStatus']; users: User[] }>);

  const getStatusIcon = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <UserCheck className="w-4 h-4 text-green-600" />;
      case 'inactive':
        return <UserX className="w-4 h-4 text-red-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const handleDeleteClick = (id: string, type: 'user' | 'account') => {
    setShowDeleteConfirm(type === 'user' ? `user_${id}` : `account_${id}`);
    setShowOptions(null);
  };

  const handleConfirmDelete = (id: string, type: 'user' | 'account') => {
    if (type === 'user') {
      onDeleteUser(id);
    } else {
      onDeleteAccount(id);
    }
    setShowDeleteConfirm(null);
  };

  const renderUserRow = (user: User) => (
    <tr key={user.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => onUserSelect(user)}>
        <div className="flex items-center">
          <div>
            <div className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-sm text-gray-500">{user.email}</div>
            {viewMode === 'user' && (
              <div className="text-xs text-gray-400">
                {user.accountName}
                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${accountStatusColors[user.accountStatus]}`}>
                  {user.accountStatus}
                </span>
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {getStatusIcon(user.status)}
          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[user.status]}`}>
            {user.status}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${subscriptionColors[user.subscriptionTier]}`}>
          {user.subscriptionTier}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative">
          <button
            onClick={() => setShowOptions(`user_${user.id}`)}
            className="text-gray-400 hover:text-gray-500"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          {showOptions === `user_${user.id}` && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  onClick={() => handleDeleteClick(user.id, 'user')}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Delete User
                </button>
              </div>
            </div>
          )}
          {showDeleteConfirm === `user_${user.id}` && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <p className="px-4 py-2 text-sm text-gray-700">Delete this user?</p>
                <div className="flex justify-end px-4 py-2 space-x-2">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirmDelete(user.id, 'user')}
                    className="text-sm text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('user')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                viewMode === 'user' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              User View
            </button>
            <button
              onClick={() => setViewMode('account')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                viewMode === 'account' 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Account View
            </button>
          </div>
          {viewMode === 'account' && (
            <button
              onClick={() => setIsNewAccountModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add Account
            </button>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users or accounts..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {viewMode === 'user' ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(renderUserRow)}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(groupedByAccount).map(([accountId, account]) => (
                <tr key={accountId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap cursor-pointer" onClick={() => onAccountSelect(accountId)}>
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">{account.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${accountStatusColors[account.status]}`}>
                        {account.status}
                      </span>
                      {account.status === 'trial' && (
                        <div className="flex items-center text-yellow-600 ml-2">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm">Trial</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAccountSelect(accountId);
                      }}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      {account.users.length} Users
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() => setShowOptions(`account_${accountId}`)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      {showOptions === `account_${accountId}` && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleDeleteClick(accountId, 'account')}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                            >
                              Delete Account
                            </button>
                          </div>
                        </div>
                      )}
                      {showDeleteConfirm === `account_${accountId}` && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1">
                            <p className="px-4 py-2 text-sm text-gray-700">Delete this account?</p>
                            <div className="flex justify-end px-4 py-2 space-x-2">
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="text-sm text-gray-500 hover:text-gray-700"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleConfirmDelete(accountId, 'account')}
                                className="text-sm text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <NewAccountModal
        isOpen={isNewAccountModalOpen}
        onClose={() => setIsNewAccountModalOpen(false)}
        onSubmit={onCreateAccount}
      />
    </div>
  );
}