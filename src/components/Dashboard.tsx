import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { UserTable } from './UserTable';
import { AccountProfile } from './AccountProfile';
import { sampleUsers } from '../data/sampleUsers';
import { sampleAccounts } from '../data/sampleAccounts';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Admin Dashboard</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-4">{user?.email}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <UserTable 
          users={sampleUsers}
          accounts={sampleAccounts}
        />
      </main>
    </div>
  );
}