import React from "react";
import { Mygrouplistdata } from "./mygroupdata";
import "./style.css";

const Grouplist = () => {
  return (
    <>
      <div className="grouplist" id="style-2">
        <div className="grouplist_header">
          <h4>Group Lists</h4>
        </div>
        {Mygrouplistdata.map((item, i) => (
          <div className="group-item-wrapper" key={i}>
            <div className="group-images">
              <img src={item.groupImages} alt="" />
            </div>
            <div className="group-name">
              <h5>{item.groupName}</h5>
              <h6>{item.groupMessage}</h6>
            </div>
            <div className="group-list-btn">
              <button type="button">Join</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grouplist;
