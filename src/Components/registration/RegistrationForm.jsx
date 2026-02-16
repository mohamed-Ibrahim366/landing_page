// src/components/registration/RegistrationForm.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Alert } from 'react-bootstrap';
import { useNavigate, createSearchParams } from 'react-router-dom';
import {SectionHeader} from '../registration/SectionHeader';
import {DocumentUpload} from '../registration/DocumentUpload';
import {RegistrationProcess} from '../registration/RegistrationProcess';
import {SubmitButton} from '../registration/SubmitButton';
import {BackButton} from '../registration/BackButton';
import { registerUser } from '../../api/authApi';

const RegistrationForm = ({ 
  title, 
  subtitle, 
  entityType,
  registrationType, // 'simple' or 'healthcare-provider'
  requiredDocuments,
  optionalDocuments,
  OTP = '/otp-verification'
}) => {
  const navigate = useNavigate();
  
  // Initialize form data based on registration type
  const getInitialFormData = () => {
    if (registrationType === 'healthcare-provider') {
      return {
        email: '', password: '', firstName: '', middleName: '', lastName: '',
        dateOfBirth: '', contactPhone: '', nationalId: '', gender: '',
        medicalLicenseNumber: '', specialization: '', workplaceName: '',
        workplaceAddress: '', workplaceLogo: null, nationalIdFront: null,
        nationalIdBack: null, medicalLicenseDoc: null, workplaceDoc: null
      };
    } else {
      // Simple registration (Lab/Imaging)
      const baseData = {
        centerName: '',
        accreditationNumber: '',
        address: '',
        fullName: '',
        email: '',
        password: '',
        contactPhone: ''
      };
      
      const docFields = {};
      [...requiredDocuments, ...optionalDocuments].forEach(doc => {
        docFields[doc.name] = null;
      });
      
      return { ...baseData, ...docFields };
    }
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizePhoneNumber = (value) => value.replace(/\D/g, '');

  const getRole = () => {
    if (registrationType === 'healthcare-provider') return 'HEALTHCARE_PROVIDER';
    if (entityType === 'Laboratory') return 'LAB';
    if (entityType === 'Imaging') return 'IMAGING_CENTER';
    return '';
  };

  const buildRegistrationFormData = () => {
    const payload = new FormData();
    const role = getRole();

    if (registrationType === 'healthcare-provider') {
      payload.append('role', role);
      payload.append('email', formData.email);
      payload.append('phoneNumber', normalizePhoneNumber(formData.contactPhone));
      payload.append('password', formData.password);
      payload.append('firstName', formData.firstName);
      payload.append('middleName', formData.middleName);
      payload.append('surName', formData.lastName);
      payload.append('gender', formData.gender.toUpperCase());
      payload.append('dateOfBirth', formData.dateOfBirth);
      payload.append('nationalId', formData.nationalId);
      payload.append('medicalLicenseNumber', formData.medicalLicenseNumber);
      payload.append('specialization', formData.specialization);
      payload.append('workplaceName', formData.workplaceName);
      payload.append('workplaceAddress', formData.workplaceAddress);
      payload.append('nationalIdFront', formData.nationalIdFront);
      payload.append('nationalIdBack', formData.nationalIdBack);
      payload.append('medicalLicenseDocument', formData.medicalLicenseDoc);
      payload.append('workplaceDocument', formData.workplaceDoc);
      if (formData.workplaceLogo) payload.append('workplaceLogo', formData.workplaceLogo);
    } else {
      payload.append('role', role);
      payload.append('centerName', formData.centerName);
      payload.append('centerAddress', formData.address);
      payload.append('registrationNumber', formData.accreditationNumber);
      payload.append('administratorFullName', formData.fullName);
      payload.append('email', formData.email);
      payload.append('phoneNumber', normalizePhoneNumber(formData.contactPhone));
      payload.append('password', formData.password);

      if (role === 'LAB') {
        payload.append('accreditationDocument', formData.labAccreditation);
        if (formData.proofOfAddress) payload.append('proofOfAddress', formData.proofOfAddress);
        if (formData.labLogo) payload.append('labLogo', formData.labLogo);
      }

      if (role === 'IMAGING_CENTER') {
        payload.append('accreditationDocument', formData.imagingAccreditation);
        if (formData.proofOfAddress) payload.append('proofOfAddress', formData.proofOfAddress);
        if (formData.centerLogo) payload.append('centerLogo', formData.centerLogo);
      }
    }

    return payload;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files?.[0]) {
      const file = files[0];
      // Handle different file sizes for healthcare provider
      const maxSize = (name === 'workplaceLogo') ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
      
      if (!['image/png', 'image/jpeg', 'application/pdf'].includes(file.type)) {
        setErrors(prev => ({ ...prev, [name]: 'Invalid file type. Please upload PNG, JPG, or PDF files only.' }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, [name]: `File too large. Max size: ${maxSize / (1024 * 1024)}MB` }));
        return;
      }
      
      setErrors(prev => ({ ...prev, [name]: '' }));
      setFormData(prev => ({ ...prev, [name]: file }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errs = {};
    
    if (registrationType === 'healthcare-provider') {
      // Healthcare provider validation
      if (!formData.email) errs.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email format';
      if (!formData.password) errs.password = 'Password is required';
      else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters';
      if (!formData.firstName) errs.firstName = 'First name is required';
      if (!formData.middleName) errs.middleName = 'Middle name is required';
      if (!formData.lastName) errs.lastName = 'Last name is required';
      if (!formData.dateOfBirth) errs.dateOfBirth = 'Date of birth is required';
      if (!formData.contactPhone) errs.contactPhone = 'Contact phone is required';
      else if (!/^\d{11}$/.test(normalizePhoneNumber(formData.contactPhone))) errs.contactPhone = 'Phone number must be 11 digits';
      if (!formData.nationalId) errs.nationalId = 'National ID is required';
      else if (!/^\d{14}$/.test(formData.nationalId)) errs.nationalId = 'National ID must be 14 digits';
      if (!formData.gender) errs.gender = 'Gender is required';
      if (!formData.medicalLicenseNumber) errs.medicalLicenseNumber = 'Medical license number is required';
      if (!formData.specialization) errs.specialization = 'Specialization is required';
      if (!formData.workplaceName) errs.workplaceName = 'Workplace name is required';
      if (!formData.workplaceAddress) errs.workplaceAddress = 'Workplace address is required';
      if (!formData.nationalIdFront) errs.nationalIdFront = 'National ID (Front) is required';
      if (!formData.nationalIdBack) errs.nationalIdBack = 'National ID (Back) is required';
      if (!formData.medicalLicenseDoc) errs.medicalLicenseDoc = 'Medical license document is required';
      if (!formData.workplaceDoc) errs.workplaceDoc = 'Workplace document is required';
    } else {
      // Simple registration validation
      if (!formData.centerName) errs.centerName = 'Center name is required';
      if (!formData.accreditationNumber) errs.accreditationNumber = 'Accreditation number is required';
      if (!formData.address) errs.address = 'Address is required';
      if (!formData.fullName) errs.fullName = 'Full name is required';
      if (!formData.email) errs.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email format';
      if (!formData.password) errs.password = 'Password is required';
      else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters';
      if (!formData.contactPhone) errs.contactPhone = 'Contact phone is required';
      else if (!/^\d{11}$/.test(normalizePhoneNumber(formData.contactPhone))) errs.contactPhone = 'Phone number must be 11 digits';
      
      requiredDocuments.forEach(doc => {
        if (!formData[doc.name]) {
          errs[doc.name] = `${doc.label} is required`;
        }
      });
    }
    
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await registerUser(buildRegistrationFormData());
      const query = createSearchParams({
        mode: 'registration',
        registrationSessionId: response.registrationSessionId,
        registrationType: registrationType || 'simple',
        entityType: entityType || '',
        email: response.otpDelivery || formData.email
      }).toString();

      navigate(`${OTP}?${query}`);
    } catch (error) {
      setSubmitError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Healthcare Provider specific form
  const renderHealthcareProviderForm = () => (
    <>
      {/* Account Information */}
      <div className="mb-4">
        <SectionHeader 
          iconPath="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z M19.5 19.5C19.5 18.1193 19.1242 16.7914 18.427 15.6518C17.7298 14.5122 16.7456 13.6037 15.6142 13.0386C14.4828 12.4735 13.2656 12.2724 12.0958 12.454C10.926 12.6356 9.87439 13.1873 9.05 14.0114C8.22561 14.8355 7.67395 15.8871 7.49235 17.0569C7.31075 18.2267 7.51186 19.4439 8.07696 20.5753C8.64206 21.7067 9.48341 22.691 10.5259 23.3882C11.5684 24.0854 12.8963 24.5 14.27 24.5C15.6577 24.5 16.9856 24.0854 18.0281 23.3882C19.0706 22.691 19.5 21.7067 19.5 20.5753V19.5Z" 
          title="Account Information" 
        />
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label className="d-flex align-items-center">Email <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="HCP.email@example.com" isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="password">
              <Form.Label className="d-flex align-items-center">Password <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter email password" isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Administrator Information */}
      <div className="mb-4">
        <SectionHeader 
          iconPath="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z M19.5 19.5C19.5 18.1193 19.1242 16.7914 18.427 15.6518C17.7298 14.5122 16.7456 13.6037 15.6142 13.0386C14.4828 12.4735 13.2656 12.2724 12.0958 12.454C10.926 12.6356 9.87439 13.1873 9.05 14.0114C8.22561 14.8355 7.67395 15.8871 7.49235 17.0569C7.31075 18.2267 7.51186 19.4439 8.07696 20.5753C8.64206 21.7067 9.48341 22.691 10.5259 23.3882C11.5684 24.0854 12.8963 24.5 14.277 24.5C15.6577 24.5 16.9856 24.0854 18.0281 23.3882C19.0706 22.691 19.5 21.7067 19.5 20.5753V19.5Z" 
          title="Administrator Information" 
        />
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="firstName">
              <Form.Label className="d-flex align-items-center">First name <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" isInvalid={!!errors.firstName} />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="middleName">
              <Form.Label className="d-flex align-items-center">Middle name <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Enter your middle name" isInvalid={!!errors.middleName} />
              <Form.Control.Feedback type="invalid">{errors.middleName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="lastName">
              <Form.Label className="d-flex align-items-center">surname <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your surname" isInvalid={!!errors.lastName} />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="dateOfBirth">
              <Form.Label className="d-flex align-items-center">Date of Birth <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} isInvalid={!!errors.dateOfBirth} />
              <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="contactPhone">
              <Form.Label className="d-flex align-items-center">Contact Phone <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="+1 (555) 123-4567" isInvalid={!!errors.contactPhone} />
              <Form.Control.Feedback type="invalid">{errors.contactPhone}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="nationalId">
              <Form.Label className="d-flex align-items-center">National ID <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="nationalId" value={formData.nationalId} onChange={handleChange} placeholder="Enter national ID" isInvalid={!!errors.nationalId} />
              <Form.Control.Feedback type="invalid">{errors.nationalId}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group controlId="gender">
              <Form.Label className="d-flex align-items-center">Gender <span className="text-danger ms-1">*</span></Form.Label>
              <div className="d-flex">
                <Form.Check type="radio" label="Male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} className="me-3" />
                <Form.Check type="radio" label="Female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
              </div>
              {errors.gender && <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>{errors.gender}</div>}
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Professional Information */}
      <div className="mb-4">
        <SectionHeader 
          iconPath="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L13 2Z M13 2L18 8H13V2Z" 
          title="Professional Information" 
        />
        <Row>
          <Col md={6}>
            <Form.Group controlId="medicalLicenseNumber">
              <Form.Label className="d-flex align-items-center">Medical license number <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="medicalLicenseNumber" value={formData.medicalLicenseNumber} onChange={handleChange} placeholder="Enter medical license number" isInvalid={!!errors.medicalLicenseNumber} />
              <Form.Control.Feedback type="invalid">{errors.medicalLicenseNumber}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="specialization">
              <Form.Label className="d-flex align-items-center">Specialization <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Select name="specialization" value={formData.specialization} onChange={handleChange} isInvalid={!!errors.specialization}>
                <option value="">Select specialization</option>
                <option value="general">General Practice</option>
                <option value="cardiology">Cardiology</option>
                <option value="neurology">Neurology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="surgery">Surgery</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.specialization}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Workplace Information */}
      <div className="mb-4">
        <SectionHeader 
          iconPath="M12 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V12C20 11.4696 19.7893 10.9609 19.4142 10.5858C19.0391 10.2107 18.5304 10 18 10H6C5.46957 10 4.96086 10.2107 4.58579 10.5858C4.21071 10.9609 4 11.4696 4 12V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H12Z M4 10V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V10M4 10L12 2M20 10L12 2" 
          title="Workplace Information" 
        />
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="workplaceName">
              <Form.Label className="d-flex align-items-center">Workplace Name <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="workplaceName" value={formData.workplaceName} onChange={handleChange} placeholder="Enter workplace name" isInvalid={!!errors.workplaceName} />
              <Form.Control.Feedback type="invalid">{errors.workplaceName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="workplaceAddress">
              <Form.Label className="d-flex align-items-center">Workplace Address <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="workplaceAddress" value={formData.workplaceAddress} onChange={handleChange} placeholder="Enter full workplace address" isInvalid={!!errors.workplaceAddress} />
              <Form.Control.Feedback type="invalid">{errors.workplaceAddress}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <DocumentUpload 
              label="Workplace Logo" 
              required={false} 
              maxSizeMB={5} 
              name="workplaceLogo" 
              value={formData.workplaceLogo} 
              onChange={handleChange} 
              error={errors.workplaceLogo} 
            />
          </Col>
        </Row>
      </div>

      {/* Required Documents */}
      <div className="mb-4">
        <SectionHeader 
          iconPath="M12 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V8C20 7.46957 19.7893 6.96086 19.4142 6.58579C19.0391 6.21071 18.5304 6 18 6H12V18Z M6 18H12V6H6C5.46957 6 4.96086 6.21071 4.58579 6.58579C4.21071 6.96086 4 7.46957 4 8V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18Z M12 18V6" 
          title="Required Documents" 
        />
        <Row className="mb-3">
          <Col md={6}>
            <DocumentUpload 
              label="National ID (Front)" 
              required={true} 
              maxSizeMB={5} 
              name="nationalIdFront" 
              value={formData.nationalIdFront} 
              onChange={handleChange} 
              error={errors.nationalIdFront} 
            />
          </Col>
          <Col md={6}>
            <DocumentUpload 
              label="National ID (Back)" 
              required={true} 
              maxSizeMB={5} 
              name="nationalIdBack" 
              value={formData.nationalIdBack} 
              onChange={handleChange} 
              error={errors.nationalIdBack} 
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <DocumentUpload 
              label="Medical license document" 
              required={true} 
              name="medicalLicenseDoc" 
              value={formData.medicalLicenseDoc} 
              onChange={handleChange} 
              error={errors.medicalLicenseDoc} 
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <DocumentUpload 
              label="Workplace document" 
              required={true} 
              name="workplaceDoc" 
              value={formData.workplaceDoc} 
              onChange={handleChange} 
              error={errors.workplaceDoc} 
            />
          </Col>
        </Row>
      </div>
    </>
  );

  // Render Simple registration form (Lab/Imaging)
  const renderSimpleForm = () => (
    <>
      {/* Center Information */}
      <div className="mb-4">
        <SectionHeader 
          iconPath="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z M19.5 19.5C19.5 18.1193 19.1242 16.7914 18.427 15.6518C17.7298 14.5122 16.7456 13.6037 15.6142 13.0386C14.4828 12.4735 13.2656 12.2724 12.0958 12.454C10.926 12.6356 9.87439 13.1873 9.05 14.0114C8.22561 14.8355 7.67395 15.8871 7.49235 17.0569C7.31075 18.2267 7.51186 19.4439 8.07696 20.5753C8.64206 21.7067 9.48341 22.691 10.5259 23.3882C11.5684 24.0854 12.8963 24.5 14.27 24.5C15.6577 24.5 16.9856 24.0854 18.0281 23.3882C19.0706 22.691 19.5 21.7067 19.5 20.5753V19.5Z" 
          title="Center Information" 
        />
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="centerName">
              <Form.Label className="d-flex align-items-center">Center name <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="centerName" value={formData.centerName} onChange={handleChange} placeholder={`Enter ${entityType.toLowerCase()} center name`} isInvalid={!!errors.centerName} />
              <Form.Control.Feedback type="invalid">{errors.centerName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="accreditationNumber">
              <Form.Label className="d-flex align-items-center">National/Commercial Registration or Accreditation Number <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="accreditationNumber" value={formData.accreditationNumber} onChange={handleChange} placeholder="Enter Registration or Accreditation Number" isInvalid={!!errors.accreditationNumber} />
              <Form.Control.Feedback type="invalid">{errors.accreditationNumber}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="address">
              <Form.Label className="d-flex align-items-center">Address <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter complete address" isInvalid={!!errors.address} />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Administrator Information */}
      <div className="mb-4">
        <SectionHeader 
          iconPath="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z M19.5 19.5C19.5 18.1193 19.1242 16.7914 18.427 15.6518C17.7298 14.5122 16.7456 13.6037 15.6142 13.0386C14.4828 12.4735 13.2656 12.2724 12.0958 12.454C10.926 12.6356 9.87439 13.1873 9.05 14.0114C8.22561 14.8355 7.67395 15.8871 7.49235 17.0569C7.31075 18.2267 7.51186 19.4439 8.07696 20.5753C8.64206 21.7067 9.48341 22.691 10.5259 23.3882C11.5684 24.0854 12.8963 24.5 14.277 24.5C15.6577 24.5 16.9856 24.0854 18.0281 23.3882C19.0706 22.691 19.5 21.7067 19.5 20.5753V19.5Z" 
          title="Administrator Information" 
        />
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="fullName">
              <Form.Label className="d-flex align-items-center">Full name <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter administrator full name" isInvalid={!!errors.fullName} />
              <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label className="d-flex align-items-center">Email <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder={`${entityType.toLowerCase()}.center@example.com`} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="password">
              <Form.Label className="d-flex align-items-center">Password <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter email password" isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="contactPhone">
              <Form.Label className="d-flex align-items-center">Contact Phone <span className="text-danger ms-1">*</span></Form.Label>
              <Form.Control type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="+1 (555) 123-4567" isInvalid={!!errors.contactPhone} />
              <Form.Control.Feedback type="invalid">{errors.contactPhone}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Required Documents */}
      <div className="mb-4">
        <SectionHeader 
          iconPath="M12 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V8C20 7.46957 19.7893 6.96086 19.4142 6.58579C19.0391 6.21071 18.5304 6 18 6H12V18Z M6 18H12V6H6C5.46957 6 4.96086 6.21071 4.58579 6.58579C4.21071 6.96086 4 7.46957 4 8V16C4 16.5304 4.21071 17.0391 4.58579 17.4142C4.96086 17.7893 5.46957 18 6 18Z M12 18V6" 
          title="Required Documents" 
        />
        
        {/* Required Documents */}
        {requiredDocuments.map((doc, index) => (
          <DocumentUpload 
            key={index}
            label={doc.label} 
            required={true} 
            name={doc.name} 
            value={formData[doc.name]} 
            onChange={handleChange} 
            error={errors[doc.name]} 
          />
        ))}
        
        {/* Optional Documents */}
        {optionalDocuments.map((doc, index) => (
          <DocumentUpload 
            key={index}
            label={doc.label} 
            required={false} 
            name={doc.name} 
            value={formData[doc.name]} 
            onChange={handleChange} 
            error={errors[doc.name]} 
          />
        ))}
      </div>
    </>
  );

  return (
    <div className="min-vh-100 min-vw-100 d-flex flex-column" style={{ backgroundColor: '#e6f7ff' }}>
      <Container className="mt-3" style={{ maxWidth: '900px' }}>
        <div className="text-center mb-3">
          <h1 className="mb-1" style={{ fontWeight: 700, fontSize: '1.8rem' }}>Sijill Medical Platform</h1>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>{subtitle}</p>
        </div>

        <Card className="rounded-4 p-4" style={{ backgroundColor: 'white', border: 'none' }}>
          <BackButton />

          <div className="mb-4">
            <h3 className="mb-1" style={{ fontWeight: 700, fontSize: '1.5rem' }}>{title}</h3>
            <p className="text-muted">Please Complete all mandatory fields marked with *</p>
          </div>

          <Form onSubmit={handleSubmit}>
            {submitError && <Alert variant="danger">{submitError}</Alert>}
            {registrationType === 'healthcare-provider' ? renderHealthcareProviderForm() : renderSimpleForm()}
            
            <RegistrationProcess />
            <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} text="Submit Registration" 
            />
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default RegistrationForm;
