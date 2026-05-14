import React from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';
import { ToastContext } from '../ToastProvider';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const { toastList, createToast } = React.useContext(ToastContext);

  const [message, setMessage] = React.useState('');
  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);

  const id = React.useId();

  function handleCreateToast(event) {
    event.preventDefault();

    createToast(message, variant);

    // Reset fields
    setMessage('');
    setVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <form
      className={styles.wrapper}
      onSubmit={(event) => handleCreateToast(event)}
    >
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {toastList.length > 0 && <ToastShelf />}

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor={`${id}-message`}
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id={`${id}-message`}
              value={message}
              className={styles.messageInput}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => {
              const id = `variant-${option}`;
              return (
                <label key={id} htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    checked={variant === option}
                    onChange={(event) => {
                      setVariant(event.target.value);
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;
