import React from "react";
import { Card, Col } from "react-bootstrap";

export default function InfoCard({ icon, title, description }) {
  return (
    <Col lg={6} md={12} className="mb-4">
      {/* - border-0: Removes the default border
          - shadow-sm: Adds the soft shadow from your design
          - h-100: Ensures cards in the same row have equal height
      */}
      <Card className="border-0 shadow-sm h-100 rounded-4 p-3">
        <Card.Body className="d-flex align-items-start">
          
          {/* Icon Container with light green background */}
          <div 
            className="d-flex align-items-center justify-content-center flex-shrink-0 rounded-3 me-4" 
            style={{ 
              width: "56px", 
              height: "56px", 
              backgroundColor: "#e6f9f0", // Very light green Bootstrap-friendly hex
              fontSize: "1.5rem"
            }}
          >
            {icon}
          </div>

          {/* Text Content */}
          <div>
            <Card.Title className="fw-bold mb-2 h5" style={{ color: "#212529" }}>
              {title}
            </Card.Title>
            <Card.Text className="text-muted" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
              {description}
            </Card.Text>
          </div>

        </Card.Body>
      </Card>
    </Col>
  );
}