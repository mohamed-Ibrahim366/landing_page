import React from 'react';

export const RegistrationProcess = () => (
  <div className="mb-4 p-4 rounded-3" style={{ backgroundColor: '#f0f8ff' }}>
    <div className="d-flex align-items-start">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2 mt-1" style={{ color: '#1976d2' }}>
        <path d="M12 18C13.1046 18 14 17.1046 14 16C14 14.8954 13.1046 14 12 14C10.8954 14 10 14.8954 10 16C10 17.1046 10.8954 18 12 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 2C16.9706 2 21 6.02944 21 11C21 15.9706 16.9706 20 12 20C7.02944 20 3 15.9706 3 11C3 6.02944 7.02944 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div>
        <h5 className="mb-2" style={{ fontWeight: 'bold' }}>Registration Process:</h5>
        <ul className="pl-3 mb-0" style={{ fontSize: '0.9rem', color: '#4a4a4a' }}>
          <li>An OTP will be sent to your email for verification</li>
          <li>Your registration will be reviewed by an authorized approver</li>
          <li>You will be notified of approval or rejection via email</li>
        </ul>
      </div>
    </div>
  </div>
);
