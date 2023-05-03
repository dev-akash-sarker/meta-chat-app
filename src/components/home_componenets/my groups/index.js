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
        groupArr.push(groupitem.val());
      });
      setGrouplist(groupArr);
    });
  }, [db]);

  return (
    <>
      <div className="mygroups" id="style-2">
        <div className="mygroups_header">
          <h4>My Groups</h4>
        </div>
        {grouplist.map((item, i) => (
          <>
            {item.adminid === user.uid && (
              <div key={i} className="friends-item-wrapper">
                <div className="friends-images">
                  <img src={user.photoURL} alt="" />
                </div>
                <div className="friends-name">
                  <h4>Admin : {item.adminname}</h4>
                  <h5>{item.groupname}</h5>
                  <h6>{item.tagname}</h6>
                </div>
                <div className="group-list-btn">
                  <button type="button">Remove</button>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Mygroup;
