import React from "react";
import "./style.css";
const Rootcomponent = ({ image, name, time, message }) => {
  return (
    <>
      <div className="root_wrapper">
        <div className="root-images">
          <img src={image} alt="" />
        </div>
        <div className="root-names">
          <h5>{name}</h5>
          <h6>{message}</h6>
        </div>
        <div className="grp-right">
          <p>{time}</p>
        </div>
      </div>
    </>
  );
};

export default Rootcomponent;
