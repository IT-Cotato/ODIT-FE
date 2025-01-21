import React from 'react';

/**
 * useDebounce hook
 *
 * @param {string} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {string} The debounced value.
 */
const useDebounce = ({ value, delay }) => {
  const [debouncedValue, setDebouncedValue] = React.useState('');

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
