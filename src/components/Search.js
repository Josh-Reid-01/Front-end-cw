import React, { useState } from "react";
// import FoodMenu from "./FoodMenu"
import DisplayHostels from "./DisplayHostels";

function Search({ hostels }) {
  const [searchField, setSearchField] = useState("");

  const filtered = hostels.filter((entry) => {
    return entry.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return (
    <div>
      <div>
        <input
          className="form-control"
          type="text"
          placeholder="Search ..."
          onChange={(e) => setSearchField(e.target.value)}
        />
      </div>
      <DisplayHostels hostels={filtered} />
    </div>
  );
}
export default Search;
