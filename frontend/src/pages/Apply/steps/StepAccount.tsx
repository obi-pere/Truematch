import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

const stepAccountSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

export type StepAccountValues = z.infer<typeof stepAccountSchema>;

type Props = {
  onSubmit: (data: StepAccountValues) => Promise<void>;
  loading: boolean;
};

export const StepAccount = ({ onSubmit, loading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<StepAccountValues>({
    resolver: zodResolver(stepAccountSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input id="fullName" label="Full Name" placeholder="Ada Okafor" error={errors.fullName?.message} {...register('fullName')} />
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="ada@example.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <div className="pt-2">
        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </form>
  );
};
