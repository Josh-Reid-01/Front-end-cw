import React, { useState } from "react";
import ItemContext from "./ItemContext";
import ItemSummary from "./ItemSummary";
import SubmitItinerary from "./SubmitItinerary";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const HostelSelect = ({ items }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleClick = (e, selectedItem) => {
    let newState = [...selectedItems, selectedItem];
    setSelectedItems(newState);
    console.log("selectedItems is " + selectedItems);
    console.log("selectedItem is " + selectedItem);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 submenu ">
            <h2 className=" justify-content-left headingStyleLeft">Hostels</h2>
            <ul className="list-group">
              {items.map((item) => (
                <li
                  className="menu-list list-group-item"
                  key={item.id}
                  onClick={(e) => handleClick(e, item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <ItemContext.Provider value={[selectedItems, setSelectedItems]}>
            <div className="col-3">
              <ItemSummary />
            </div>
            <div className="col-5">
              <SubmitItinerary />
            </div>
          </ItemContext.Provider>
        </div>
      </div>
    </>
  );
};
export default HostelSelect;
