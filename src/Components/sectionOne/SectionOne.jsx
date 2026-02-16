import React from "react";
import { Link } from "react-router-dom";
import "./SectionOne.css";

export default function SectionOne() {
  return (
    <section className="section-one d-flex justify-content-center align-items-center text-center">
      <div className="container text-white d-flex flex-column align-items-center">

        {/* Logo Container */}
        <div className="logo-box bg-white rounded-4 p-3 mb-5">
          <img
            src="/src/assets/logo_light-removebg.png" 
            alt="Sijill Logo"
            className="img-fluid"
          />
        </div>

        {/* Headline: Merriweather Font */}
        <h1 className="main-headline mb-4">
          One Secure Record.<br />
          One trusted system.<br />
          Lifetime healthcare continuity.
        </h1>

        {/* Lead Description */}
        <p className="description mb-4">
          Sijill is a unified national electronic health record (EHR)
          system that securely connects patients, healthcare providers,
          laboratories, and imaging centers on a single platform.
        </p>

        {/* Frosted Glass Info Box */}
        <div className="info-box rounded-4 p-4 mb-5">
          <p className="mb-0 fw-semibold">
            The system enables authorized entities to access, upload, and review
            medical records (laboratory results, imaging studies, and clinical notes)
            with full patient consent, ensuring data privacy, security, and continuity
            of care.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center gap-3 mb-4 w-100">
          
           <Link
            to="/login"
            className="btn btn-login fw-bold "
          >
            Login
          </Link>

          <Link
            to="/registerType"
            className="btn btn-register fw-bold"
          >
            Register
          </Link>
        </div>

        {/* Footer Note */}
        <p className=" text-white">
          For healthcare providers, laboratories, and imaging centers
        </p>

      </div>
    </section>
  );
}