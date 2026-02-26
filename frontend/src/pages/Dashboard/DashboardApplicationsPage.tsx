import { Link } from 'react-router-dom';

const APPLICATION = {
  id: 'app-001',
  universityName: 'University of Manchester',
  courseName: 'MSc Data Science',
  intake: 'September 2026',
  status: 'Under review',
  createdAt: '2026-02-02T00:00:00.000Z'
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(value));

export const DashboardApplicationsPage = () => {
  const createdDate = formatDate(APPLICATION.createdAt);

  return (
    <section className="flex h-full min-h-0 flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto px-3 pt-5 pb-3">
        <h2 className="text-base font-semibold text-zinc-100">My applications</h2>

        <Link
          to={`/applications/${APPLICATION.id}`}
          className="mt-4 block max-w-2xl rounded-xl border border-white/10 bg-dark-card p-5 transition-colors hover:border-white/20 sm:p-6"
        >
          <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-300">
            {APPLICATION.status}
          </span>

          <div>
            <h3 className="mt-3 text-lg font-semibold text-zinc-100">{APPLICATION.universityName}</h3>
            <p className="mt-1 text-sm text-zinc-400">{APPLICATION.courseName}</p>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="text-sm font-medium">
              <span className="text-zinc-500">INTAKE:</span> <span className="text-zinc-200">{APPLICATION.intake}</span>
            </p>
            <p className="mt-2 text-sm font-medium">
              <span className="text-zinc-500">CREATED:</span> <span className="text-zinc-200">{createdDate}</span>
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};
