import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, EyeOff, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormValues, FormErrors } from '../types';

interface EmailRegisterFormProps {
  formValues: FormValues;
  formErrors: FormErrors;
  showPassword: boolean;
  showConfirmPassword: boolean;
  loading: boolean;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (checked: boolean) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const EmailRegisterForm: React.FC<EmailRegisterFormProps> = ({
  formValues,
  formErrors,
  showPassword,
  showConfirmPassword,
  loading,
  setShowPassword,
  setShowConfirmPassword,
  handleInputChange,
  handleCheckboxChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
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
            onCheckedChange={(checked) => handleCheckboxChange(checked === true)}
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
  );
};

export default EmailRegisterForm;