import React from "react";
import useFetchData from "./useFetchData";

import HostelSelect from "./HostelSelect";

const HostelGuide = () => {
  const { status, hostels } = useFetchData();
  if (status === "fetched")
    return (
      <div>
        <HostelSelect items={hostels} />
      </div>
    );
  return <p>There is currently an issue displaying the hostels</p>;
};

export default HostelGuide;
