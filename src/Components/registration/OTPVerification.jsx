import React, { useState, useEffect } from "react";
import { Card, Button, Form, Row, Col, Container, Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  resendLoginOtp,
  resendRegistrationOtp,
  verifyLoginOtp,
  verifyRegistrationOtp
} from "../../api/authApi";

const OTPVerification = ({ email = "example@email.com" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode") || "registration";
  const registrationSessionId = params.get("registrationSessionId");
  const loginSessionId = params.get("loginSessionId");
  const registrationType = params.get("registrationType") || "";
  const entityType = params.get("entityType") || "";
  const targetEmail = params.get("email") || email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  /* =====================
     OTP INPUT
  ====================== */
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  /* =====================
     TIMER
  ====================== */
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        if (!loginSessionId) throw new Error("Missing login session ID.");
        const response = await verifyLoginOtp(loginSessionId, otpCode, "web");

        if (response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
        }

        setSuccessMessage(response.message || "Login successful.");
        setTimeout(() => navigate("/"), 800);
      } else {
        if (!registrationSessionId) throw new Error("Missing registration session ID.");
        await verifyRegistrationOtp(registrationSessionId, otpCode);

        const query = new URLSearchParams({
          registrationType,
          entityType
        }).toString();
        navigate(`/registration-submitted?${query}`);
      }
    } catch (error) {
      setErrorMessage(error.message || "OTP verification failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || isResending) return;
    setErrorMessage("");
    setSuccessMessage("");
    setIsResending(true);

    try {
      if (mode === "login") {
        if (!loginSessionId) throw new Error("Missing login session ID.");
        await resendLoginOtp(loginSessionId);
      } else {
        if (!registrationSessionId) throw new Error("Missing registration session ID.");
        await resendRegistrationOtp(registrationSessionId);
      }

      setTimer(90);
      setCanResend(false);
      setSuccessMessage("OTP has been resent.");
    } catch (error) {
      setErrorMessage(error.message || "Could not resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background:
          "radial-gradient(circle at top, #f4f7fb 0%, #eaf0f8 40%, #e6edf6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">

                {/* Back */}
                <div
                  onClick={() => navigate(-1)}
                  style={{
                    cursor: "pointer",
                    fontWeight: 500,
                    color: "#475569",
                    marginBottom: 20
                  }}
                >
                  Back
                </div>

                {/* Logo */}
                <div className="text-center mb-4">
                  <div
                    style={{
                      width: 110,
                      height: 110,
                      borderRadius: "50%",
                      background: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto"
                    }}
                  >
                    <img
                      src="/src/assets/logo_light-removebg.png"
                      alt="logo"
                      width={60}
                    />
                  </div>
                </div>

                {/* Title */}
                <h6 className="text-center fw-semibold text-secondary mb-3">
                  Enter the 6-digit OTP sent to your email
                </h6>
                <div className="text-center text-muted mb-3">{targetEmail}</div>

                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}

                {/* Label */}
                <div className="fw-medium text-muted mb-2">OTP Code</div>

                {/* OTP Inputs */}
                <Row className="justify-content-center mb-3">
                  {otp.map((digit, index) => (
                    <Col xs="auto" key={index}>
                      <Form.Control
                        id={`otp-${index}`}
                        value={digit}
                        onChange={(e) =>
                          handleChange(index, e.target.value)
                        }
                        maxLength={1}
                        className="text-center fs-4"
                        style={{
                          width: 55,
                          height: 55,
                          borderRadius: 10
                        }}
                      />
                    </Col>
                  ))}
                </Row>

                {/* Enter Button */}
                <Button
                  className="w-100 fw-semibold mb-3"
                  style={{ padding: "12px" }}
                  disabled={otp.includes("") || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "Verifying..." : "Enter"}
                </Button>

                {/* Resend */}
                <div className="text-center text-secondary mb-1">
                  Didnâ€™t receive the code?
                </div>

                <div
                  className="text-center fw-medium mb-3"
                  style={{
                    color: canResend ? "#2563eb" : "#94a3b8",
                    cursor: canResend ? "pointer" : "default"
                  }}
                  onClick={handleResend}
                >
                  {isResending
                    ? "Resending..."
                    : `Resend code ${!canResend ? `(wait ${formatTime()})` : ""}`}
                </div>

                {/* Expiry */}
                <div
                  className="text-center py-2 rounded"
                  style={{ background: "#f1f5f9", fontSize: 13 }}
                >
                  The code will expire in 5 minutes
                </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OTPVerification;
