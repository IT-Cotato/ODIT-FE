import React from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@emotion/react';

const EventDatePickerActionBar = (props) => {
  const theme = useTheme();

  const { className, onAccept, onCancel } = props;

  const buttonList = [
    {
      text: '취소',
      onClick: onCancel,
      color: theme.color.black[600],
    },
    {
      text: '적용',
      onClick: onAccept,
      color: theme.color.main[100],
    },
  ];

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: `1px solid ${theme.color.black[50]}`,
      }}
    >
      {buttonList.map(({ text, onClick, color }, index) => (
        <React.Fragment key={text}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', py: '0.5rem' }}>
            <Button onClick={onClick} sx={{ color, fontSize: '1rem', fontWeight: 500 }}>
              {text}
            </Button>
          </Box>
          {index === 0 && <Box sx={{ width: '1px', height: '100%', background: theme.color.black[50] }} />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default EventDatePickerActionBar;
