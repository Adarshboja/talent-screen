import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { JobCard } from "../components/JobCard";
import { jobs } from "../data/jobs";

export function Jobs() {
  const [query, setQuery] = useState("");
  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) =>
        `${job.title} ${job.category}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <section className="jobs-page page-section">
      <div className="jobs-heading">
        <div>
          <p className="kicker">
            <span className="pulse-dot" /> Opportunities
          </p>
          <h1>
            Find work worth
            <br />
            <em>doing well.</em>
          </h1>
        </div>
        <p>
          Roles for curious people who want to make a meaningful contribution,
          with teams that value the same.
        </p>
      </div>
      <div className="jobs-toolbar">
        <span>{filteredJobs.length} open roles</span>
        <label className="search-field">
          <Search size={18} aria-hidden="true" />
          <span className="sr-only">Search roles</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or team"
          />
        </label>
      </div>
      <div className="jobs-grid">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {filteredJobs.length === 0 && (
        <div className="empty-state">
          <h2>No roles found.</h2>
          <p>Try a different search term.</p>
        </div>
      )}
    </section>
  );
}
