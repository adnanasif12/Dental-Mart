import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import AuthVendor from "../vendor/auth";
import "../styles/LoginModal.css";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);
  const [hasGoogleClientId, setHasGoogleClientId] = useState(false);

  useEffect(() => {
    // Check if Google Client ID is configured
    setHasGoogleClientId(!!import.meta.env.VITE_GOOGLE_CLIENT_ID);
  }, []);

  if (!isOpen) return null;

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await AuthVendor.login(email, password);
      if (result.success) {
        onLoginSuccess(result.user);
        onClose();
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (signUpData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      console.log('Attempting to register:', signUpData);
      const result = await AuthVendor.register({
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
      });

      console.log('Registration result:', result);
      
      if (result.success) {
        // Reset form and show success
        setSignUpData({ name: "", email: "", password: "", confirmPassword: "" });
        onLoginSuccess(result.user);
        onClose();
      } else {
        setError(result.message || "Sign up failed");
      }
    } catch (err) {
      console.error('Register error details:', err);
      setError(err.message || "Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setError("");
    setIsLoading(true);

    try {
      const result = await AuthVendor.googleLogin(credentialResponse.credential);
      if (result.success) {
        onLoginSuccess(result.user);
        onClose();
      } else {
        setError(result.message || "Google login failed");
      }
    } catch (err) {
      setError("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>
          ✕
        </button>

        {!isSignUp ? (
          <div className="login-form">
            <h2>Sign In to Your Account</h2>

            {error && <div className="login-error">{error}</div>}

            <form onSubmit={handleEmailLogin}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="forgot-password">
              <button
                type="button"
                className="forgot-password-btn"
                onClick={() => {
                  // TODO: Implement forgot password functionality
                  alert("Forgot Password feature coming soon!");
                }}
              >
                Forgot Password?
              </button>
            </div>

            {hasGoogleClientId && (
              <>
                <div className="login-divider">or</div>

                <div className="google-login-btn">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Google login failed")}
                    text="signin_with"
                    size="large"
                  />
                </div>
              </>
            )}

            <p className="login-toggle">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError("");
                }}
                className="link-btn"
              >
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          <div className="signup-form">
            <h2>Create Your Account</h2>

            {error && <div className="login-error">{error}</div>}

            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={signUpData.name}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, name: e.target.value })
                  }
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={signUpData.email}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showSignUpPassword ? "text" : "password"}
                    value={signUpData.password}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, password: e.target.value })
                    }
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    aria-label={showSignUpPassword ? "Hide password" : "Show password"}
                  >
                    {showSignUpPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showSignUpConfirmPassword ? "text" : "password"}
                    value={signUpData.confirmPassword}
                    onChange={(e) =>
                      setSignUpData({
                        ...signUpData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                    aria-label={showSignUpConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showSignUpConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            {hasGoogleClientId && (
              <>
                <div className="login-divider">or</div>

                <div className="google-login-btn">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Google login failed")}
                    text="signup_with"
                    size="large"
                  />
                </div>
              </>
            )}

            <p className="login-toggle">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError("");
                }}
                className="link-btn"
              >
                Sign In
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
