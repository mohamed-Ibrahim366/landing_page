import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import InfoCard from "./InfoCard";

export default function SectionThree() {
  const cards = [
    { icon: "🔒", title: "End-to-End Data Encryption", description: "All data is encrypted both in transit and at rest using industry-standard AES-256 encryption protocols." },
    { icon: "🛡️", title: "Multi-Factor Identity Verification", description: "Advanced authentication mechanisms including OTP verification ensure only authorized entities can access the system." },
    { icon: "📄", title: "Regulatory Compliance", description: "Fully compliant with national health data protection regulations and international healthcare standards." },
    { icon: "🔔", title: "Complete Access Logs & Accountability", description: "Immutable audit trails record every system interaction, ensuring transparency and forensic capability." },
  ];

  return (
    <section className="section-three py-5 bg-light">
      <Container>
        {/* Header Section */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6">Trust & Security</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Your security and privacy are our highest priorities
          </p>
        </div>

        {/* Info Cards Grid */}
        <Row>
          {cards.map((card, index) => (
            <InfoCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </Row>

        {/* Bottom Highlight Card */}
        <Row className="justify-content-center mt-4">
          <Col lg={10}>
            <Card className="border shadow-sm p-4 text-center rounded-4 bg-white">
              <div className="display-4 mb-2">🛡️</div>
              <Card.Title className="fw-bold">Certified & Secure</Card.Title>
              <Card.Text className="text-muted px-md-5">
                Sijill adheres to the highest standards of healthcare data security and
                privacy protection, ensuring your information is safe.
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}