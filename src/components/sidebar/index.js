import React, { useEffect, useState } from "react";
import Sidepage from "../sidebarpage";
import { FiLogOut } from "react-icons/fi";
import "./style.css";
import { useDispatch } from "react-redux";
import { Loginusers } from "../../features/Slice/LoginSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import PopupModel from "../modal";
import { getDatabase, ref, onValue } from "firebase/database";
const Sidebar = ({ avaterprofile, setAvaterprofile }) => {
  const [realname, setRealname] = useState("");
  const [open, setOpen] = React.useState(false);
  const user = useSelector((user) => user.login.loggedIn);
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("murgi", realname);
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

  useEffect(() => {
    if (user.photoURL == null) {
      setAvaterprofile("./images/profile.jpg");
    } else {
      setAvaterprofile(user.photoURL);
    }
  }, [user.photoURL, setAvaterprofile]);

  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const usernamearr = [];
      console.log("abbc", snapshot);
      snapshot.forEach((userlist) => {
        console.log("dekha vai", userlist.key);
        if (user.uid === userlist.key) {
          usernamearr.push(userlist.val().username);
        }
      });
      setRealname(usernamearr);
    });
  }, [user.uid, db]);

  // useEffect(() => {
  //   const name = realname.toString("");
  //   updateProfile(auth.currentUser, {
  //     displayName: name,
  //   })
  //     .then(() => {
  //       // Profile updated!
  //       // ...
  //       dispatch(Loginusers(user));
  //       localStorage.setItem("users", JSON.stringify(user));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [auth.currentUser, dispatch, realname, user]);
  // console.log(realname.join(""));

  const namechanger = () => {
    // const result = realname.join("");
    // console.log(result);
    const result = Object.values(realname).join();
    console.log(result);
    updateProfile(auth.currentUser, {
      displayName: result,
      //JSON.stringify(realname.join(""))
    })
      .then(() => {
        // Profile updated!
        // ...
        dispatch(Loginusers(user));
        localStorage.setItem("users", JSON.stringify(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  namechanger();

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
