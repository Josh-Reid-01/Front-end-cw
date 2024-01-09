import React from "react";
import { FaStar } from "react-icons/fa";

export default function Stars({ rating, totalStars = 5 }) {
  return (
    <div>
      {Array.from({ length: totalStars }, (_, i) => (
        <FaStar key={i} color={i < rating ? "red" : "grey"} />
      ))}
    </div>
  );
}
