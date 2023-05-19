import React, { useState } from "react";
import "./style.css";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Friends = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();
  const storage = getStorage();
  const [myfriend, setMyfriend] = useState([]);
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
            });
        }
      });
    });
  }, [db, user.uid, storage]);

  console.log("my friends", myfriend);
  return (
    <>
      <div className="friends" id="style-2">
        <div className="friends_header">
          <h4>Friends</h4>
        </div>
        {myfriend.length === 0 ? (
          <p className="empty">there is no friends</p>
        ) : (
          myfriend.map((item, i) => (
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
              <div className="friends-list-btn message-friend">
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
