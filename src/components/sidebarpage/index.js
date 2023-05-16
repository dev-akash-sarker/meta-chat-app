import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { Link, NavLink, useMatch } from "react-router-dom";
import "./style.css";

const Sidepage = () => {
  return (
    <>
      <div className="icons">
        <NavLink to="/" className="sidebar_icon">
          <AiOutlineHome />
        </NavLink>
        <NavLink to="/message" className="sidebar_icon">
          <AiOutlineMessage />
        </NavLink>
        <NavLink to="/notification" className="sidebar_icon">
          <AiOutlineBell />
        </NavLink>
        <NavLink to="/settings" className="sidebar_icon">
          <BsGear />
        </NavLink>
      </div>
    </>
  );
};

export default Sidepage;
