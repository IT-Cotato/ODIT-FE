import { create } from 'zustand';

/**
 * Zustand store for isBottomDrawerFullOpen
 *
 * - isBottomDrawerFullOpen: boolean
 *    - true: bottom drawer is full open
 *    - false: bottom drawer is not full open
 *
 * - setIsBottomDrawerFullOpen: function
 *    - set isBottomDrawerFullOpen state
 *    - (height: number) => void
 */
const useIsBottomDrawerFullOpenStore = create((set) => ({
  isBottomDrawerFullOpen: false,

  setIsBottomDrawerFullOpen: (isFullOpen) => set({ isBottomDrawerFullOpen: isFullOpen }),
}));

export default useIsBottomDrawerFullOpenStore;
