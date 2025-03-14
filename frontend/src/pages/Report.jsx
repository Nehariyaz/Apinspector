import React from "react";
import VerticalNavbar from "../components/VerticalNavbar";
import HorizontalNavbar from "../components/HorizontalNavbar"; 


const Report = () => {
  return (
    <div>
      <div className="d-flex flex-column">
      <HorizontalNavbar />
        <div className="d-flex">
          <VerticalNavbar />

          
          </div>
      </div>
    </div>
  );
};

export default Report;
