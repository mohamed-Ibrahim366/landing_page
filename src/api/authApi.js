import api from "./httpClient";

export function registerUser(formData) {
  return api.post("/auth/register", formData);
}

export function resendRegistrationOtp(registrationSessionId) {
  return api.post("/auth/register/resend-otp", { registrationSessionId });
}

export function verifyRegistrationOtp(registrationSessionId, otp) {
  return api.post("/auth/register/verify-otp", { registrationSessionId, otp });
}

export function login(email, password) {
  return api.post("/auth/login", { email, password });
}

export function resendLoginOtp(loginSessionId) {
  return api.post("/auth/login/resend-otp", { loginSessionId });
}

export function verifyLoginOtp(loginSessionId, otp, platform = "web") {
  return api.post("/auth/login/verify-otp", { loginSessionId, otp, platform });
}

export function refreshToken(refreshToken, platform = "web") {
  const body = { platform };
  if (platform === "mobile") {
    body.refreshToken = refreshToken;
  }

  return api.post("/auth/refresh", body);
}

export function logout(refreshToken, platform = "web") {
  const body = { platform };
  if (platform === "mobile") {
    body.refreshToken = refreshToken;
  }

  return api.post("/auth/logout", body);
}

export function initiatePasswordReset(email) {
  return api.post("/auth/password-reset", { email });
}

export function resendPasswordResetOtp(resetSessionId) {
  return api.post("/auth/password-reset/resend-otp", { resetSessionId });
}

export function confirmPasswordReset(resetSessionId, otp, newPassword) {
  return api.post("/auth/password-reset/confirm", { resetSessionId, otp, newPassword });
}
