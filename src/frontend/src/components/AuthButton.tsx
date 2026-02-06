import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AuthButton() {
  const { login, clear, identity, isLoggingIn, isLoginError, loginError } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          queryClient.clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const handleRetry = async () => {
    await clear();
    queryClient.clear();
    setTimeout(() => login(), 300);
  };

  if (isLoginError && loginError) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <Alert variant="destructive" className="mb-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Login failed. Please try again.
          </AlertDescription>
        </Alert>
        <Button
          onClick={handleRetry}
          variant="default"
          className="gap-2 w-full"
        >
          <LogIn className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleAuth}
      disabled={isLoggingIn}
      variant={isAuthenticated ? 'outline' : 'default'}
      className="gap-2"
    >
      {isLoggingIn ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Logging in...
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="h-4 w-4" />
          Logout
        </>
      ) : (
        <>
          <LogIn className="h-4 w-4" />
          Login
        </>
      )}
    </Button>
  );
}
