import { ArrowUpRight, MapPin, BriefcaseBusiness } from "lucide-react";
import { Link } from "react-router-dom";
import type { Job } from "../data/jobs";

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="job-card">
      <div className="job-card-topline">
        <span className="eyebrow">{job.category}</span>
        <span className="job-index">/ 0{(job.id.length % 4) + 1}</span>
      </div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <div className="job-meta">
        <span>
          <BriefcaseBusiness size={15} aria-hidden="true" />
          {job.type}
        </span>
        <span>
          <MapPin size={15} aria-hidden="true" />
          {job.location}
        </span>
      </div>
      <Link className="text-link" to={`/apply/${job.id}`}>
        View role <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
