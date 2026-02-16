import React from "react";
import "./SectionTwo.css";
import FeatureCard from "./FeatureCard";

export default function SectionTwo() {
  const features = [
    {
      icon: "🛡️",
      title: "Secure Medical Data Storage",
      description:
        "All medical records are encrypted and stored with enterprise-grade security, ensuring complete data protection and privacy.",
    },
    {
      icon: "🔒",
      title: "Role-Based Access Control",
      description:
        "Strict permissions ensure only authorized healthcare providers can access patient data, maintaining confidentiality and compliance.",
    },
    {
      icon: "✅",
      title: "Patient Consent & Approval",
      description:
        "Patients maintain full control over their health data, with explicit consent required for all access and sharing.",
    },
    {
      icon: "👁️",
      title: "Audit Logging & Traceability",
      description:
        "Complete audit trails track every access and modification, ensuring accountability and regulatory compliance.",
    },
    {
      icon: "🌐",
      title: "National-Level Interoperability",
      description:
        "Seamless integration across all healthcare entities nationwide, enabling coordinated and continuous care.",
    },
    {
      icon: "⚡",
      title: "Real-Time Data Access",
      description:
        "Authorized providers can instantly access up-to-date patient information, improving diagnosis and treatment decisions.",
    },

  ];

  return (
    <section className="section-two">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold section-two__title">System Features</h2>
          <p className="section-two__subtitle mx-auto">
            A comprehensive platform designed for secure, efficient, and
            integrated healthcare delivery
          </p>
        </div>

        {/* Features Grid */}
        <div className="row g-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
