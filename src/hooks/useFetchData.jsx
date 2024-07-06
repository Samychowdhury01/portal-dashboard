import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';


const useFetchData = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(url);
        setData(response.data?.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        setData([]);
        setIsLoading(false);
        // Optionally: Handle error state if needed
      }
    };

    fetchData();

    // Cleanup function (optional)
    return () => {
      // Cleanup logic, if any
      setIsLoading(false)
    };
  }, [url]); // Dependency on 'url' ensures data is refetched when 'url' changes

  return { isLoading, data , setData};
};

export default useFetchData;
