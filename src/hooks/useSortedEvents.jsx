import { useMemo } from 'react';

const useSortedEvents = (events, sortType) => {
  const sortedEvents = useMemo(() => {
    if (!events) return [];

    return [...events].sort((a, b) => {
      const idA = a.id || a._id;
      const idB = b.id || b._id;

      return sortType === 'latest' ? idB - idA : idA - idB;
    });
  }, [events, sortType]);

  return sortedEvents;
};

export default useSortedEvents;
