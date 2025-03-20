import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import xellarKitService from '@/services/XellarKitService';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Login = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real app, this would authenticate with a backend
      // For this demo, we'll simulate a successful login
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      
      // Create or connect to a wallet using Xellar Kit
      await xellarKitService.initialize();
      const wallet = await xellarKitService.createWalletWithEmail(email);
      
      // Mock user data that would come from backend
      const user = {
        id: 'user123',
        email: email,
        displayName: email.split('@')[0],
        walletAddress: wallet?.address || 'demo-wallet-address',
        balance: '1,000,000',
        carbonOffset: '25.4',
        createdAt: new Date().toISOString()
      };
      
      // Call the parent component's login handler
      onLogin(user);
      
      // Redirect to dashboard
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');

    try {
      // Initialize Xellar Kit
      await xellarKitService.initialize();
      
      // Create wallet with social login
      const wallet = await xellarKitService.createWalletWithSocialLogin(provider);
      
      // Mock user data
      const user = {
        id: `user-${provider}-123`,
        email: `user@${provider}.com`,
        displayName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        walletAddress: wallet?.address || `demo-${provider}-wallet-address`,
        balance: '1,000,000',
        carbonOffset: '25.4',
        createdAt: new Date().toISOString()
      };
      
      // Call the parent component's login handler
      onLogin(user);
      
      // Redirect to dashboard
      navigate('/');
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="hsl(var(--primary))" />
                  <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to access your carbon credit portfolio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="email" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="pt-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
                    {error}
                  </div>
                )}
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="********" 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="social" className="pt-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
                    {error}
                  </div>
                )}
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-[#4285F4] hover:bg-[#4285F4]/90" 
                    onClick={() => handleSocialLogin('google')}
                    disabled={loading}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5C13.6168 5 15.1013 5.55353 16.2863 6.47406L19.9235 3.00409C17.8088 1.13964 15.0402 0 12 0C7.3924 0 3.39667 2.59991 1.3858 6.40985L5.43024 9.60278C6.40997 6.91937 8.97748 5 12 5Z" fill="#FBBB00"/>
                      <path d="M23.8961 13.2146C23.9586 12.4844 24 11.7458 24 11C24 10.1422 23.9434 9.30302 23.8372 8.48599H12V13.5H18.6034C18.2466 14.9489 17.3885 16.118 16.2046 16.9542L20.2001 20.0981C22.4019 18.1216 23.8476 15.693 23.8961 13.2146Z" fill="#518EF8"/>
                      <path d="M5.27569 14.3976C5.03208 13.6529 4.90453 12.8425 4.90453 12.0001C4.90453 11.1575 5.03223 10.3468 5.27553 9.60228L1.23134 6.40985C0.449616 8.38673 0 10.5829 0 12.9128C0 15.0148 0.443817 17.0223 1.22497 18.846L5.27569 14.3976Z" fill="#28B446"/>
                      <path d="M12 24C15.0675 24 17.8569 22.8762 19.9819 21.0981L16.2046 16.9542C15.4135 17.5486 14.1193 18 12 18C8.33959 18 5.78231 16.1346 5.27539 14.3976L1.22498 18.8459C3.38046 22.1568 7.65223 24 12 24Z" fill="#F14336"/>
                    </svg>
                    Continue with Google
                  </Button>
                  <Button 
                    className="w-full bg-[#1877F2] hover:bg-[#1877F2]/90" 
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={loading}
                  >
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Continue with Facebook
                  </Button>
                  <Button 
                    className="w-full bg-black hover:bg-black/90" 
                    onClick={() => handleSocialLogin('github')}
                    disabled={loading}
                  >
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    Continue with GitHub
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Separator className="mb-4" />
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary underline-offset-4 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;