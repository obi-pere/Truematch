import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../components/layout/Footer';
import { Navbar } from '../../components/layout/Navbar';
import { Stepper } from '../../components/ui/Stepper';
import { useAuthStore } from '../../store/auth.store';
import { applicationService } from '../../services/application.service';
import { StepAccount, type StepAccountValues } from './steps/StepAccount';

const steps = ['Account Details'];

export const ApplyPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAccountSubmit = async (data: StepAccountValues) => {
    try {
      setSubmitting(true);
      setErrorMessage(null);
      await applicationService.submit(data);
      await useAuthStore.getState().bootstrapSession();
      navigate('/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (!error.response) {
          setErrorMessage('Cannot reach backend right now. Please ensure backend is running and try again.');
          return;
        }

        const responseData = error.response?.data as
          | { message?: string; errors?: Array<{ path?: string; message: string }> }
          | undefined;

        if (responseData?.errors?.length) {
          setErrorMessage(responseData.errors.map((item) => item.message).join(' '));
          return;
        }

        if (responseData?.message) {
          setErrorMessage(responseData.message);
          return;
        }
      }

      setErrorMessage('Unable to submit application right now. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-dark-bg">
      <Navbar />
      <main className="mx-auto flex flex-1 w-full max-w-xl flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="w-full space-y-8 rounded-2xl border border-white/40 bg-transparent p-6 sm:p-10">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Create your account</h1>
            <p className="text-sm text-zinc-400">Submit your application and we’ll automatically create your account.</p>
          </div>

          <Stepper steps={steps} currentStep={0} />

          <div className="transition-all duration-300 ease-out">
            <StepAccount onSubmit={handleAccountSubmit} loading={submitting} />
          </div>

          {errorMessage ? (
            <p className="rounded-lg bg-rose-500/10 px-4 py-2.5 text-center text-sm text-rose-400">
              {errorMessage}
            </p>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
};
