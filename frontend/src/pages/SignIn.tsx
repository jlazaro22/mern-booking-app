import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

export type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      showToast({ message: 'Sign in successful!', type: 'SUCCESS' });
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Sign In</h2>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Email
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          type='email'
          {...register('email', { required: 'This field is required' })}
        />
        {errors.email && (
          <span className='text-red-500'>{errors.email.message}</span>
        )}
      </label>
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Password
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          type='password'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
        />
        {errors.password && (
          <span className='text-red-500'>{errors.password.message}</span>
        )}
      </label>
      <span className='flex items-center justify-between'>
        <span className='text-sm'>
          Not Registered?{' '}
          <Link className='underline' to='/register'>
            Create an account here
          </Link>
        </span>
        <button
          className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'
          type='submit'
        >
          Login
        </button>
      </span>
    </form>
  );
}
