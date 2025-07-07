import { useSnackbar, VariantType } from 'notistack';
import * as React from 'react';

interface ToastOptions {
  title?: string;
  description?: string;
  variant?: VariantType;
  duration?: number;
}

export function useToast() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showToast = React.useCallback((options: ToastOptions) => {
    const message = options.title ? (
      <div>
        <div className="font-semibold">{options.title}</div>
        {options.description && <div>{options.description}</div>}
      </div>
    ) : options.description;

    return enqueueSnackbar(message, {
      variant: options.variant || 'default',
      autoHideDuration: options.duration || 3000,
    });
  }, [enqueueSnackbar]);

  return {
    toast: showToast,
    dismiss: closeSnackbar
  };
}
