import { Button, Dialog, DialogActions, DialogContent, DialogContentText, useTheme } from '@mui/material';
import React from 'react';

/**
 * ConfirmDialog component
 * @param {boolean} open - If true, the dialog is open. Default is false.
 * @param {string} text - The text to display in the dialog.
 * @param {string} confirmText - The text to display in the confirm button.
 * @param {() => void} onConfirm - The function to call when the confirm button is clicked.
 * @param {() => void} onCancel - The function to call when the cancel button is clicked.
 * @returns
 */
const ConfirmDialog = ({ open, text, confirmText, onConfirm, onCancel }) => {
  const theme = useTheme();

  const BUTTON_LIST = [
    {
      text: '취소',
      onClick: onCancel,
      color: theme.color.black[600],
    },
    {
      text: confirmText,
      onClick: onConfirm,
      color: theme.color.main[100],
    },
  ];

  return (
    <Dialog
      open={open}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '1.25rem',
        },
      }}
    >
      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: '1rem',
            color: theme.color.black[900],
            px: '1.25rem',
          }}
        >
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          borderTop: `1px solid ${theme.color.black[50]}`,
          p: '0.25rem',
        }}
      >
        {BUTTON_LIST.map(({ text: buttonText, onClick, color }) => (
          <Button key={buttonText} onClick={onClick} sx={{ color, fontSize: '1rem', fontWeight: 500 }}>
            {buttonText}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
