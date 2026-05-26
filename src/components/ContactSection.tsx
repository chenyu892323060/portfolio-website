import { MagneticButton } from './MagneticButton';

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <h2>Let’s create refined digital experiences.</h2>
      <p>Available for senior UI design, visual design, and product experience opportunities.</p>
      <div>
        <MagneticButton className="contact-pill">Contact Me</MagneticButton>
        <MagneticButton className="contact-pill">Download Resume</MagneticButton>
      </div>
    </section>
  );
}
