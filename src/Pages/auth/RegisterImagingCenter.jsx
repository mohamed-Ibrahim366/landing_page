// src/Pages/auth/RegisterImagingCenter.jsx
import React from 'react';
import RegistrationForm from '../../Components/registration/RegistrationForm';

const RegisterImagingCenter = () => {
  return (
    <RegistrationForm
      title="Register Imaging Center"
      subtitle="Imaging Center Registration"
      entityType="Imaging"
      registrationType="simple"
      requiredDocuments={[
        { name: 'imagingAccreditation', label: 'Imaging Center Accreditation / Business Registration' }
      ]}
      optionalDocuments={[
        { name: 'proofOfAddress', label: 'Proof of Address' },
        { name: 'centerLogo', label: 'Center Logo' }
      ]}
    />
  );
};

export default RegisterImagingCenter;