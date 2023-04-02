import React from "react";
import Rootcomponent from "../../rootcomponent/rootcomponent";
import "./style.css";
import { Mygroupsdata } from "./data";

const Mygroup = () => {
  return (
    <>
      <div className="mygroups" id="style-2">
        <div className="mygroups_header">
          <h4>My Groups</h4>
        </div>
        {Mygroupsdata.map((item, i) => (
          <Rootcomponent
            key={i}
            image={item.images}
            name={item.name}
            time={item.time}
            message={item.message}
          />
        ))}
      </div>
    </>
  );
};

export default Mygroup;
