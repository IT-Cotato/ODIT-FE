import { useState, useEffect } from 'react';
import { getEventsByDate } from '../apis/events';

const useEventsByDate = ({ selectedDate }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      setError(null);

      const dateStr = selectedDate.toISOString().split('T')[0];

      getEventsByDate(dateStr)
        .then((data) => {
          setEvents(data);
        })
        .catch((err) => {
          console.error('이벤트 가져오기 실패:', err);
          setError('이벤트를 가져오는 중 오류가 발생했습니다.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedDate]);

  return {
    events,
    loading,
    error,
  };
};

export default useEventsByDate;
