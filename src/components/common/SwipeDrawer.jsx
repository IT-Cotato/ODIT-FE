import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

/**
 * SwipeDrawer Component
 * A reusable and customizable swipeable bottom drawer component.
 *
 * @prop {boolean} modal - Controls the presence of a modal backdrop. Default is `true`.
 * @prop {boolean} disableClose - Prevents the drawer from being closed. Default is `false`.
 * @prop {string} height - The height of the drawer content if `full` is `false`. Default is `'fit-content'`.
 * @prop {React.ReactNode} children - The content to be rendered inside the drawer.
 */
const SwipeDrawer = ({ modal = true, children }) => {
  const drawerBleeding = 32;

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root': {
            pointerEvents: modal ? 'auto' : 'none',
          },

          '.MuiDrawer-root > .MuiPaper-root': {
            transition: 'height 0.3s ease-in-out, max-height 0.3s ease-in-out !important',
            height: 'fit-content',
            maxHeight: '14rem',
            overflow: 'visible',
            pointerEvents: 'auto',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open
        disableSwipeToOpen
        disableDiscovery
        swipeAreaWidth={drawerBleeding}
        onClose={() => {}}
        ModalProps={{
          keepMounted: true,
        }}
        slotProps={{
          backdrop: {
            sx: modal
              ? {}
              : {
                  backgroundColor: 'transparent',
                  pointerEvents: 'none',
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
            pointerEvents: 'auto',
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
