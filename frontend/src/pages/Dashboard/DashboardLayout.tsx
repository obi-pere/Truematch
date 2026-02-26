import { Book, CaretRight, ChatCircle, House, SignOut, UserCircle } from '@phosphor-icons/react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useViewportHeight } from '../../hooks/useViewportHeight';

export const DashboardLayout = () => {
  useViewportHeight();
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isApplicationsRoute = pathname.startsWith('/dashboard/applications');
  const isProfileRoute = pathname.startsWith('/dashboard/profile');

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

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
          {isApplicationsRoute ? (
            <>
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
                My Applications
              </li>
            </>
          ) : isProfileRoute ? (
            <>
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
                Profile
              </li>
            </>
          ) : (
            <li aria-current="page" className="font-medium text-zinc-100">
              Dashboard
            </li>
          )}
        </ol>
      </nav>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-16 flex-col items-center border-r-2 border-white/10 bg-dark-card py-4">
          <nav className="flex flex-col items-center gap-1">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `group relative flex items-center justify-center rounded-lg p-3 transition-colors ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`
              }
              aria-label="Home"
            >
              <House size={28} weight="regular" />
            </NavLink>

            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `group relative flex items-center justify-center rounded-lg p-3 transition-colors ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`
              }
              aria-label="Chat"
            >
              <ChatCircle size={28} weight="regular" />
              <span className="absolute right-1.5 top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
                2
              </span>
            </NavLink>

            <NavLink
              to="/dashboard/applications"
              className={({ isActive }) =>
                `group relative flex items-center justify-center rounded-lg p-3 transition-colors ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`
              }
              aria-label="My applications"
            >
              <Book size={28} weight="regular" />
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `group relative flex items-center justify-center rounded-lg p-3 transition-colors ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-200'}`
              }
              aria-label="Profile"
            >
              <UserCircle size={28} weight="regular" />
            </NavLink>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto rounded-lg p-3 text-zinc-500 transition-colors hover:text-zinc-200"
            aria-label="Logout"
          >
            <SignOut size={28} weight="regular" />
          </button>
        </aside>

        <main className="flex min-h-0 flex-1 overflow-hidden">
          <section className="h-full w-full">
            <Outlet />
          </section>
        </main>
      </div>
    </div>
  );
};
