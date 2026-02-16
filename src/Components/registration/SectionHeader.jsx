import React from 'react';

export const SectionHeader = ({ iconPath, title }) => (
  <div className="mb-3" style={{ 
    fontWeight: 'bold', 
    borderBottom: '1px solid #eee', 
    paddingBottom: '8px' 
  }}>
    <div className="d-flex align-items-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2" style={{ color: '#1976d2' }}>
        <path d={iconPath} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
      <h5>{title}</h5>
    </div>
  </div>
);
