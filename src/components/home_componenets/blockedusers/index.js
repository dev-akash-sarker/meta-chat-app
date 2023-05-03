import React, { useState } from "react";
import "./style.css";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Blockedblock = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();
  const [blocklist, setBlocklist] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "block/");
    onValue(starCountRef, (snapshot) => {
      const blockArr = [];
      snapshot.forEach((item) => {
        blockArr.push({ ...item.val(), keyid: item.key });
        console.log("mamma", item.key);
      });
      setBlocklist(blockArr);
    });
  }, [db]);

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
        {blocklist.map((item, i) => (
          <div key={i} className="blocklist-item-wrapper">
            {item.blockedById === user.uid ? (
              <>
                <div className="blocklist-images"></div>
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
        ))}
      </div>
    </>
  );
};

export default Blockedblock;
