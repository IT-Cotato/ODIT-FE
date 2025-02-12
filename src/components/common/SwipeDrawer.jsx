import React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import useSwipeDrawerOpenState from '../../stores/useSwipeDrawerOpenState';

/**
 * SwipeDrawer Component
 * A reusable and customizable swipeable bottom drawer component.
 *
 * @prop {boolean} open - Initial open state of the drawer. Default is `false`.
 * @prop {boolean} full - Determines if the drawer takes up the full height. Default is `false`.
 * @prop {boolean} modal - Controls the presence of a modal backdrop. Default is `true`.
 * @prop {boolean} disableClose - Prevents the drawer from being closed. Default is `false`.
 * @prop {string} height - The height of the drawer content if `full` is `false`. Default is `'fit-content'`.
 * @prop {React.ReactNode} children - The content to be rendered inside the drawer.
 */
const SwipeDrawer = ({
  open = false,
  full = false,
  modal = true,
  disableClose = false,
  height = 'fit-content',
  children,
}) => {
  // const [openState, setOpenState] = React.useState(open ? 'open' : 'closed');

  const { swipeDrawerOpenState: openState, setSwipeDrawerOpenState: setOpenState } = useSwipeDrawerOpenState();

  const drawerBleeding = 32;

  const toggleDrawer = (currentState) => () => {
    if (disableClose) {
      return;
    }

    if (currentState === 'open') {
      setOpenState('full');
    } else if (currentState === 'full') {
      setOpenState('open');
    } else {
      setOpenState('open');
    }
  };

  React.useEffect(() => {
    return () => setOpenState('open');
  }, []);

  return (
    <>
      <Global
        styles={{
          '.MuiDrawer-root': {
            pointerEvents: modal ? 'auto' : 'none',
          },

          '.MuiDrawer-root > .MuiPaper-root': {
            transition: 'height 0.3s ease-in-out, max-height 0.3s ease-in-out !important',
            height: openState === 'full' ? `calc(100% - ${drawerBleeding}px)` : 'fit-content',
            maxHeight: openState === 'full' ? '100%' : '14rem',
            overflow: 'visible',
            pointerEvents: 'auto',
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={openState !== 'closed'}
        onClose={() => !disableClose && setOpenState('closed')}
        onOpen={() => setOpenState('open')}
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
                  pointerEvents: 'none',
                },
          },
        }}
      >
        <StyledBox
          onClick={toggleDrawer(openState)}
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
