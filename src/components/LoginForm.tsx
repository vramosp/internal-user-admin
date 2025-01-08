import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithSSO } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSSO = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithSSO('your-company-domain.com');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleSkipLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <button
        onClick={handleSSO}
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
            Signing in...
          </>
        ) : (
          'Sign in with SSO'
        )}
      </button>

      <div className="text-center">
        <button
          onClick={handleSkipLogin}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Skip login for demo
        </button>
      </div>
    </div>
  );
}