import React, { useState } from "react";
import "./style.css";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

const Blockedblock = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();
  const storage = getStorage();
  const [blocklist, setBlocklist] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "block/");
    onValue(starCountRef, (snapshot) => {
      const blockArr = [];
      snapshot.forEach((item) => {
        getDownloadURL(
          storageRef(storage, `profile_Image/${item.val().blockedId}`)
        )
          .then((url) => {
            blockArr.push({
              ...item.val(),
              keyid: item.key,
              blockedImage: url,
            });
          })
          .catch((error) => {
            blockArr.push({
              ...item.val(),
              keyid: item.key,
              blockedImage: null,
            });
            console.error("no download image", error);
          })
          .then(() => {
            setBlocklist([...blockArr]);
          });
      });
    });
  }, [db, storage]);

  const handleUnblocked = (data) => {
    if (data.blockedById === user.uid) {
      remove(ref(db, "block/" + data.keyid));
    }
  };
  return (
    <>
      <div className="blocklist" id="style-2">
        <div className="blocklist_header">
          <h4>Blocked Users</h4>
        </div>
        {blocklist.length === 0 ? (
          <p className="empty">No blocked users </p>
        ) : (
          blocklist.map((item, i) => (
            <div key={i} className="blocklist-item-wrapper">
              {item.blockedById === user.uid ? (
                <>
                  <div className="blocklist-images">
                    <img src={item.blockedImage} alt="bloacked" />
                  </div>
                  <div className="blocklist-name">
                    <h5>
                      {item.blockedById === user.uid ? item.blockedPerson : ""}
                    </h5>
                    <h6>Today, 9:58pm</h6>
                  </div>
                  <div className="block-list-btn">
                    <button type="button" onClick={() => handleUnblocked(item)}>
                      unblocked
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Blockedblock;
