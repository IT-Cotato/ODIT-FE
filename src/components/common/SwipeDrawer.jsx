import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const SwipeDrawer = ({
  open = false,
  full = false,
  modal = true,
  disableClose = false,
  height = 'fit-content',
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(open);

  const drawerBleeding = 32;

  const toggleDrawer = (newOpen) => () => {
    if (disableClose) {
      return;
    }

    setIsOpen(newOpen);
  };

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(${full ? `100%` : height} - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToisOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        slotProps={{
          backdrop: {
            sx: modal
              ? {}
              : {
                  backgroundColor: 'transparent',
                },
          },
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: '2rem',
            borderTopRightRadius: '2rem',
            visibility: 'visible',
            right: 0,
            left: 0,
            width: '100%',
            height: drawerBleeding,
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox sx={{ p: '1rem', height: '100%', overflow: 'auto' }}>{children}</StyledBox>
      </SwipeableDrawer>
    </>
  );
};

export default SwipeDrawer;

const StyledBox = styled('div')(({ theme }) => ({
  background: theme.color.black[0],
}));

const Puller = styled('div')(({ theme }) => ({
  width: '2.5rem',
  height: '0.25rem',
  backgroundColor: theme.color.black[200],
  borderRadius: '0.125rem',
  position: 'absolute',
  top: '0.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
}));
