import { createContext, useContext, useState, type ReactNode } from 'react';
import Toast from '../components/Toast';

type ToastMessage = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage);
        },
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }

  return context as AppContext;
};
