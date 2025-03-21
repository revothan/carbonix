import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import {
  RegisterHeader,
  RegisterFooter,
  EmailRegisterForm,
  SocialRegisterForm
} from "./components";

import { RegisterProps, FormValues, FormErrors, RegisterMethod, SocialProvider, User } from "./types";
import xellarKitService from "@/services/XellarKitService";

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [registerMethod, setRegisterMethod] = useState<RegisterMethod>("email");
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    agreeTerms: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (checked: boolean): void => {
    setFormValues((prev) => ({
      ...prev,
      agreeTerms: checked,
    }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

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

  const handleEmailRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
      const user: User = {
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

  const handleSocialRegister = async (provider: SocialProvider): Promise<void> => {
    setLoading(true);

    try {
      // Initialize Xellar Kit
      await xellarKitService.initialize();

      // Create wallet with social login
      const wallet = await xellarKitService.createWalletWithSocialLogin(provider);

      // Mock user data
      const user: User = {
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
          <RegisterHeader />

          <Tabs defaultValue="email" value={registerMethod} onValueChange={(value) => setRegisterMethod(value as RegisterMethod)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">Social Login</TabsTrigger>
            </TabsList>

            <TabsContent value="email">
              <EmailRegisterForm 
                formValues={formValues}
                formErrors={formErrors}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                loading={loading}
                setShowPassword={setShowPassword}
                setShowConfirmPassword={setShowConfirmPassword}
                handleInputChange={handleInputChange}
                handleCheckboxChange={handleCheckboxChange}
                handleSubmit={handleEmailRegister}
              />
            </TabsContent>

            <TabsContent value="social">
              <SocialRegisterForm 
                formErrors={formErrors}
                loading={loading}
                handleSocialRegister={handleSocialRegister}
              />
            </TabsContent>
          </Tabs>

          <RegisterFooter />
        </Card>
      </div>
    </div>
  );
};

export default Register;