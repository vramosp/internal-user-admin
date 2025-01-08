/*
  # Create employees table for admin dashboard users

  1. New Tables
    - `employees`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `first_name` (text)
      - `last_name` (text)
      - `role` (text) - admin, support, etc.
      - `created_at` (timestamp)
      - `last_login_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS
    - Add policy for authenticated employees
*/

CREATE TABLE employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  role text NOT NULL DEFAULT 'support',
  created_at timestamptz DEFAULT now(),
  last_login_at timestamptz,
  status text NOT NULL DEFAULT 'active'
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Only allow employees to read their own data
CREATE POLICY "Employees can read own data"
  ON employees
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Insert some sample employees
INSERT INTO employees (email, first_name, last_name, role)
VALUES 
  ('admin@company.com', 'Admin', 'User', 'admin'),
  ('support@company.com', 'Support', 'User', 'support');