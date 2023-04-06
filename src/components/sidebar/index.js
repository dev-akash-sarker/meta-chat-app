import React from "react";
import Sidepage from "../sidebarpage";
import { FiLogOut } from "react-icons/fi";
import "./style.css";
import { useDispatch } from "react-redux";
import { Loginusers } from "../../features/Slice/LoginSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import PopupModel from "../modal";
const Sidebar = ({ avaterprofile, setAvaterprofile }) => {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((user) => user.login.loggedIn);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("users");
        dispatch(Loginusers(null));
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  if (user.photoURL == null) {
    setAvaterprofile("./images/profile.jpg");
  } else {
    setAvaterprofile(user.photoURL);
  }

  return (
    <>
      <div className="sidebar">
        <div className="sidebar_wrapper">
          <div className="pro_wrap">
            <div className="profile_picture" onClick={handleOpen}>
              <picture>
                <img src={avaterprofile} alt="profile" />
              </picture>
              <div className="profile_overlay">
                <AiOutlineCloudUpload />
              </div>
            </div>
            <div className="profile-name">
              <h4>{user.displayName}</h4>
            </div>
          </div>

          <div className="others_pages">
            <div className="home">
              <Sidepage />
            </div>
          </div>
          <div className="logout" onClick={handleLogout}>
            <FiLogOut />
          </div>
        </div>
      </div>
      <PopupModel open={open} setOpen={setOpen} />
    </>
  );
};

export default Sidebar;
