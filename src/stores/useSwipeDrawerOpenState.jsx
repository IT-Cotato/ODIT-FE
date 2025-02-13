import { create } from 'zustand';

/**
 * Zustand store for swipe drawer open state
 */
const useSwipeDrawerOpenState = create((set) => ({
  swipeDrawerOpenState: 'open',
  setSwipeDrawerOpenState: (openState) => set({ swipeDrawerOpenState: openState }),
}));

export default useSwipeDrawerOpenState;
