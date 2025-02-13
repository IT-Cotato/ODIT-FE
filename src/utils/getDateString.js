import dayjs from 'dayjs';

/**
 * Function: convert date to string
 * Converted string format: 'YYYY-MM-DDTHH:mm:ss'
 * @param {Date} date - The date to convert to string.
 * @returns {string} The date string.
 *
 */
const getDateString = (date) => {
  if (!date) {
    return '';
  }

  return `${dayjs(date).format('YYYY-MM-DDTHH:mm:ss.000')}Z`;
};

export default getDateString;
