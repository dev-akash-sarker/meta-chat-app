import React, { useEffect, useState } from "react";
import "./style.css";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const Mygroup = () => {
  const [grouplist, setGrouplist] = useState([]);
  const [show, setShow] = useState(false);
  const [groupreqlist, setGroupreqlist] = useState([]);

  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();

  useEffect(() => {
    const starCountRef = ref(db, "grouplist/");
    onValue(starCountRef, (snapshot) => {
      const groupArr = [];
      snapshot.forEach((groupitem) => {
        if (user.uid === groupitem.val().adminid) {
          groupArr.push({ ...groupitem.val(), id: groupitem.key });
        }
      });
      setGrouplist(groupArr);
    });
  }, [db, user.uid]);

  const handleReqShow = (mainitem) => {
    setShow(true);
    const starCountRef = ref(db, "groupjoinrequest/");
    onValue(starCountRef, (snapshot) => {
      const groupreqarr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === item.val().adminid &&
          item.val().groupid === mainitem.id
        ) {
          groupreqarr.push({
            ...item.val(),
            id: item.key,
          });
        }
      });
      setGroupreqlist(groupreqarr);
    });
    setShow(true);
  };

  useEffect(() => {
    // storeage database
    const storage = getStorage();
    const fetchUsers = ref(db, "grouplist");
    onValue(fetchUsers, (snapshot) => {
      let usersArr = [];
      snapshot.forEach((users) => {
        if (user.uid !== users.adminid) {
          getDownloadURL(storageRef(storage, users.val().adminid))
            .then((url) => {
              usersArr.push({
                ...users.val(),
                id: users.val().adminid,
                keyid: users.key,
                profilePicture: url,
              });
            })
            .catch((error) => {
              usersArr.push({
                ...users.Val(),
                id: users.val().adminid,
                keyid: users.key,
                profilePicture: null,
              });
              console.log("error", error);
            })
            .then(() => {
              setGroupreqlist([...usersArr]);
            });
        }
      });
    });
  }, [db, user.uid]);

  console.log("aaaaxxx", groupreqlist);

  return (
    <>
      <div className="mygroups" id="style-2">
        <div className="mygroups_header">
          <h4>My Groups</h4>
        </div>
        {show && (
          <button onClick={() => setShow(false)} type="button">
            Go Back
          </button>
        )}
        {grouplist.length === 0 ? (
          <p className="empty">No groups created yet</p>
        ) : show ? (
          groupreqlist.length === 0 ? (
            <p className="empty">There is no request</p>
          ) : (
            groupreqlist.map((item, i) => (
              <>
                {/* {item.adminid !== user.uid && console.log("hello")} */}
                <div className="mygrp-item-wrapper" key={i}>
                  <div className="mygrp-images">
                    <img src={item.profilePicture} alt="" />
                  </div>
                  <div className="mygrp-name">
                    <h4>{item.username}</h4>
                  </div>
                  <div className="group-list-btn">
                    <button type="button">Accept</button>
                    <button type="button" style={{ backgroundColor: "red" }}>
                      Reject
                    </button>
                  </div>
                </div>
              </>
            ))
          )
        ) : (
          grouplist.map((item, i) => (
            <>
              {item.adminid === user.uid && (
                <div key={i} className="mygrp-item-wrapper">
                  <div className="mygrp-images">
                    <img src={user.photoURL} alt="" />
                  </div>
                  <div className="mygrp-name">
                    <h4>Admin : {item.adminname}</h4>
                    <h5>{item.groupname}</h5>
                    <h6>{item.tagname}</h6>
                  </div>
                  <div className="group-list-btn">
                    <button type="button">Info</button>
                    <button type="button" onClick={() => handleReqShow(item)}>
                      Request
                    </button>
                  </div>
                </div>
              )}
            </>
          ))
        )}
      </div>
    </>
  );
};

export default Mygroup;
