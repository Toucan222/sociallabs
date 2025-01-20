import React from 'react';
import './HeroSectionStyles.scss';

export default function HeroSection() {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title mb-2">Welcome to SocialPlug Labs</h1>

        <ul className="hero-bullets mb-2">
          <li>100+ Free Tools</li>
          <li>Instant AI Ideas</li>
          <li>Optional Login</li>
        </ul>

        <p className="hero-tagline mb-2">
          Supercharge your socials and boost creativity—no signups needed!
        </p>

        <button
          className="btn mt-1"
          onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
        >
          Explore the Tools
        </button>
      </div>
    </section>
  );
}
