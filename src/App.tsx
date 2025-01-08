import React, { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { UserProfile } from './components/UserProfile';
import { UserTable } from './components/UserTable';
import { AccountProfile } from './components/AccountProfile';
import { sampleUsers } from './data/sampleUsers';
import { sampleAccounts } from './data/sampleAccounts';
import { User } from './types/user';
import { Account } from './types/account';

function App() {
  const [users, setUsers] = useState(sampleUsers);
  const [accounts, setAccounts] = useState(sampleAccounts);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const selectedAccount = selectedAccountId 
    ? accounts.find(acc => acc.id === selectedAccountId)
    : null;

  const accountUsers = selectedAccountId
    ? users.filter(user => user.accountId === selectedAccountId)
    : users;

  const handleHeaderClick = () => {
    setSelectedUser(null);
    setSelectedAccountId(null);
  };

  const handleAccountClick = (accountId: string) => {
    setSelectedUser(null);
    setSelectedAccountId(accountId);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }
  };

  const handleDeleteAccount = (accountId: string) => {
    setAccounts(accounts.filter(acc => acc.id !== accountId));
    setUsers(users.filter(user => user.accountId !== accountId));
    if (selectedAccountId === accountId) {
      setSelectedAccountId(null);
    }
  };

  const handleCreateAccount = (accountData: Partial<Account>, adminUser: Partial<User>) => {
    const newAccountId = `acc_${accounts.length + 1}`;
    const newAccount: Account = {
      id: newAccountId,
      name: accountData.name!,
      status: accountData.status || 'active',
      createdAt: accountData.createdAt || new Date().toISOString(),
      industry: accountData.industry!,
      size: accountData.size || 'small',
      planTier: accountData.planTier || 'pro',
      billingCycle: accountData.billingCycle || 'monthly',
      settings: accountData.settings || {
        mfa_required: false,
        sso_enabled: false,
        api_access: true,
      },
      billing: {
        status: 'active',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod: {
          type: 'card',
          last4: '0000',
        },
      },
      usage: accountData.usage || {
        storage: 0,
        bandwidth: 0,
        apiCalls: 0,
      },
      limits: accountData.limits || {
        users: 10,
        storage: 100,
        apiCallsPerMonth: 100000,
      },
    };

    const newUser: User = {
      id: `user_${users.length + 1}`,
      email: adminUser.email!,
      firstName: adminUser.firstName!,
      lastName: adminUser.lastName!,
      role: 'admin',
      status: 'active',
      lastLoginAt: null,
      createdAt: new Date().toISOString(),
      company: accountData.name!,
      subscriptionTier: accountData.planTier || 'pro',
      accountId: newAccountId,
      accountName: accountData.name!,
      accountStatus: 'active',
      twoFactorEnabled: false,
      loginCount: 0,
      preferences: {
        emailNotifications: true,
        marketingEmails: false,
        theme: 'system',
      },
    };

    setAccounts([...accounts, newAccount]);
    setUsers([...users, newUser]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <button 
              onClick={handleHeaderClick}
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Admin Dashboard</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {selectedUser ? (
          <UserProfile 
            user={selectedUser} 
            onAccountClick={() => handleAccountClick(selectedUser.accountId)} 
          />
        ) : selectedAccount ? (
          <AccountProfile 
            account={selectedAccount}
            users={accountUsers}
            onViewUsers={() => setSelectedAccountId(null)}
          />
        ) : (
          <UserTable 
            users={users}
            accounts={accounts}
            onUserSelect={setSelectedUser}
            onAccountSelect={setSelectedAccountId}
            onDeleteUser={handleDeleteUser}
            onDeleteAccount={handleDeleteAccount}
            onCreateAccount={handleCreateAccount}
          />
        )}
      </main>
    </div>
  );
}

export default App;