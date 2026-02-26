import { CaretRight } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { useViewportHeight } from '../../hooks/useViewportHeight';
import { DashboardChatPage } from '../Dashboard/DashboardChatPage';

export const ChatPage = () => {
  useViewportHeight();

  return (
    <div className="flex flex-col overflow-hidden bg-dark-bg" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      <nav aria-label="Breadcrumb" className="border-b border-white/10 px-4 py-2.5 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-1.5 text-xs text-zinc-400">
          <li>
            <Link
              to="/"
              className="rounded px-1 py-0.5 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
            >
              Home
            </Link>
          </li>
          <li aria-hidden className="text-zinc-600">
            <CaretRight size={10} weight="bold" />
          </li>
          <li>
            <Link
              to="/dashboard"
              className="rounded px-1 py-0.5 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500"
            >
              Dashboard
            </Link>
          </li>
          <li aria-hidden className="text-zinc-600">
            <CaretRight size={10} weight="bold" />
          </li>
          <li aria-current="page" className="font-medium text-zinc-100">
            Chat
          </li>
        </ol>
      </nav>

      <main className="flex min-h-0 flex-1 overflow-hidden">
        <section className="h-full w-full">
          <DashboardChatPage />
        </section>
      </main>
    </div>
  );
};
