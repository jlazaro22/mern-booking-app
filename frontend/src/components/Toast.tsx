import { useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  let styles =
    'fixed top-4 right-4 z-50 p-4 rounded-md shadow-md text-white max-w-md';

  styles += type === 'SUCCESS' ? ' bg-green-600' : ' bg-red-600';

  return (
    <div className={styles}>
      <div className='flex justify-center items-center'>
        <span className='text-lg font-semibold'>{message}</span>
      </div>
    </div>
  );
}
