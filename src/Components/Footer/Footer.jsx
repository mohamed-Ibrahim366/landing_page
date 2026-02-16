import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Typography Styles based on the images
  const serifStyle = { 
    fontFamily: "'Merriweather', serif", 
    fontWeight: "400" 
  };
  
  const sansLightStyle = { 
    fontFamily: "'Inter', sans-serif", 
    fontWeight: "300", 
    fontSize: "0.9rem",
    lineHeight: "1.8"
  };

  return (
    <footer className="py-5 text-white" style={{ backgroundColor: "#060b1a" }}>
      <Container>
        <Row className="gy-4">
          {/* Brand/Logo Section */}
          <Col lg={7} md={12}>
            <div className="d-flex align-items-center mb-4">
              <div 
                className="d-flex align-items-center justify-content-center rounded-2 border border-primary border-2 me-3"
                style={{ width: "42px", height: "42px" }}
              >
                <i className="bi bi-shield-check text-primary fs-4"></i>
              </div>
              <h2 className="mb-0 text-white" style={serifStyle}>Sijill</h2>
            </div>
            <p className="text-white-50 mb-0" style={{ ...sansLightStyle, maxWidth: "420px" }}>
              Unified National Health Record System - Connecting patients, providers, 
              laboratories, and imaging centers for seamless healthcare delivery.
            </p>
          </Col>

          {/* Contact Details Section */}
          <Col lg={5} md={12}>
            <h4 className="mb-4 text-white" style={serifStyle}>Contact Information</h4>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center text-white-50" style={sansLightStyle}>
                <i className="bi bi-envelope me-3 fs-5 text-white"></i>
                <span>support@sijill.health.gov</span>
              </div>
              <div className="d-flex align-items-center text-white-50" style={sansLightStyle}>
                <i className="bi bi-telephone me-3 fs-5 text-white"></i>
                <span>+966 (800) 123-4567</span>
              </div>
              <div className="d-flex align-items-center text-white-50" style={sansLightStyle}>
                <i className="bi bi-geo-alt me-3 fs-5 text-white"></i>
                <span>National Health Authority</span>
              </div>
            </div>
          </Col>
        </Row>

        {/* Divider and Copyright */}
        <div className="mt-5 pt-4 border-top border-white border-opacity-10 text-center">
          <p className="text-white-50 mb-0" style={{ ...sansLightStyle, fontSize: "0.85rem" }}>
            © {currentYear} Sijill - Unified National Health Record System. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}