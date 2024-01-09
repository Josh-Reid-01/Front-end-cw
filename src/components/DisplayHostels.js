"use strict";

import React from "react";
import Item from "./theItem";
import Accordion from "react-bootstrap/Accordion";

const HostelMenu = ({ hostels }) => {
  return (
    <Accordion>
      {hostels.map((hostel, index) => {
        return (
          <Accordion.Item eventKey={index} key={index}>
            <Item item={hostel} index={index} />
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default HostelMenu;
