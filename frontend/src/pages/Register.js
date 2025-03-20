import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import xellarKitService from "../services/XellarKitService";

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
      const wallet =
        await xellarKitService.createWalletWithSocialLogin(provider);

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
    <div className="register-container">
      <div className="register-card">
        <div className="login-logo">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L4 6V18L12 22L20 18V6L12 2Z" fill="#2e7d32" />
            <path d="M12 6L8 8V12L12 16L16 12V8L12 6Z" fill="white" />
          </svg>
          <h1>Carbonix</h1>
        </div>

        <h2 className="login-title">Create your account</h2>

        <div className="login-tabs">
          <button
            className={`login-tab ${registerMethod === "email" ? "active" : ""}`}
            onClick={() => setRegisterMethod("email")}
          >
            Email
          </button>
          <button
            className={`login-tab ${registerMethod === "social" ? "active" : ""}`}
            onClick={() => setRegisterMethod("social")}
          >
            Social Login
          </button>
        </div>

        {registerMethod === "email" ? (
          <form onSubmit={handleEmailRegister} className="login-form">
            {formErrors.submit && (
              <div className="error-message">{formErrors.submit}</div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className={formErrors.firstName ? "error" : ""}
                />
                {formErrors.firstName && (
                  <div className="error-text">{formErrors.firstName}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className={formErrors.lastName ? "error" : ""}
                />
                {formErrors.lastName && (
                  <div className="error-text">{formErrors.lastName}</div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={formErrors.email ? "error" : ""}
              />
              {formErrors.email && (
                <div className="error-text">{formErrors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                className={formErrors.password ? "error" : ""}
              />
              {formErrors.password && (
                <div className="error-text">{formErrors.password}</div>
              )}
              <small>Must be at least 8 characters</small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className={formErrors.confirmPassword ? "error" : ""}
              />
              {formErrors.confirmPassword && (
                <div className="error-text">{formErrors.confirmPassword}</div>
              )}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formValues.agreeTerms}
                  onChange={handleInputChange}
                  className={formErrors.agreeTerms ? "error" : ""}
                />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" target="_blank">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" target="_blank">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {formErrors.agreeTerms && (
                <div className="error-text">{formErrors.agreeTerms}</div>
              )}
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        ) : (
          <div className="social-login">
            {formErrors.submit && (
              <div className="error-message">{formErrors.submit}</div>
            )}

            <button
              className="social-button google"
              onClick={() => handleSocialRegister("google")}
              disabled={loading}
            >
              <i className="fab fa-google"></i>
              Sign up with Google
            </button>

            <button
              className="social-button facebook"
              onClick={() => handleSocialRegister("facebook")}
              disabled={loading}
            >
              <i className="fab fa-facebook-f"></i>
              Sign up with Facebook
            </button>

            <button
              className="social-button twitter"
              onClick={() => handleSocialRegister("twitter")}
              disabled={loading}
            >
              <i className="fab fa-twitter"></i>
              Sign up with Twitter
            </button>
          </div>
        )}

        <div className="login-divider">
          <span>Or</span>
        </div>

        <div className="login-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="register-link">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
