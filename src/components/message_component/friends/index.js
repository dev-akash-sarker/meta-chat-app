import React, { useState } from "react";
import "./style.css";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Activeuser } from "../../../features/Slice/ActiveuserSlice";

const Friends = () => {
  const user = useSelector((user) => user.login.loggedIn);
  // eslint-disable-next-line no-unused-vars
  const activesingle = useSelector((state) => state.active.activeChat);
  const db = getDatabase();
  const storage = getStorage();
  const [myfriend, setMyfriend] = useState([]);
  const [myfrd, setMyfrd] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const friendArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === item.val().receiverid ||
          user.uid === item.val().senderid
        ) {
          getDownloadURL(storageRef(storage, item.val().receiverid))
            .then((url) => {
              friendArr.push({
                ...item.val(),
                fid: item.key,
                reciverPicture: url,
              });
            })
            .catch((error) => {
              friendArr.push({
                ...item.val(),
                fid: item.key,
                reciverPicture: null,
                errors: error,
              });
            })
            .then(() => {
              setMyfriend(friendArr);
              setMyfrd([...friendArr]);
            });
        }
      });
    });
  }, [db, user.uid, storage]);

  console.log("my friends is", myfrd);

  // active users
  const handleActive = (item) => {
    console.log("dekhi vaiyaaa", item);

    if (item.receiverid === user.uid) {
      dispatch(
        Activeuser({
          status: "single",
          id: item.senderid,
          name: item.sendername,
          picture: item.profilePicture,
        })
      );
      // localStorage.setItem("Activeuser", JSON.stringify(Activeuser));
    } else {
      dispatch(
        Activeuser({
          status: "single",
          id: item.receiverid,
          name: item.receivername,
          picture: item.reciverPicture,
        })
      );
      // localStorage.setItem("Activeuser", JSON.stringify(Activeuser));
    }
  };
  return (
    <>
      <div className="friends" id="style-2">
        <div className="friends_header">
          <h4>Friends</h4>
        </div>
        {myfriend.length === 0 ? (
          <p className="empty">there is no friends</p>
        ) : (
          myfrd.map((item, i) => (
            <div key={i} className="friends-item-wrapper">
              <div className="friends-images">
                {item.receiverid === user.uid ? (
                  <img src={item.profilePicture} alt="" />
                ) : (
                  <img src={item.reciverPicture} alt="" />
                )}
              </div>
              <div className="friends-name">
                <h5>
                  {item.receiverid === user.uid
                    ? item.sendername
                    : item.receivername}
                </h5>
                <h6>Dinner?</h6>
              </div>
              <div
                className="friends-list-btn message-friend"
                onClick={() => handleActive(item)}
              >
                <button type="button">Message</button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Friends;
