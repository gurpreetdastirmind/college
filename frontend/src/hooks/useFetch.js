import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Usage:
 *   const { data, loading, error, refetch } = useFetch('/courses');
 *
 * With dependencies:
 *   const { data } = useFetch(`/courses?stream=${filter}`, [filter]);
 */
export default function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(url);
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);

  return { data, loading, error, refetch: fetchData };
}