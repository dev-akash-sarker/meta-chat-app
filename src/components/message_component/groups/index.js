import React, { useEffect, useState } from "react";
import "./style.css";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

const Groups = () => {
  const db = getDatabase();
  const user = useSelector((user) => user.login.loggedIn);
  const [groupmessage, setGroupmessage] = useState([]);

  useEffect(() => {
    // const storage = getStorage();
    const starCountRef = ref(db, "grouplist");
    onValue(starCountRef, (snapshot) => {
      let groupArr = [];
      snapshot.forEach((item) => {
        groupArr.push({ ...item.val(), id: item.key });
      });
      setGroupmessage(groupArr);
    });
  }, [db]);

  useEffect(() => {
    // storeage database
    const storage = getStorage();
    const fetchUsers = ref(db, "grouplist");
    onValue(fetchUsers, (snapshot) => {
      let usersArr = [];
      snapshot.forEach((users) => {
        if (user.uid !== users.senderid) {
          getDownloadURL(storageRef(storage, users.val().adminid))
            .then((url) => {
              console.log("good man", users.val().adminid);
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
              setGroupmessage([...usersArr]);
            });
        }
      });
    });
  }, [db, user.uid]);

  console.log("hello", groupmessage);

  const handleActive = (item) => {
    console.log("group", item);
  };

  return (
    <>
      <div className="group_message">
        <div className="group_message_header">
          <h4>Groups</h4>
        </div>

        {groupmessage?.map((item, i) => (
          <>
            <div key={i} className="group-message-wrapper">
              {console.log("item", item)}
              <div className="group-images">
                <img src={item.profilePicture} alt="" />
              </div>
              <div className="group-name">
                <h5>{item.groupname}</h5>
                <h6>{item.tagname}</h6>
              </div>
              <div
                className="group-list-btn"
                onClick={() => handleActive(item)}
              >
                <button type="button">message</button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Groups;
