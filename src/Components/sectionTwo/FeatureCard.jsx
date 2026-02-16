import React from "react";

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="feature-card h-100">
        <div className="feature-icon">{icon}</div>
        <h5 className="fw-bold mt-3">{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  );
}
