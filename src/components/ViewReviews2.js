import React, { useEffect, useState, useCallback } from "react";

export default function ViewReviews2() {
  const [reviews, setReviews] = useState([
    { name: "", hostel: "", review: "" },
  ]);
  const [searchField, setSearchField] = useState("");

  const fetchData = useCallback(() => {
    const settings = {
      method: "GET",
    };
    const url = "http://localhost:3000/viewReviews";
    fetch(url, settings)
      .then((response) => response.json())
      .then((incomingData) => {
        console.log(incomingData);
        let userReview = [{ name: "", hostel: "", review: "" }];
        let formattedData = incomingData.map((item, index) => {
          let name = item.review[0];
          let hostel = item.review[1];
          let review = item.review[2];
          userReview[index] = { name, hostel, review };
        });
        setReviews(userReview);
      })
      .catch((err) => console.error(err));
  });

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredReviews = reviews.filter(
    (review) =>
      review.name.toLowerCase().includes(searchField.toLowerCase()) ||
      review.hostel.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <div className="container-fluid">
      <h1 className="headingStyleLeft">Reviews</h1>
      <div>
        <input
          className="form-control"
          type="text"
          placeholder="Search ..."
          onChange={(e) => setSearchField(e.target.value)}
        />
        <h2 className="headingStyleLeft">Current Reviews</h2>
        {filteredReviews.map((item) => (
          <>
            <h3 className="headingStyleLeft">User name: {item.name}</h3>
            <br></br>
            <h3 className="headingStyleLeft">Hostel: {item.hostel}</h3>
            <br></br>
            <h3 className="headingStyleLeft">Review: {item.review}</h3>
            <br></br>
            <ul className="list-group"></ul>
            <br></br>
            <br></br>
          </>
        ))}
      </div>
    </div>
  );
}
