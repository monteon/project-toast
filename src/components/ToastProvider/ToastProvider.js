import React from 'react';
import useKeydown from '../../hooks/useKeydown';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toastList, setToastList] = React.useState([]);
  const handleEscape = React.useCallback(() => {
    setToastList([]);
  }, []);

  useKeydown('Escape', handleEscape);

  function createToast(message, variant) {
    const newToast = {
      id: crypto.randomUUID(),
      variant: variant,
      message: message,
    };

    setToastList([...toastList, newToast]);
  }

  function dismissToast(id) {
    const newList = toastList.filter((toast) => toast.id !== id);
    setToastList(newList);
  }

  return (
    <ToastContext.Provider
      value={{
        toastList,
        createToast,
        dismissToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
