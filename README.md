# React Admin Dashboard with Supabase

A modern, responsive admin dashboard built with React, TypeScript, and Tailwind CSS, featuring user and account management with Supabase backend integration.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/your-repo-name)

## Features

- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🔐 User authentication with Supabase
- 📊 User and account management
- 🔍 Search and filtering
- 🎯 Role-based access control
- 📈 Usage analytics
- ⚡ Real-time updates

## Quick Start

1. Clone and install dependencies:
```bash
npm install
```

2. Set up Supabase:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Click "New Project"
   - Fill in project details and create
   - Go to Project Settings > API
   - Copy Project URL and anon key

3. Create `.env` file:
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Set up the database:
   - Go to SQL Editor in Supabase Dashboard
   - Run the following migrations:

```sql
-- Create accounts table first
CREATE TABLE accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  industry text,
  size text,
  plan_tier text DEFAULT 'free',
  billing_cycle text DEFAULT 'monthly',
  custom_domain text UNIQUE,
  settings jsonb DEFAULT '{}'::jsonb,
  usage jsonb DEFAULT '{}'::jsonb,
  limits jsonb DEFAULT '{}'::jsonb
);

-- Then create users table with foreign key
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  role text NOT NULL DEFAULT 'user',
  status text NOT NULL DEFAULT 'pending',
  last_login_at timestamptz,
  created_at timestamptz DEFAULT now(),
  company text,
  subscription_tier text DEFAULT 'free',
  account_id uuid references accounts(id),
  two_factor_enabled boolean DEFAULT false,
  login_count integer DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can read own account data"
  ON accounts
  FOR SELECT
  TO authenticated
  USING (id IN (
    SELECT account_id 
    FROM users 
    WHERE auth.uid() = users.id
  ));

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());
```

5. Start the development server:
```bash
npm run dev
```

## Authentication Setup

1. Configure Supabase Auth:
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

2. Create Auth Hook:
```typescript
// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { session, user, loading };
}
```

3. Protect Routes:
```typescript
// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

4. Set up Router:
```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Environment Setup

1. Development:
```bash
npm run dev
```

2. Production Build:
```bash
npm run build
```

3. Preview Production Build:
```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/      # React components
│   │   └── ProtectedRoute.tsx  # Route protection
│   ├── hooks/          # Custom hooks
│   │   └── useAuth.ts  # Authentication hook
│   ├── lib/           # Utilities
│   │   └── supabase.ts # Supabase client
│   ├── pages/         # Page components
│   ├── types/         # TypeScript definitions
│   ├── App.tsx        # Main application
│   └── main.tsx       # Entry point
├── public/            # Static assets
└── package.json       # Dependencies
```

## License

MIT License - feel free to use this template for your own projects!