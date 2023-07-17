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
import { BsArrowLeft } from "react-icons/bs";

const Mygroup = () => {
  const [grouplist, setGrouplist] = useState([]);
  const [show, setShow] = useState(false);
  const [inshow, setInshow] = useState(false);
  const [groupreqlist, setGroupreqlist] = useState([]);
  const [groupmember, setGroupmember] = useState([]);

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
  // Group Request
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
  // Group Information
  const handleInfoShow = (mainItem) => {
    setInshow(true);
    const starCountRef = ref(db, "groupmembers/");
    onValue(starCountRef, (snapshot) => {
      const groupMemberArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === item.val().adminid &&
          item.val().groupid === mainItem.id
        ) {
          groupMemberArr.push({
            ...item.val(),
            id: item.key,
          });
        }
      });
      setGroupmember(groupMemberArr);
    });
    console.log("triggerd");
  };

  const handleAcceptgrp = (item) => {
    set(push(ref(db, "groupmembers")), {
      adminid: item.adminid,
      groupid: item.groupid,
      userid: item.userid,
      adminname: item.adminname,
      username: item.username,
      groupname: item.groupname,
      userimage: item.userimage,
    }).then(() => {
      console.log("user dekhi", item.userid);
      set(push(ref(db, "mynotify/" + item.userid)), {
        message: "your request from " + item.groupname + " has been accepted",
        adminid: item.adminid,
        userid: item.userid,
        groupname: item.groupname,
      });
      remove(ref(db, "groupjoinrequest/" + item.id));
    });
  };

  const handleRejectgrp = (item) => {
    remove(ref(db, "groupjoinrequest/" + item.id));
  };

  const handleRemoveMember = (data) => {
    remove(ref(db, "groupmembers/" + data.id));
    console.log(data.id);
  };

  return (
    <>
      <div className="mygroups" id="style-2">
        <div className="mygroups_header">
          <h4>My Groups</h4>
        </div>
        {show ? (
          <button
            className="goback"
            onClick={() => setShow(false)}
            type="button"
          >
            <BsArrowLeft fontSize={20} />
            <span className="arrback">Go Back</span>
          </button>
        ) : (
          inshow && (
            <button
              className="goback"
              onClick={() => setInshow(false)}
              type="button"
            >
              <BsArrowLeft fontSize={20} />
              <span className="arrback">Go Back</span>
            </button>
          )
        )}

        {grouplist.length === 0 ? (
          <p className="empty">No groups created yet</p>
        ) : show ? (
          groupreqlist.length === 0 ? (
            <p className="empty">There is no request</p>
          ) : (
            groupreqlist.map((item, i) => (
              <>
                <div className="mygrp-item-wrapper" key={i}>
                  <div className="mygrp-images">
                    <img src={item.userimage} alt="" />
                  </div>
                  <div className="mygrp-name">
                    <h4>{item.username}</h4>
                  </div>
                  <div className="group-list-btn">
                    <button type="button" onClick={() => handleAcceptgrp(item)}>
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRejectgrp(item)}
                      style={{ backgroundColor: "red" }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </>
            ))
          )
        ) : inshow ? (
          groupmember.length === 0 ? (
            <p className="empty">You have no members</p>
          ) : (
            groupmember.map((item, i) => (
              <>
                <div className="mygrp-item-wrapper" key={i}>
                  <div className="mygrp-images">
                    <img src={item.userimage} alt="" />
                  </div>
                  <div className="mygrp-name">
                    <h4>{item.username}</h4>
                  </div>
                  <div className="group-list-btn">
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(item)}
                    >
                      remove
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
                    <button type="button" onClick={() => handleInfoShow(item)}>
                      Info
                    </button>
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
