import React, { useState } from 'react';
import { Form, Button, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import AuthLayout from '../../Components/AuthLayout';
import { login } from '../../api/authApi';

/* ===== Icons ===== */
const EyeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" y1="2" x2="22" y2="22" />
  </svg>
);

/* ===== Login Page ===== */
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await login(email, password);
      const query = createSearchParams({
        mode: 'login',
        loginSessionId: response.loginSessionId,
        email: response.otpDelivery || email
      }).toString();

      navigate(`/otp-verification?${query}`);
    } catch (error) {
      setErrorMessage(error.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout showBackButton={true}>

      {/* Unified Login Alert */}
      <div
        className="p-3 mb-4 rounded-3 d-flex align-items-start"
        style={{ backgroundColor: '#eef4ff', border: '1px solid #d0e1ff' }}
      >
        <span className="me-2 mt-1 text-primary">ⓘ</span>
        <div>
          <h6 className="text-primary fw-bold mb-1" style={{ fontSize: '0.9rem' }}>
            Unified Login
          </h6>
          <p
            className="text-muted mb-0"
            style={{ fontSize: '0.8rem', lineHeight: '1.4' }}
          >
            The system will automatically identify your role (Admin, Healthcare
            Provider, Laboratory, or Imaging Center) and redirect you to your
            dashboard.
          </p>
        </div>
      </div>

      {/* Login Form */}
      <Form onSubmit={handleLogin}>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label className="small fw-bold text-secondary">
            Email Address
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="admin@ehr.com"
            className="py-2 border-light-subtle shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* Password with toggle */}
        <Form.Group className="mb-2">
          <Form.Label className="small fw-bold text-secondary">
            Password
          </Form.Label>

          <InputGroup className="shadow-sm">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              className="py-2 border-light-subtle"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              variant="outline-none"
              onClick={() => setShowPassword(!showPassword)}
              style={{ borderLeft: '0' }}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
          </InputGroup>
        </Form.Group>

        {/* Forgot password */}
        <div className="text-end mb-4">
          <Link
            to="/forgot-password"
            className="text-decoration-none fw-bold small text-primary"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <Button
          variant="primary"
          type="submit"
          className="w-100 py-2 fw-bold shadow-sm mb-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Login'}
        </Button>
      </Form>

      {/* Separator */}
      <div className="position-relative text-center mb-4">
        <hr className="text-muted" />
        <span className="position-absolute top-50 start-50 translate-middle bg-white px-2 text-muted small">
          or
        </span>
      </div>

      {/* Register */}
      <div className="text-center">
        <p className="small text-muted mb-0">
          Don't have an account?{' '}
          <Link to="/registerType" className="text-decoration-none fw-bold text-primary">
            Register here
          </Link>
        </p>
      </div>

    </AuthLayout>
  );
};

export default LoginPage;
