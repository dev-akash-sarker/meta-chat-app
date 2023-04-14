import React, { useEffect, useState } from "react";
import "./style.css";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useSelector } from "react-redux";

const Mygroup = () => {
  const [grpname, setGrpname] = useState("");
  const [tgname, setTgname] = useState("");
  const [grouplist, setGrouplist] = useState([]);

  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();
  const handleGroups = () => {
    set(push(ref(db, "groups")), {
      adminname: user.displayName,
      adminid: user.uid,
      groupname: grpname,
      tagname: tgname,
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "grouplist/");
    onValue(starCountRef, (snapshot) => {
      // console.log(snapshot.val(), "ami ase");
      const groupArr = [];
      snapshot.forEach((groupitem) => {
        if (groupitem.val().adminid === user.uid) {
          groupArr.push({ ...groupitem.val(), keyId: groupitem.key });
        }
      });
      setGrouplist(groupArr);
    });
  }, [db]);

  const handlereqshow = (data) => {};

  return (
    <>
      <div className="mygroups" id="style-2">
        <div className="mygroups_header">
          <h4>My Groups</h4>
        </div>
        {grouplist.length == 0 ? (
          <div className="nogroup">
            <span>No Groups Created!</span>
          </div>
        ) : (
          <>
            {grouplist.map((item, i) => (
              <div key={i} className="friends-item-wrapper">
                <div className="friends-images">
                  <img src={user.photoURL} alt="" />
                </div>
                <div className="friends-name">
                  <span>Admin : {item.adminname}</span>
                  <h5>{item.groupname}</h5>
                  <span>{item.tagname}</span>
                  <span>{console.log("ami to obak", item)}</span>
                </div>
                <div className="group-list-btn">
                  <button type="button">info</button>
                  <button type="button" onClick={() => handlereqshow(item)}>
                    request
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Mygroup;
