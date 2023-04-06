import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineBell } from "react-icons/ai";
import { BsGear } from "react-icons/bs";
import { Link, useMatch } from "react-router-dom";
import "./style.css";

const Sidepage = () => {
  const matchOne = useMatch("/");
  const matchTwo = useMatch("/message");
  const matchThree = useMatch("/notification");
  const matchFour = useMatch("/settings");
  const matchHome = Boolean(matchOne) ? "active sidebar_icon" : "sidebar_icon";
  const matchMessages = Boolean(matchTwo)
    ? "active sidebar_icon"
    : "sidebar_icon";
  const matchNotify = Boolean(matchThree)
    ? "active sidebar_icon"
    : "sidebar_icon";
  const matchSetting = Boolean(matchFour)
    ? "active sidebar_icon"
    : "sidebar_icon";
  return (
    <>
      <div className="icons">
        <Link to="/">
          <div className={matchHome}>
            <AiOutlineHome />
          </div>
        </Link>
        <Link to="/message">
          <div className={matchMessages}>
            <AiOutlineMessage />
          </div>
        </Link>
        <Link to="/notification">
          <div className={matchNotify}>
            <AiOutlineBell />
          </div>
        </Link>
        <Link to="/settings">
          <div className={matchSetting}>
            <BsGear />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Sidepage;
