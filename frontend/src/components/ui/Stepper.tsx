type Props = {
  steps: string[];
  currentStep: number;
};

export const Stepper = ({ steps, currentStep }: Props) => {
  return (
    <div className="flex items-center justify-center gap-3">
      {steps.map((step, index) => {
        const isActive = currentStep === index;
        const isCompleted = currentStep > index;

        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors ${
                isCompleted
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : isActive
                    ? 'border-brand-500 text-brand-400'
                    : 'border-white/10 text-zinc-500'
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-sm ${isActive ? 'font-medium text-white' : 'text-zinc-500'}`}>{step}</span>
            {index < steps.length - 1 ? <div className="h-px w-8 bg-white/10" /> : null}
          </div>
        );
      })}
    </div>
  );
};
