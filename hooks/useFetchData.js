import { useEffect, useState } from 'react';

const useFetchData = (fetch) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch()
      .then((i) => {
        setResult(i);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { result, isLoading, error };
};

export default useFetchData;
