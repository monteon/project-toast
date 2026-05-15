import React, { useEffect } from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toastList, setToastList] = React.useState([]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        setToastList([]);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
