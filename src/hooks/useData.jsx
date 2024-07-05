import  { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const useData = async (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axiosInstance.get('/departments');
        console.log(response.data?.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
        setIsLoading(false) // Optional: Handle error state if needed
      }
    };

    fetchData();
  }, [url]); // Re-run effect whenever 'url' changes

  return { data , isLoading};
};

export default useData;
