import { ArrowRight, Mail, ScanSearch, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const steps: {
  number: string;
  icon: React.ElementType;
  title: string;
  text: string;
}[] = [
  {
    number: "01",
    icon: Upload,
    title: "Apply",
    text: "Share your details and the role you are excited about.",
  },
  {
    number: "02",
    icon: ScanSearch,
    title: "AI evaluates",
    text: "Your resume is reviewed against the role with care and consistency.",
  },
  {
    number: "03",
    icon: Mail,
    title: "Get your result",
    text: "A clear screening result arrives directly in your inbox.",
  },
];

export function Home() {
  return (
    <>
      <section className="hero page-section">
        <div className="hero-copy">
          <p className="kicker">
            <span className="pulse-dot" /> The clearer way to get hired
          </p>
          <h1>
            Make your next move <em>count.</em>
          </h1>
          <p className="hero-description">
            TalentScreen brings a more thoughtful, transparent rhythm to modern
            hiring. Find the role that fits, apply in minutes, and know where
            you stand.
          </p>
          <div className="hero-actions">
            <Link to="/jobs">
              <Button showArrow>Explore open roles</Button>
            </Link>
            <Link className="secondary-link" to="/apply">
              Submit your resume <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="hero-aside" aria-label="TalentScreen overview">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-note">
            <span className="note-label">TalentScreen / 01</span>
            <strong>
              Good work
              <br />
              <span>deserves a clear</span>
              <br />
              first step.
            </strong>
            <span className="note-rule" />
            <span className="note-small">Human intent, AI clarity.</span>
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <span>Built for people who care about the work</span>
        <span className="proof-line" />
        <span>Simple by design</span>
        <span className="proof-line" />
        <span>Clear from the start</span>
      </section>

      <section className="workflow page-section">
        <div className="section-intro">
          <p className="eyebrow">The process</p>
          <h2>
            One thoughtful
            <br />
            <em>step at a time.</em>
          </h2>
          <p>
            We keep the application experience focused, so you can focus on
            telling your story.
          </p>
        </div>
        <div className="steps">
          {steps.map(({ number, icon: Icon, title, text }) => (
            <article className="step" key={number}>
              <div className="step-top">
                <span>{number}</span>
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta page-section">
        <div>
          <p className="eyebrow">Your next chapter</p>
          <h2>
            Start with the role
            <br />
            <em>that feels right.</em>
          </h2>
        </div>
        <Link to="/jobs">
          <Button showArrow>See open roles</Button>
        </Link>
      </section>
    </>
  );
}
