import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Simple password - in production, use proper authentication
  const ADMIN_PASSWORD = 'abwallwonders2025';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('abww_admin_auth', 'true');
      onAuthenticated();
    } else {
      setError('Invalid password. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <img src="/ABWWW.png" alt="AB Wall Wonders" className="h-16 mx-auto" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <p className="text-gray-600">Enter password to access admin panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Access Admin Panel
                </>
              )}
            </Button>
          </form>
          
        </CardContent>
      </Card>
    </div>
  );
}
