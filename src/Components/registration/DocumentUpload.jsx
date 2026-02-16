// src/components/registration/DocumentUpload.jsx
import React, { useRef } from 'react';

export const DocumentUpload = ({ 
  label, 
  required, 
  maxSizeMB = 10, 
  acceptTypes = "image/png,image/jpeg,application/pdf", 
  value, 
  onChange, 
  error, 
  name,
  isOptional = false
}) => {
  const fileRef = useRef(null);
  
  const handleClick = () => {
    fileRef.current?.click();
  };

  return (
    <div className="mb-4">
      <label className="d-flex align-items-center mb-2">
        {label} {required && <span className="text-danger ms-1">*</span>}
        {isOptional && <span className="text-muted ms-1">(Optional)</span>}
      </label>
      <div 
        className="border-2 border-dashed rounded-3 p-4 text-center cursor-pointer" 
        style={{ 
          borderColor: '#d1d1d1', 
          minHeight: '150px', 
          backgroundColor: '#f9f9f9' 
        }}
        onClick={handleClick}
      >
        <div className="d-flex align-items-center justify-content-center flex-column" style={{ height: '100%' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-2" style={{ color: '#666' }}>
            <path d="M7 16V10L12 15L17 10V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 4V15M12 15L17 10M12 15L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {value ? (
            <div className="text-center">
              <p className="mb-1 fw-medium">{value.name}</p>
              <p className="text-muted small">Click to change file</p>
            </div>
          ) : (
            <>
              <p className="mb-1">Click to upload PDF or Image</p>
              <p className="text-muted small">Max file size: {maxSizeMB}MB</p>
            </>
          )}
        </div>
            <input 
            type="file" 
            name={name}
            onChange={onChange}
            accept={acceptTypes}
            ref={fileRef}
            className="d-none"
            />
      </div>
      {error && <div className="text-danger mt-1" style={{ fontSize: '0.875rem' }}>{error}</div>}
    </div>
  );
};