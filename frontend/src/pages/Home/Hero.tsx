import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const typingBadgePrefixes = ['Study abroad, simplified', 'Work abroad, simplified'];
const TYPE_SPEED_MS = 85;
const DELETE_SPEED_MS = 55;
const PAUSE_AFTER_TYPING_MS = 1400;
const PAUSE_AFTER_DELETING_MS = 280;

export const Hero = () => {
  const [badgeTextIndex, setBadgeTextIndex] = useState(0);
  const [typedBadgeText, setTypedBadgeText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typingBadgePrefixes[badgeTextIndex];

    if (!isDeleting && typedBadgeText === currentWord) {
      const timeoutId = window.setTimeout(() => {
        setIsDeleting(true);
      }, PAUSE_AFTER_TYPING_MS);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    if (isDeleting && typedBadgeText.length === 0) {
      const timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setBadgeTextIndex((currentIndex) => (currentIndex + 1) % typingBadgePrefixes.length);
      }, PAUSE_AFTER_DELETING_MS);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    const timeoutId = window.setTimeout(() => {
      setTypedBadgeText(
        isDeleting
          ? currentWord.slice(0, typedBadgeText.length - 1)
          : currentWord.slice(0, typedBadgeText.length + 1)
      );
    }, isDeleting ? DELETE_SPEED_MS : TYPE_SPEED_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [badgeTextIndex, isDeleting, typedBadgeText]);

  return (
    <section className="relative overflow-hidden bg-dark-bg">
      {/* Gradient glow accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[85vh] w-full max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <span className="glass mb-8 inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-semibold tracking-wide text-brand-300">
          <span aria-live="polite" className="inline-flex min-w-[13.5rem] items-center justify-center text-center">
            {typedBadgeText}
            <span aria-hidden className="ml-0.5 inline-block h-3.5 w-px bg-brand-300/80 animate-pulse" />
          </span>
        </span>

        <h1 className="mx-auto max-w-4xl text-balance text-center text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Your trusted platform for{' '}
          <span className="text-gradient-brand">Africa&apos;s global learners</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-zinc-400 sm:text-lg">
          Start your application journey for schools in top destinations with a guided, secure, and fast process.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/apply">
            <Button className="px-8 py-3 text-sm">Start Your Application</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" className="px-8 py-3 text-sm">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
