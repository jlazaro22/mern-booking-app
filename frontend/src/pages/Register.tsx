import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: () => {
      showToast({ message: 'Registration successful!', type: 'SUCCESS' });
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <form className='flex flex-col gap-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Create an account</h2>
      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          First Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('firstName', { required: 'This field is required' })}
          />
          {errors.firstName && (
            <span className='text-red-500'>{errors.firstName.message}</span>
          )}
        </label>
        <label className='text-gray-700 text-sm font-bold flex-1'>
          Last Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('lastName', { required: 'This field is required' })}
          />
          {errors.lastName && (
            <span className='text-red-500'>{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className='text-gray-700 text-sm font-bold flex-1'>
        Confirm Password
        <input
          className='border rounded w-full py-1 px-2 font-normal'
          type='password'
          {...register('confirmPassword', {
            validate: (value) => {
              if (!value) {
                return 'This field is required';
              } else if (value !== watch('password')) {
                return 'Your passwords do not match';
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className='text-red-500'>{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          className='bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'
          type='submit'
        >
          Create Account
        </button>
      </span>
    </form>
  );
}
