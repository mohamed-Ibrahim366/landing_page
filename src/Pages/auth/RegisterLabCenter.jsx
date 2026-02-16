// src/Pages/auth/RegisterLabCenter.jsx
import React from 'react';
import RegistrationForm from '../../Components/registration/RegistrationForm';

const RegisterLabCenter = () => {
  return (
    <RegistrationForm
      title="Register Lab Center"
      subtitle="Laboratory Center Registration"
      entityType="Laboratory"
      registrationType="simple"
      requiredDocuments={[
        { name: 'labAccreditation', label: 'Lab Accreditation / Business Registration' }
      ]}
      optionalDocuments={[
        { name: 'proofOfAddress', label: 'Proof of Address' },
        { name: 'labLogo', label: 'Lab Logo' }
      ]}
    />
  );
};

export default RegisterLabCenter;
