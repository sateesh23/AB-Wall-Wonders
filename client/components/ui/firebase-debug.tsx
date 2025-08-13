import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export const FirebaseDebug: React.FC = () => {
  const [status, setStatus] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔍 Testing Firebase connection...');
      
      // Check environment variables
      const envVars = {
        VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
        VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
      };
      
      console.log('🔧 Environment variables:', envVars);
      
      // Test Firebase configuration
      const { isFirebaseConfigured } = await import('@/lib/firebase');
      const isConfigured = isFirebaseConfigured();
      console.log('⚙️ Firebase configured:', isConfigured);
      
      // Test connection
      const { testFirebaseConnection } = await import('@/lib/firebase-service');
      const connectionTest = await testFirebaseConnection();
      console.log('🔗 Connection test result:', connectionTest);
      
      setStatus({
        envVars,
        isConfigured,
        connectionTest
      });
      
    } catch (err: any) {
      console.error('❌ Firebase test error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>🔥 Firebase Debug Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={testConnection} disabled={loading}>
            {loading ? 'Testing...' : 'Test Firebase Connection'}
          </Button>
          
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800">Error:</h3>
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          {status && (
            <div className="space-y-4">
              {/* Environment Variables */}
              <div className="p-4 bg-gray-50 border rounded-lg">
                <h3 className="font-semibold mb-2">Environment Variables:</h3>
                <div className="grid grid-cols-1 gap-2 text-sm font-mono">
                  {Object.entries(status.envVars).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className={value ? 'text-green-600' : 'text-red-600'}>
                        {value ? '✓ Set' : '❌ Missing'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Configuration Status */}
              <div className="p-4 bg-blue-50 border rounded-lg">
                <h3 className="font-semibold mb-2">Configuration Status:</h3>
                <p className={`font-mono text-sm ${status.isConfigured ? 'text-green-600' : 'text-red-600'}`}>
                  {status.isConfigured ? '✓ Firebase is configured' : '❌ Firebase not configured'}
                </p>
              </div>
              
              {/* Connection Test */}
              <div className="p-4 bg-yellow-50 border rounded-lg">
                <h3 className="font-semibold mb-2">Connection Test:</h3>
                <pre className="text-sm bg-white p-2 rounded border overflow-auto">
                  {JSON.stringify(status.connectionTest, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
