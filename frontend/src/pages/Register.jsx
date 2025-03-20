import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, EyeOff, Eye, Twitter, Facebook } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

import xellarKitService from "@/services/XellarKitService";

const Register = ({ onRegister }) => {
  const [registerMethod, setRegisterMethod] = useState("email");
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    agreeTerms: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email address is invalid";
    }

    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formValues.firstName) {
      errors.firstName = "First name is required";
    }

    if (!formValues.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!formValues.agreeTerms) {
      errors.agreeTerms = "You must agree to the terms and conditions";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEmailRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // In a real app, this would call a registration API
      // For demo, we'll create a wallet using Xellar Kit
      await xellarKitService.initialize();
      const wallet = await xellarKitService.createWalletWithEmail(
        formValues.email,
      );

      // Create user object
      const user = {
        id: `user-${Date.now()}`,
        email: formValues.email,
        displayName: `${formValues.firstName} ${formValues.lastName}`,
        walletAddress: wallet?.address || "demo-wallet-address",
        balance: "0",
        carbonOffset: "0",
        createdAt: new Date().toISOString(),
      };

      // Call the parent component's registration handler
      onRegister(user);

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      setFormErrors((prev) => ({
        ...prev,
        submit: "Registration failed. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialRegister = async (provider) => {
    setLoading(true);

    try {
      // Initialize Xellar Kit
      await xellarKitService.initialize();

      // Create wallet with social login
      const wallet = await xellarKitService.createWalletWithSocialLogin(provider);

      // Mock user data
      const user = {
        id: `user-${provider}-${Date.now()}`,
        email: `user@${provider}.com`,
        displayName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
        walletAddress: wallet?.address || `demo-${provider}-wallet-address`,
        balance: "0",
        carbonOffset: "0",
        createdAt: new Date().toISOString(),
      };

      // Call the parent component's registration handler
      onRegister(user);

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      console.error(`${provider} registration error:`, error);
      setFormErrors((prev) => ({
        ...prev,
        submit: `${provider} registration failed. Please try again.`,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-background">
      <div className="flex items-center justify-center w-full px-4 py-8">
        <Card className="w-full max-w-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-2">
              <svg className="h-10 w-10" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="hsl(var(--primary))" />
                <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription>Join Carbonix and start your carbon trading journey</CardDescription>
          </CardHeader>

          <Tabs defaultValue="email" value={registerMethod} onValueChange={setRegisterMethod}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">Social Login</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <form onSubmit={handleEmailRegister}>
                <CardContent className="space-y-4 pt-4">
                  {formErrors.submit && (
                    <Alert variant="destructive">
                      <AlertDescription>{formErrors.submit}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="John"
                          className="pl-9"
                          value={formValues.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.firstName && (
                        <p className="text-sm text-destructive">{formErrors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Doe"
                          className="pl-9"
                          value={formValues.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                      {formErrors.lastName && (
                        <p className="text-sm text-destructive">{formErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-9"
                        value={formValues.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-sm text-destructive">{formErrors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-9"
                        value={formValues.password}
                        onChange={handleInputChange}
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
                    {formErrors.password && (
                      <p className="text-sm text-destructive">{formErrors.password}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-9"
                        value={formValues.confirmPassword}
                        onChange={handleInputChange}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                    {formErrors.confirmPassword && (
                      <p className="text-sm text-destructive">{formErrors.confirmPassword}</p>
                    )}
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="agreeTerms"
                      name="agreeTerms" 
                      checked={formValues.agreeTerms}
                      onCheckedChange={(checked) => 
                        setFormValues({
                          ...formValues,
                          agreeTerms: checked === true
                        })
                      }
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="agreeTerms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link to="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                      {formErrors.agreeTerms && (
                        <p className="text-sm text-destructive">{formErrors.agreeTerms}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating Account..." : "Create Account"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="social">
              <CardContent className="space-y-4 pt-4">
                {formErrors.submit && (
                  <Alert variant="destructive">
                    <AlertDescription>{formErrors.submit}</AlertDescription>
                  </Alert>
                )}

                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleSocialRegister('google')}
                  disabled={loading}
                >
                  <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                    <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                    <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                    <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
                  </svg>
                  <span>Sign up with Google</span>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleSocialRegister('facebook')}
                  disabled={loading}
                >
                  <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Sign up with Facebook</span>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => handleSocialRegister('twitter')}
                  disabled={loading}
                >
                  <Twitter className="mr-2 h-4 w-4 text-sky-500" />
                  <span>Sign up with Twitter</span>
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
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign In
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;