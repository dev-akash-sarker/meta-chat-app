import React, { useEffect, useState } from "react";
import "./style.css";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
const Userlist = () => {
  const [userme, setUserme] = useState([]);
  const [frindreq, setFriendreq] = useState([]);
  const [canclereq, setCanclereq] = useState([]);
  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();
  useEffect(() => {
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      const userarr = [];
      snapshot.forEach((userlist) => {
        if (user.uid !== userlist.key) {
          userarr.push({ ...userlist.val(), id: userlist.key });
        }
      });
      setUserme(userarr);
    });
  }, [user.uid, db]);

  // show friendrequest

  useEffect(() => {
    const starCountRef = ref(db, "friendrequest/");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      let canclekey = [];
      snapshot.forEach((item) => {
        reqArr.push(item.val().receiverid + item.val().senderid);
        canclekey.push({ ...item.val(), maindId: item.key });
      });
      setFriendreq(reqArr);
      setCanclereq(canclekey);
    });
  }, [db]);

  // sent request
  const handleRequest = (item) => {
    set(push(ref(db, "friendrequest")), {
      sendername: user.displayName,
      senderid: user.uid,
      receivername: item.username,
      receiverid: item.id,
    });
  };

  // cancle request
  const handleCancle = (data) => {
    canclereq.map((item) => {
      if (data.id === item.receiverid) {
        remove(ref(db, "friendrequest/" + item.maindId));
      } else {
        console.log("hoy nai");
      }
    });
  };

  // useEffect(() => {
  //   handleCancle();
  // }, [hand]);

  return (
    <>
      <div className="userlist" id="style-2">
        <div className="userlist_header">
          <h4>userlist Lists</h4>
        </div>
        {userme.map((item, i) => (
          <div key={i} className="userlist-item-wrapper">
            <div className="userlist-images"></div>
            <div className="userlist-name">
              <h5>{item.username}</h5>
              <h6>Today, 9:58pm</h6>
            </div>
            {console.log("khamu", item)}
            <div className="user-list-btn">
              {frindreq.includes(item.id + user.uid) ||
              frindreq.includes(user.uid + item.id) ? (
                <div>
                  <button type="button" onClick={() => handleCancle(item)}>
                    Cancle Request
                  </button>
                </div>
              ) : frindreq.includes(item.id + user.uid) ||
                frindreq.includes(user.uid + item.id) ? (
                <button type="button" onClick={() => handleRequest(item)}>
                  Friend
                </button>
              ) : (
                <button type="button" onClick={() => handleRequest(item)}>
                  Add Friend
                </button>
              )}
            </div>
            {/*  */}
          </div>
        ))}
      </div>
    </>
  );
};

export default Userlist;
