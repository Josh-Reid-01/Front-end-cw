import React, { useEffect, useState, useCallback } from "react";
import Login from "./Login";
import useToken from "./useToken";
import moment from "moment";

export default function ViewIT() {
  // const [token, setToken] = useState();
  const { token, setToken } = useToken();
  const [itineraries, setItineraries] = useState([
    { name: "", date: "", itinerary: [""] },
  ]);
  const [searchField, setSearchField] = useState(""); // State for search term

  const fetchData = useCallback(() => {
    const settings = {
      method: "GET",
      headers: {
        Authorization: token,
      },
    };
    const url = "http://localhost:3000/viewIT";
    fetch(url, settings)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData);
        let userItinerary = [{ name: "", date: "", itinerary: [] }];
        let formattedData = incomingData.map((item, index) => {
          let name = item.itinerary[0];
          let date = item.itinerary[1];
          date = moment(date).format("DD/MM/YYYY");

          let itinerary = item.itinerary.slice(2, item.itinerary.length);
          userItinerary[index] = { name, date, itinerary };
        });
        setItineraries(userItinerary);
      })
      .catch((err) => console.error(err));
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredItineraries = itineraries.filter((itinerary) =>
    itinerary.name.toLowerCase().includes(searchField.toLowerCase())
  );

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="container-fluid">
      <h1 className="headingStyleLeft">Itineraries</h1>
      <div>
        <input
          className="form-control"
          type="text"
          placeholder="Search ..."
          onChange={(e) => setSearchField(e.target.value)}
        />
        <h2 className="headingStyleLeft">Current Itineraries</h2>
        {filteredItineraries.map((item) => (
          <>
            <h3 className="headingStyleLeft">User name: {item.name}</h3>
            <h3 className="headingStyleLeft">Start Date: {item.date}</h3>
            <ul className="list-group">
              <h2>Hostels:</h2>
              {item.itinerary.map((element) => (
                <div className="headingStyleLeft">
                  <li className="list-group-item">{element}</li>
                </div>
              ))}
            </ul>
            <br />
            <br />
          </>
        ))}
      </div>
    </div>
  );
}
