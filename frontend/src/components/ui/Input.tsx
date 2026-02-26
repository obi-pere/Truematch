import type { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = ({ label, id, error, className = '', ...props }: Props) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-300">
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-xl border border-white/40 bg-transparent px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:border-white/70 focus:ring-2 focus:ring-white/20 ${className}`}
        {...props}
      />
      {error ? <p className="mt-1 text-xs text-rose-400">{error}</p> : null}
    </div>
  );
};
