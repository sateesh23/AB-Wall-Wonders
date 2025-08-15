import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Database, Loader2 } from 'lucide-react';
import sanityService from '@/lib/sanity-service';

export function SanityStatus() {
  const [status, setStatus] = useState<{
    connected: boolean;
    projectCount?: number;
    error?: string;
    loading: boolean;
  }>({ connected: false, loading: true });

  useEffect(() => {
    const checkConnection = async () => {
      setStatus(prev => ({ ...prev, loading: true }));
      
      try {
        const result = await SanityService.testConnection();
        setStatus({
          connected: result.connected,
          projectCount: result.projectCount,
          error: result.error,
          loading: false
        });
      } catch (error) {
        setStatus({
          connected: false,
          error: 'Failed to connect',
          loading: false,
          projectCount: 0
        });
      }
    };

    // Initial check
    checkConnection();
    
    // Refresh status every 30 seconds
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (status.loading) {
    return (
      <Badge variant="secondary" className="gap-2">
        <Loader2 className="h-3 w-3 animate-spin" />
        Connecting...
      </Badge>
    );
  }

  if (!status.connected) {
    return (
      <Badge variant="outline" className="gap-2 border-blue-500 text-blue-600">
        <Database className="h-3 w-3" />
        Admin Mode ({status.projectCount || 0} projects)
      </Badge>
    );
  }

  if (status.projectCount === 0) {
    return (
      <Badge variant="outline" className="gap-2 border-orange-500 text-orange-600">
        <Database className="h-3 w-3" />
        Ready - No Projects
      </Badge>
    );
  }

  return (
    <Badge variant="default" className="gap-2 bg-green-600">
      <CheckCircle className="h-3 w-3" />
      Live ({status.projectCount} projects)
    </Badge>
  );
}
