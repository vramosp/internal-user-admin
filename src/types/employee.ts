export interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'support';
  createdAt: string;
  lastLoginAt: string | null;
  status: 'active' | 'inactive';
}