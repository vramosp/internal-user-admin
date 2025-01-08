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

## Deployment

1. Push your code to GitHub
2. Click the "Deploy to Netlify" button above
3. Connect your GitHub repository
4. Configure environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

## Project Structure

```
├── src/
│   ├── components/      # React components
│   ├── data/           # Sample data and constants
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
└── package.json        # Project dependencies
```

## License

MIT License - feel free to use this template for your own projects!