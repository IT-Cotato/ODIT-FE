import React from 'react';
import { Snackbar, Alert, Slide } from '@mui/material';

const DEFAULT_DURATION = 2000;

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    type: 'error',
    duration: DEFAULT_DURATION,
  });

  const showSnackbar = ({ message, type = 'error', duration = DEFAULT_DURATION }) => {
    setSnackbar({ open: true, message, type, duration });
    // setTimeout(() => {
    //   setSnackbar({ open: false, message: '', type: 'error' });
    // }, duration);
  };

  const SnackbarComponent = () => (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.duration}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      // eslint-disable-next-line react/no-unstable-nested-components, react/jsx-props-no-spreading
      TransitionComponent={(props) => <Slide {...props} direction="up" />}
    >
      <Alert severity={snackbar.type} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
};

export default useSnackbar;
