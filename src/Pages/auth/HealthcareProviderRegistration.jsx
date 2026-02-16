// src/Pages/auth/HealthcareProviderRegistration.jsx
import React from 'react';
import RegistrationForm from '../../Components/registration/RegistrationForm';

const HealthcareProviderRegistration = () => {
  return (
    <RegistrationForm
      title="Healthcare Provider Registration"
      subtitle="Healthcare Provider Registration"
      registrationType="healthcare-provider"
    />
  );
};

export default HealthcareProviderRegistration;