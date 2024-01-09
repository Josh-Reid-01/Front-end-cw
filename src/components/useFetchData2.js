import { useEffect, useState, useCallback } from "react";

const useFetchData2 = () => {
  const [status, setStatus] = useState("idle");
  const [hostels, setHostels] = useState([]);
  // When you later fetch data and set the hostels state using setHostels(incomingData), incomingData is an array of objects,
  // not an array with a single object. Therefore, you should set the initial state without the array
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    const url = "http://localhost:3000/cafehostels";
    fetch(url)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData);
        setHostels(incomingData);
        setStatus("fetched");
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { status, hostels, loading };
};

export default useFetchData2;
