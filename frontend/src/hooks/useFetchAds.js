//frontend\src\hooks\useFetchAds.js
import { useState, useEffect } from "react";
import axios from "axios";

const useFetchAds = (type) => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAds();
  }, [type]); // Ensure ads refresh when type changes

  const fetchAds = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/ads?type=${type}`
      );
      setAds(data);
    } catch (error) {
      console.error(`Error fetching ${type} ads`, error);
      setError("Failed to load ads.");
    } finally {
      setIsLoading(false);
    }
  };

  return { ads, isLoading, error };
};

export default useFetchAds;
