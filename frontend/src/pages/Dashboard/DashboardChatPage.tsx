import { PaperPlaneTilt, Paperclip } from '@phosphor-icons/react';
import { FormEvent, useLayoutEffect, useRef, useState } from 'react';

const MAX_COMPOSER_HEIGHT = 112;

export const DashboardChatPage = () => {
  const [draft, setDraft] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = '0px';
    const nextHeight = Math.min(textarea.scrollHeight, MAX_COMPOSER_HEIGHT);
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > MAX_COMPOSER_HEIGHT ? 'auto' : 'hidden';
  }, [draft]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className="flex h-full min-h-0 flex-col">
      <header className="border-b border-white/10">
        <div className="px-3 py-3">
          <h2 className="flex items-center gap-2.5 text-base font-semibold text-zinc-100">
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=advisor"
              alt="Advisor avatar"
              className="h-8 w-8 rounded-full bg-dark-card"
            />
            <span>Sarah Morgan</span>
          </h2>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-6">
        <div className="flex min-h-full flex-col justify-end gap-4">
          <div className="flex items-start gap-3">
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=advisor"
              alt="Advisor avatar"
              className="mt-6 h-9 w-9 flex-shrink-0 rounded-full bg-dark-card"
            />
            <div className="max-w-[86%]">
              <p className="mb-1.5 text-sm font-medium text-white">Advisor</p>
              <div className="rounded-2xl rounded-tl-md bg-zinc-700 px-4 py-3 text-sm text-zinc-100">
                Hi! I reviewed your application details and can help you improve your profile today.
                <p className="mt-1 text-right text-[10px] leading-none text-zinc-400">10:30 AM</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-[86%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-3 text-sm text-white">
              Great, please guide me on the next steps for my university shortlist.
              <p className="mt-1 text-right text-[10px] leading-none text-white/60">10:32 AM</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-3 py-3">
        <form onSubmit={handleSubmit} className="relative">
          <input id="chat-file-upload" type="file" className="sr-only" />

          <textarea
            ref={textareaRef}
            rows={1}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type your message..."
            className="min-h-11 w-full resize-none rounded-2xl bg-dark-surface py-3 pl-12 pr-12 text-sm leading-6 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            style={{ maxHeight: `${MAX_COMPOSER_HEIGHT}px` }}
          />

          <label
            htmlFor="chat-file-upload"
            className="absolute bottom-2 left-2 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-300 transition-colors hover:text-white"
            aria-label="Upload file"
          >
            <Paperclip size={18} weight="bold" />
          </label>

          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim()}
            className="absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-300 transition-colors hover:text-white disabled:text-zinc-600"
          >
            <PaperPlaneTilt size={18} weight="fill" />
          </button>
        </form>
      </div>
    </section>
  );
};
