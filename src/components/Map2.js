import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import hostelData from "../data/locations2.json";
import React, { useState } from "react";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/src/images/marker.svg";

const Map2 = () => {
  const icon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [50, 50],
  });

  // const initialMarker =  [55.86639, -4.24919]
  const initialMarker = {};
  const [activeHostel, setActiveHostel] = useState(initialMarker);
  const position = [55.86639, -4.24919];

  //   const markerClicked = (position) => {
  //     setActiveCafe(position)
  // }

  const markerClicked = (properties) => {
    setActiveHostel(properties);
  };

  return (
    <>
      <MapContainer
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
            eventHandlers={{ click: () => markerClicked(hostel.properties) }}
          >
            <Popup>
              <div className="popup" role="alert">
                {hostel.properties.name} <br />
                {hostel.properties.address}
                <br />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="info">
        The hostel you have currently selected is {activeHostel.name}{" "}
        {activeHostel.desc}.
      </div>
    </>
  );
};

export default Map2;
