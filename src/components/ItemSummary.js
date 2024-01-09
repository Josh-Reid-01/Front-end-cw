import React, { useContext, useState } from "react";
import ItemContext from "./ItemContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/src/images/marker.svg";
import SubmitItinerary from "./SubmitItinerary";
export default function ItemSummary() {
  const [Itinerary, setItinerary] = useContext(ItemContext);
  const [nightField, setNightField] = useState("1");

  const deleteItem = (value) => {
    setItinerary((oldValues) => {
      return oldValues.filter((item) => item !== value);
    });
    console.log(Itinerary);
  };

  return (
    <div>
      <h2>Your Itinerary</h2>
      <ul>
        {Itinerary.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => deleteItem(item)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {hostelData.features.map((hostel) => (
          <Marker
            key={hostel.properties.id}
            position={[
              hostel.geometry.coordinates[0],
              hostel.geometry.coordinates[1],
            ]}
            icon={icon}
            // eventHandlers={{ click: () => markerClicked(cafe.geometry.coordinates) }}
          ></Marker>
        ))}
      </MapContainer> */}
    </div>
  );
}
