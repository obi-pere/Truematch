import { useEffect } from 'react';

/**
 * Sets a CSS custom property `--vh` on the document root equal to 1% of the
 * *actual* visible viewport height (`window.innerHeight`).
 *
 * On mobile browsers the address bar shrinks/grows and `100vh` does NOT
 * update, but `window.innerHeight` does. Listening to the `resize` event
 * (and `visualViewport.resize` where available) keeps the value in sync.
 *
 * Usage in CSS / Tailwind:  height: calc(var(--vh, 1vh) * 100);
 */
export const useViewportHeight = () => {
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`,
      );
    };

    setVh();

    window.addEventListener('resize', setVh);
    window.visualViewport?.addEventListener('resize', setVh);

    return () => {
      window.removeEventListener('resize', setVh);
      window.visualViewport?.removeEventListener('resize', setVh);
    };
  }, []);
};
