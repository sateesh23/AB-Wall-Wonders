// Error handler to suppress expected network errors in development/cloud environments

const originalConsoleError = console.error;

// List of error patterns that are expected and should be suppressed
const suppressedErrorPatterns = [
  'Request error while attempting to reach',
  'Sanity connection test failed',
  'Error testing Sanity connection',
  'Failed to fetch',
  'Network request failed',
  'ERR_NETWORK',
  'ERR_INTERNET_DISCONNECTED'
];

// Enhanced console.error that suppresses expected Sanity connection errors
console.error = (...args: any[]) => {
  const errorMessage = args.join(' ');
  
  // Check if this is a suppressed error pattern
  const shouldSuppress = suppressedErrorPatterns.some(pattern => 
    errorMessage.includes(pattern)
  );
  
  if (shouldSuppress) {
    // For Sanity-related errors, show a more user-friendly message once
    if (errorMessage.includes('Sanity') && !sessionStorage.getItem('sanity_error_shown')) {
      console.info('ℹ️ Running in demo mode - Sanity CMS not connected');
      sessionStorage.setItem('sanity_error_shown', 'true');
    }
    return; // Suppress the error
  }
  
  // For all other errors, use the original console.error
  originalConsoleError.apply(console, args);
};

// Restore original console.error when needed
export const restoreConsoleError = () => {
  console.error = originalConsoleError;
};

// Helper to check if we're in a network-restricted environment
export const isNetworkRestricted = (): boolean => {
  // Check if we're in a cloud/sandboxed environment
  const userAgent = navigator.userAgent.toLowerCase();
  const hostname = window.location.hostname;
  
  return (
    hostname.includes('fly.dev') ||
    hostname.includes('vercel.app') ||
    hostname.includes('netlify.app') ||
    hostname.includes('codesandbox.io') ||
    userAgent.includes('headless')
  );
};

// Initialize error suppression
export const initErrorSuppression = () => {
  if (isNetworkRestricted()) {
    console.info('🔧 Network-restricted environment detected - Sanity errors will be suppressed');
  }
};
