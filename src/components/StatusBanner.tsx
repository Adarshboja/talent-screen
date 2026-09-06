import { CheckCircle2, LoaderCircle, TriangleAlert } from "lucide-react";

export function StatusBanner({
  status,
}: {
  status: "uploading" | "processing" | "success" | "error";
}) {
  if (status === "success")
    return (
      <div className="status-banner success" role="status">
        <CheckCircle2 size={22} />
        <div>
          <strong>Application Submitted Successfully</strong>
          <span>
            Thank you for applying. Your resume has been submitted for
            screening. You will receive an email with your screening result.
          </span>
        </div>
      </div>
    );
  if (status === "error")
    return (
      <div className="status-banner error" role="alert">
        <TriangleAlert size={22} />
        <div>
          <strong>Something went wrong. Please try again.</strong>
          <span>
            Your application was not submitted. Check your connection and try
            again.
          </span>
        </div>
      </div>
    );
  return (
    <div className="status-banner waiting" role="status" aria-live="polite">
      <LoaderCircle className="spin" size={22} />
      <div>
        <strong>
          {status === "uploading"
            ? "Uploading your resume..."
            : "Your resume is being evaluated..."}
        </strong>
        <span>
          This can take up to 90 seconds. Please keep this window open.
        </span>
      </div>
    </div>
  );
}
