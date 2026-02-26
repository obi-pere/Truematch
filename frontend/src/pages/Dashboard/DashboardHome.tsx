import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { ArrowRight } from '@phosphor-icons/react';

const summaryItems = [
  { label: 'Total Applications', value: 8 },
  { label: 'Applications In Progress', value: 3 },
  { label: 'Offers Received', value: 2 },
  { label: 'Pending Actions', value: 4 }
];

const recentApplications = [
  {
    id: 'app-001',
    universityName: 'University of Manchester',
    course: 'MSc Data Science',
    status: 'Under review'
  },
  {
    id: 'app-002',
    universityName: 'University of Leeds',
    course: 'MSc Business Analytics',
    status: 'Interview scheduled'
  },
  {
    id: 'app-003',
    universityName: 'University of Birmingham',
    course: 'MSc Cyber Security',
    status: 'Offer received'
  }
];

const nextActions = ['Upload Missing Document', 'Pay Deposit', 'Accept Offer', 'Complete Profile'];

const deadlines = [
  { label: 'Deposit Deadline', date: '15 Mar 2026' },
  { label: 'CAS Deadline', date: '22 Mar 2026' },
  { label: 'Intake Start Date', date: '28 Sep 2026' }
];

export const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="h-full overflow-y-auto px-3 py-5 sm:px-5">
      <div className="space-y-6">
        <section className="glass-border rounded-xl bg-dark-card p-6">
          <h2 className="text-xl font-semibold text-zinc-100">Welcome back, {user?.fullName ?? 'Applicant'}</h2>
          <p className="mt-2 text-sm text-zinc-400">Track your applications and next steps here.</p>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">Quick Summary</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {summaryItems.map((item) => (
              <article key={item.label} className="glass-border rounded-xl bg-dark-card p-5">
                <p className="text-sm text-zinc-400">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-zinc-100">{item.value}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-3">
          <section className="glass-border rounded-xl bg-dark-card p-5 xl:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">Recent Applications</h3>
            <ul className="mt-4 divide-y divide-white/10">
              {recentApplications.map((application) => (
                <li
                  key={application.id}
                  className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{application.universityName}</p>
                    <p className="mt-1 text-sm text-zinc-400">{application.course}</p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-300">{application.status}</p>
                  </div>

                  <Link
                    to={`/applications/${application.id}`}
                    className="inline-flex items-center gap-1 self-end text-sm font-medium text-brand-400 transition-colors hover:text-brand-300 sm:self-auto"
                  >
                    View
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 backdrop-blur-sm">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-red-300">Next Action Required</h3>
            <ul className="mt-4 space-y-1">
              {nextActions.map((action) => (
                <li key={action} className="py-1.5 text-sm text-red-300">
                  {action}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="glass-border rounded-xl bg-dark-card p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">Assigned Officer</h3>
            <div className="mt-4 flex flex-col items-end">
              <div className="flex w-full items-center gap-3">
                <div className="relative">
                  <img
                    src="https://api.dicebear.com/9.x/avataaars/svg?seed=sarah-morgan"
                    alt="Sarah Morgan avatar"
                    className="h-10 w-10 rounded-full bg-dark-surface"
                  />
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border border-dark-card bg-emerald-400" aria-hidden />
                </div>
                <p className="text-base font-semibold text-zinc-100">Sarah Morgan</p>
              </div>

              <Link
                to="/chat"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-400 transition-colors hover:text-brand-300"
              >
                Go to Chat
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </section>

          <section className="glass-border rounded-xl bg-dark-card p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-300">Important Deadlines</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {deadlines.map((deadline) => (
                <article key={deadline.label} className="rounded-xl border border-white/10 bg-dark-surface p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{deadline.label}</p>
                  <p className="mt-2 text-sm font-semibold text-zinc-100">{deadline.date}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
