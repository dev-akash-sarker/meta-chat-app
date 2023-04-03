import React, { useState } from "react";
import "./style.css";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Friends = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();
  const [myfriend, setMyfriend] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const friendArr = [];
      snapshot.forEach((item) => {
        // if (user.uid !== item.val().receiverid) {
        //   friendArr.push({ ...item.val(), fid: item.key });
        //   console.log("hoise");
        // } else {
        //   console.log("hoynai");
        // }

        if (user.uid === item.receiverid) {
          friendArr.push({ ...item.val(), fid: item.key });
        }
        friendArr.push({ ...item.val(), fid: item.key });
      });
      setMyfriend(friendArr);
    });
  }, []);

  return (
    <>
      <div className="friends" id="style-2">
        <div className="friends_header">
          <h4>Friends</h4>
        </div>
        {myfriend.map((item, i) => (
          <div key={i} className="friends-item-wrapper">
            <div className="friends-images"></div>
            <div className="friends-name">
              <h5>
                {item.receiverid === user.uid
                  ? item.sendername
                  : item.receivername}
              </h5>
              <h6>{console.log(item)}</h6>
              <h6>Dinner?</h6>
            </div>
            <div className="friends-list-btn">
              <button type="button">Block</button>
              <h2>Hello World</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Friends;
