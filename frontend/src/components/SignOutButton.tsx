import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

export default function SignOutButton() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      showToast({ message: 'Sign out!', type: 'SUCCESS' });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  function handleClick() {
    mutation.mutate();
  }

  return (
    <button
      className='text-blue-600 px-3 font-bold bg-white hover:bg-gray-100'
      onClick={handleClick}
    >
      Sign Out
    </button>
  );
}
