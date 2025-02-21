import styled from '@emotion/styled/macro';
import React from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import useIsBottomDrawerFullOpenStore from '../../stores/useIsBottomDrawerFullOpenStore';

/**
 * BottomDrawer Component (BottomSheet)
 * A reusable and customizable bottom drawer component.
 *
 * @prop {boolean} open - Initial open state of the drawer. Default is `true`.
 * @prop {boolean} blocking - Determines if the drawer blocks the background. Default is `false`.
 * @prop {React.ReactNode} children - The content to be rendered inside the drawer.
 */

const BottomDrawer = ({ open = true, blocking = false, footer, children }) => {
  const { setIsBottomDrawerFullOpen } = useIsBottomDrawerFullOpenStore();

  const sheetRef = React.useRef();

  return (
    <StyledBottomSheet
      open={open}
      blocking={blocking}
      ref={sheetRef}
      snapPoints={({ headerHeight, maxHeight }) => [headerHeight * 3, maxHeight * 0.5, maxHeight]}
      defaultSnap={({ maxHeight }) => maxHeight * 0.5}
      onSpringEnd={() => setIsBottomDrawerFullOpen(sheetRef.current?.height === window.innerHeight)}
      footer={footer}
    >
      {children}
    </StyledBottomSheet>
  );
};

export default BottomDrawer;

const StyledBottomSheet = styled(BottomSheet)`
  [data-rsbs-overlay] {
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }

  [data-rsbs-header] {
    padding-bottom: 1.25rem;

    &::before {
      width: 2.5rem;
      height: 0.25rem;
      border-radius: 0.125rem;
      background: ${({ theme }) => theme.color.black[200]};
    }
  }
  [data-rsbs-footer] {
    padding: 0;
  }
`;
