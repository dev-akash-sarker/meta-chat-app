import React, { useEffect, useState } from "react";
import "./style.css";
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";

const FriendRequest = () => {
  const [frindreq, setFriendreq] = useState([]);
  const user = useSelector((user) => user.login.loggedIn);

  // show friendrequest
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      snapshot.forEach((item) => {
        if (item.val().receiverid === user.uid) {
          reqArr.push({ ...item.val(), id: item.key });
        }
      });
      setFriendreq(reqArr);
    });
  }, [user.uid, db]);

  console.log(frindreq);

  const handleAccept = (data) => {
    const db = getDatabase();
    set(push(ref(db, "friends")), {
      ...data,
    }).then(() => {
      remove(ref(db, "friendrequest/" + data.id));
    });
  };

  const handleCancle = (data) => {
    remove(ref(db, "friendrequest/" + data.id));
  };

  return (
    <>
      <div className="grouplist" id="style-2">
        <div className="grouplist_header">
          <h4>Friend Request</h4>
        </div>
        {frindreq.map((item, i) => (
          <div className="group-item-wrapper" key={i}>
            <div className="group-images"></div>
            <div className="group-name">
              <h5>{item.sendername}</h5>
              <h6>Dinner?</h6>
            </div>
            <div className="group-list-btn">
              <button type="button" onClick={() => handleAccept(item)}>
                Accept
              </button>
              <button type="button" onClick={() => handleCancle(item)}>
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FriendRequest;
