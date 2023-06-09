import React from "react";
import { BsSearch } from "react-icons/bs";
import "./style.css";

const Searchbox = () => {
  return (
    <>
      <div className="search_wrapper" style={{margin: "10px"}}> 
        <div className="search_icons">
          <BsSearch />
        </div>
        <div className="search_fills">
          <input type="text" placeholder="search here ..." />
        </div>
      </div>
    </>
  );
};

export default Searchbox;
