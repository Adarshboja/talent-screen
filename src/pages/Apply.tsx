import { useState } from "react";
import { ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { FileUploadZone } from "../components/FileUploadZone";
import { StatusBanner } from "../components/StatusBanner";
import { jobs } from "../data/jobs";
import { submitApplication } from "../lib/api";

type FormValues = { name: string; email: string; role: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Apply() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const selectedJob = jobs.find((job) => job.id === jobId);
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    role: selectedJob?.title ?? "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "uploading" | "processing" | "success" | "error"
  >("idle");

  const update = (key: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };
  const validate = () => {
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2)
      nextErrors.name = "Please enter your full name.";
    if (!emailPattern.test(values.email))
      nextErrors.email = "Please enter a valid email address.";
    if (!values.role) nextErrors.role = "Please select a role.";
    if (!file) setFileError("Please add your PDF resume.");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0 && Boolean(file);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !validate() ||
      !file ||
      status === "uploading" ||
      status === "processing"
    )
      return;
    setStatus("uploading");
    try {
      await submitApplication({ ...values, file });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  const reset = () => {
    setStatus("idle");
    setFile(null);
    setValues({ name: "", email: "", role: selectedJob?.title ?? "" });
    setErrors({});
    setFileError("");
  };

  return (
    <section className="apply-page page-section">
      <div className="apply-bubbles" aria-hidden="true">
        <span className="bubble bubble-one" />
        <span className="bubble bubble-two" />
        <span className="bubble bubble-three" />
        <span className="bubble bubble-four" />
        <span className="bubble bubble-five" />
      </div>
      <div className="apply-intro">
        <Link className="back-link" to="/jobs">
          <ArrowLeft size={16} /> Back to open roles
        </Link>
        <p className="kicker">
          <span className="pulse-dot" /> Make it yours
        </p>
        <h1>
          Put your best
          <br />
          <em>work forward.</em>
        </h1>
        <p>
          Tell us a little about yourself. Our screening process is designed to
          help your experience come through clearly.
        </p>
        <div className="privacy-note">
          <ShieldCheck size={18} />
          <span>Your information is only used for this application.</span>
        </div>
      </div>
      <div className="form-panel">
        {status === "success" || status === "error" ? (
          <div className="result-state">
            <StatusBanner status={status} />
            <Button
              type="button"
              onClick={status === "success" ? () => navigate("/jobs") : reset}
              showArrow
            >
              {status === "success" ? "View open roles" : "Try again"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-header">
              <span className="form-step">Application / 01</span>
              <span className="required-note">* Required</span>
              <h2>Let’s get acquainted.</h2>
              <p>All fields are required unless marked otherwise.</p>
            </div>
            <div className="form-fields">
              <label className="field">
                <span>
                  Full name <b>*</b>
                </span>
                <input
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  placeholder="Alex Morgan"
                />
                {errors.name && (
                  <small className="field-error" role="alert">
                    {errors.name}
                  </small>
                )}
              </label>
              <label className="field">
                <span>
                  Email address <b>*</b>
                </span>
                <input
                  type="email"
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  placeholder="alex@example.com"
                />
                {errors.email && (
                  <small className="field-error" role="alert">
                    {errors.email}
                  </small>
                )}
              </label>
              <label className="field">
                <span>
                  Role you’re applying for <b>*</b>
                </span>
                <select
                  value={values.role}
                  onChange={(event) => update("role", event.target.value)}
                  aria-invalid={Boolean(errors.role)}
                >
                  <option value="">Select a role</option>
                  {jobs.map((job) => (
                    <option key={job.id} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <small className="field-error" role="alert">
                    {errors.role}
                  </small>
                )}
              </label>
              <div className="field">
                <span>
                  Resume <b>*</b>
                </span>
                <FileUploadZone
                  file={file}
                  error={fileError}
                  onChange={(nextFile, error) => {
                    setFile(nextFile);
                    setFileError(error ?? "");
                  }}
                />
              </div>
            </div>
            {status === "uploading" || status === "processing" ? (
              <StatusBanner status={status} />
            ) : (
              <div className="submit-row">
                <p>
                  <Check size={15} /> PDF format, up to 5 MB
                </p>
                <Button type="submit" showArrow>
                  Submit application
                </Button>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
