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
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
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
    console.log("abc", data.id);
  };

  useEffect(() => {
    // storeage database
    const storage = getStorage();
    const fetchUsers = ref(db, "friendrequest");
    onValue(fetchUsers, (snapshot) => {
      let usersArr = [];
      snapshot.forEach((users) => {
        if (user.uid !== users.senderid) {
          getDownloadURL(storageRef(storage, users.val().senderid))
            .then((url) => {
              console.log("good man", users.val().senderid);
              usersArr.push({
                ...users.val(),
                id: users.key,
                profilePicture: url,
              });
            })
            .catch((error) => {
              usersArr.push({
                ...users.Val(),
                id: users.key,
                profilePicture: null,
              });
              // console.log("error", error);
            })
            .then(() => {
              setFriendreq([...usersArr]);
            });
        }
      });
    });
  }, [db, user.uid]);

  return (
    <>
      <div className="grouplist frndreq" id="style-2">
        <div className="grouplist_header">
          <h4>Friend Request</h4>
        </div>
        {frindreq.length === 0 ? (
          <p className="empty">There is no friend request</p>
        ) : (
          frindreq.map((item, i) => (
            <div className="group-item-wrapper" key={i}>
              {item.senderid !== user.uid && (
                <>
                  <div className="group-images">
                    <img src={item.profilePicture} alt="" />
                  </div>
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
                </>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FriendRequest;
