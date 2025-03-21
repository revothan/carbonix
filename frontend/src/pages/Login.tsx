import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, EyeOff, Eye, Twitter, Facebook } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

import xellarKitService from "@/services/XellarKitService";

interface User {
  id: string;
  email: string;
  displayName: string;
  walletAddress: string;
  balance: string;
  carbonOffset: string;
  createdAt: string;
  [key: string]: any;
}

interface LoginProps {
  onLogin: (user: User) => void;
}

type LoginMethod = "email" | "social";
type SocialProvider = "google" | "facebook" | "twitter";

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // In a real app, this would authenticate with a backend
      // For this demo, we'll simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call

      // Create or connect to a wallet using Xellar Kit
      await xellarKitService.initialize();
      const wallet = await xellarKitService.createWalletWithEmail(email);

      // Mock user data that would come from backend
      const user: User = {
        id: "user123",
        email: email,
        displayName: email.split("@")[0],
        walletAddress: wallet?.address || "demo-wallet-address",
        balance: "1,000,000",
        carbonOffset: "25.4",
        createdAt: new Date().toISOString(),
      };

      // Call the parent component's login handler
      onLogin(user);

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: SocialProvider) => {
    setLoading(true);
    setError("");

    try {
      // Initialize Xellar Kit
      await xellarKitService.initialize();

      // Create wallet with social login
      const wallet =
        await xellarKitService.createWalletWithSocialLogin(provider);

      // Mock user data
      const user: User = {
        id: `user-${provider}-123`,
        email: `user@${provider}.com`,
        displayName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        walletAddress: wallet?.address || `demo-${provider}-wallet-address`,
        balance: "1,000,000",
        carbonOffset: "25.4",
        createdAt: new Date().toISOString(),
      };

      // Call the parent component's login handler
      onLogin(user);

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      console.error(`${provider} login error:`, error);
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      {/* Login Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 px-4 py-8 bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-2">
              <svg
                className="h-10 w-10"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L4 6V18L12 22L20 18V6L12 2Z"
                  fill="hsl(var(--primary))"
                />
                <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold">
              Log in to Carbonix
            </CardTitle>
            <CardDescription>
              Access your carbon credit portfolio
            </CardDescription>
          </CardHeader>

          <Tabs
            defaultValue="email"
            value={loginMethod}
            onValueChange={(value) => setLoginMethod(value as LoginMethod)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">Social Login</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailLogin}>
                <CardContent className="space-y-4 pt-4">
                  {error && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-9"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-9"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => 
                        setRememberMe(checked === true)
                      }
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-2">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logging in..." : "Log in"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="social">
              <CardContent className="space-y-4 pt-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                    {error}
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin("google")}
                  disabled={loading}
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="#EA4335"
                      d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                    />
                    <path
                      fill="#34A853"
                      d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin("facebook")}
                  disabled={loading}
                >
                  <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Continue with Facebook</span>
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialLogin("twitter")}
                  disabled={loading}
                >
                  <Twitter className="mr-2 h-4 w-4 text-sky-500" />
                  <span>Continue with Twitter</span>
                </Button>
              </CardContent>
            </TabsContent>
          </Tabs>

          <div className="p-6 pt-0">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Info/Promotion Panel */}
      <div className="hidden md:flex md:w-1/2 bg-primary/5 p-8 lg:p-12 flex-col justify-center">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Indonesia's Premier Carbon Credit Marketplace
          </h2>
          <p className="text-muted-foreground">
            Carbonix connects carbon credit generators with buyers, enabling
            transparent, efficient, and accessible carbon trading in Indonesia.
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M17.5 19.1116C20.4471 18.9504 22 17.7863 22 15.6258C22 13.3966 19.9853 12.0217 18.5 11.5282M6.5 11.5282C5.01472 12.0217 3 13.3966 3 15.6258C3 17.7863 4.55285 18.9504 7.5 19.1116"></path>
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"></path>
                  <path d="M12 22V12"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Tokenized Carbon Credits</h3>
                <p className="text-sm text-muted-foreground">
                  Trade verifiable carbon credits on the blockchain
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"></path>
                  <path d="M9 12L11 14L15 10"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Multi-Level Verification</h3>
                <p className="text-sm text-muted-foreground">
                  Robust validation ensures credit legitimacy
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-2 rounded-full text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">IDRX-Powered Marketplace</h3>
                <p className="text-sm text-muted-foreground">
                  Trade with Indonesia's digital Rupiah stablecoin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;