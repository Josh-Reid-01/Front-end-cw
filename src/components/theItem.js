import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Stars2 from "./stars2";
import Stars from "./stars";
import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import SubmitReview from "./SubmitReview";

const Item = ({ item, index }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [storageComment, setStorageComment] = useLocalStorage(newComment, "");
  const handleAddComment = () => {
    if (newComment) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  useEffect(() => {
    localStorage.setItem("newComment", newComment);
  }, [newComment]);

  return (
    <>
      <Accordion.Header> {item.name}</Accordion.Header>
      <Accordion.Body>
        <p>Description: {item.description}</p>
        <p>{"\n"}</p>
        <p>Email: {item.email}</p>
        <p>{"\n"}</p>
        <p>Address: {item.address}</p>
        <p>{"\n"}</p>
        <p>{"\n"}</p>
        <p>Reviews</p>
        <ul>
          {item.reviews.map((review, reviewIndex) => (
            <li key={reviewIndex}>
              <strong>{review.reviewer}:</strong> {review.review}
            </li>
          ))}
        </ul>
        <p>Ratings:</p>
        <ul>
          {item.ratings.map((rating, i) => (
            <li key={i}>
              <strong>Rating {i + 1}:</strong> <Stars2 rating={rating} />
            </li>
          ))}
        </ul>
        <p>Add your rating</p>
        <Stars position={index} />
        {/* <div>
          <div>
            {comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div> */}
      </Accordion.Body>
    </>
  );
};

export default Item;
