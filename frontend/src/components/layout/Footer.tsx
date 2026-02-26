export const Footer = () => {
  return (
    <footer className="mt-12 glass-border-t bg-dark-bg">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 text-sm text-zinc-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Truematch Education Agency
      </div>
    </footer>
  );
};
