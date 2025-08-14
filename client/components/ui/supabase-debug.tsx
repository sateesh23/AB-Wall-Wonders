import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { testSupabaseConnection } from '@/lib/supabase-service';

export const SupabaseDebug: React.FC = () => {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Testing Supabase connection...');
      
      // Get environment variables
      const envVars = {
        VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
        VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
      };

      console.log('🔧 Environment variables:', envVars);
      
      // Test Supabase connection
      const connectionTest = await testSupabaseConnection();
      console.log('🔗 Connection test result:', connectionTest);
      
      setStatus({
        envVars,
        isConfigured: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY),
        connectionTest,
      });
      
    } catch (err: any) {
      console.error('❌ Supabase test error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>🗃️ Supabase Debug Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Button onClick={testConnection} disabled={loading}>
            {loading ? 'Testing...' : 'Test Supabase Connection'}
          </Button>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 font-medium">Error:</p>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {status && (
            <div className="space-y-4">
              {/* Configuration Status */}
              <div className="p-4 bg-gray-50 border rounded-md">
                <h3 className="font-medium mb-2">Configuration Status:</h3>
                <p className={`font-mono text-sm ${status.isConfigured ? 'text-green-600' : 'text-red-600'}`}>
                  {status.isConfigured ? '✓ Supabase is configured' : '❌ Supabase not configured'}
                </p>
              </div>

              {/* Environment Variables */}
              <div className="p-4 bg-gray-50 border rounded-md">
                <h3 className="font-medium mb-2">Environment Variables:</h3>
                <div className="space-y-1 font-mono text-sm">
                  {Object.entries(status.envVars).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className={typeof value === 'string' && value.includes('Missing') ? 'text-red-600' : 'text-green-600'}>
                        {typeof value === 'string' ? value : value ? 'Set' : 'Missing'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection Test */}
              <div className="p-4 bg-gray-50 border rounded-md">
                <h3 className="font-medium mb-2">Connection Test:</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={status.connectionTest.success ? 'text-green-600' : 'text-red-600'}>
                      {status.connectionTest.success ? '✓ Connected' : '❌ Failed'}
                    </span>
                  </div>
                  
                  {status.connectionTest.url && (
                    <div className="flex justify-between">
                      <span>URL:</span>
                      <span className="font-mono text-sm">{status.connectionTest.url}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Environment:</span>
                    <span className="font-mono text-sm">{status.connectionTest.environment}</span>
                  </div>
                  
                  {status.connectionTest.error && (
                    <div className="mt-2">
                      <span className="text-red-600">Error:</span>
                      <p className="text-red-600 text-sm font-mono">{status.connectionTest.error}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Setup Instructions */}
              {!status.isConfigured && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="font-medium mb-2 text-yellow-800">Setup Required:</h3>
                  <div className="text-yellow-700 text-sm space-y-1">
                    <p>1. Set VITE_SUPABASE_URL environment variable</p>
                    <p>2. Set VITE_SUPABASE_ANON_KEY environment variable</p>
                    <p>3. Restart the development server</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SupabaseDebug;
