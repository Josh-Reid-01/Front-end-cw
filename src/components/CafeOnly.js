import React, { useState } from "react";
import useFetchData2 from "./useFetchData2";
import Search from "./Search";
import Map2 from "./Map2";

const Home = () => {
  const { status, hostels } = useFetchData2();

  if (status === "fetched")
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h3>Where we are ....</h3>
            <Map2 />
          </div>
          <div className="col">
            <h3>Hostels with cafe</h3>

            <Search hostels={hostels} />
          </div>
        </div>
      </div>
    );
};

export default Home;
