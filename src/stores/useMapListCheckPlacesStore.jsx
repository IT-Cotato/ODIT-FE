import { create } from 'zustand';

/**
 * Zustand store for mapListCheckPlaces
 *  - mapListCheckPlaces: place[]
 *     - checked places in map list
 *  - setMapListCheckPlaces: (place) => void
 *    - set mapListCheckPlaces state
 *    - if place is already checked, remove it from mapListCheckPlaces
 *    - else add it to mapListCheckPlaces
 *
 *  - setMapListCheckPlacesAll: (places) => void
 *    - set mapListCheckPlaces state to places
 */
const useMapListCheckPlacesStore = create((set) => ({
  mapListCheckPlaces: [],

  setMapListCheckPlaces: (place) => {
    set((state) => {
      if (state.mapListCheckPlaces.includes(place)) {
        return { mapListCheckPlaces: state.mapListCheckPlaces.filter((p) => p !== place) };
      }

      return { mapListCheckPlaces: [...state.mapListCheckPlaces, place] };
    });
  },

  setMapListCheckPlacesAll: (places) => {
    set({ mapListCheckPlaces: places });
  },
}));

export default useMapListCheckPlacesStore;
