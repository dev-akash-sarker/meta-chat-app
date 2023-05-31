import React, { useState } from "react";
import "./style.css";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FiRefreshCcw } from "react-icons/fi";

const Friends = () => {
  const user = useSelector((state) => state.login.loggedIn);
  const searchData = useSelector((state) => state.search.searchIn);
  const db = getDatabase();
  const [myfriend, setMyfriend] = useState([]);
  const [filterUserAll, setFilterUserAll] = useState([]);
  const storage = getStorage();

  useEffect(() => {
    // as reference for database collection
    const starCountRef = ref(db, "friends");
    onValue(starCountRef, (snapshot) => {
      const friendArr = [];
      // this will loop your items as snapshot
      snapshot.forEach((item) => {
        getDownloadURL(storageRef(storage, item.val().receiverid))
          .then((url) => {
            friendArr.push({
              ...item.val(),
              fid: item.key,
              reciverPicture: url,
            });
          })
          .catch((error) => {
            friendArr.push({
              ...item.val(),
              fid: item.key,
              reciverPicture: null,
              errors: error,
            });
          })
          .then(() => {
            setMyfriend([...friendArr]);
          });
      });
    });
  }, [db, user.uid, storage]);

  console.log(myfriend);

  const handleBlock = (data) => {
    if (user.uid === data.senderid) {
      set(push(ref(db, "block")), {
        blockedPerson: data.receivername,
        blockedId: data.receiverid,
        blockedBy: data.sendername,
        blockedById: data.senderid,
      }).then(() => {
        remove(ref(db, "friends/" + data.fid));
      });
    }

    if (user.uid === data.receiverid) {
      set(push(ref(db, "block")), {
        blockedPerson: data.sendername,
        blockedId: data.senderid,
        blockedBy: data.receivername,
        blockedById: data.receiverid,
      }).then(() => {
        remove(ref(db, "friends/" + data.fid));
      });
    }
  };

  const handleUnfriend = (data) => {
    remove(ref(db, "friends/" + data.fid));
    setMyfriend([]);
  };

  // reload function
  const refresh = () => {
    window.location.reload(true);
  };

  useEffect(() => {
    let arr = [];
    myfriend.filter((item) => {
      if (user.uid === item.senderid) {
        if (
          (item.receivername || "")
            .toLowerCase()
            .includes((searchData.searchParam || "").toLowerCase())
        ) {
          arr.push(item);
        }
      } else {
        if (
          (item.sendername || "")
            .toLowerCase()
            .includes((searchData.searchParam || "").toLowerCase())
        ) {
          arr.push(item);
        }
      }

      return item;
    });
    setFilterUserAll(arr);
  }, [searchData, myfriend, user.uid]);

  console.log("filter", filterUserAll);
  return (
    <div className="friends" id="style-2">
      <div className="friends_header">
        <h4>Friends</h4>
        <button onClick={refresh}>
          <FiRefreshCcw />
        </button>
      </div>
      {filterUserAll.length > 0 ? (
        filterUserAll.map((item, i) => (
          <div key={i} className="friends-item-wrapper">
            {console.log("item dekhao", item)}
            <div className="friends-images">
              {item.receiverid === user.uid ? (
                <img src={item.profilePicture} alt="" />
              ) : (
                <img src={item.reciverPicture} alt="" />
              )}
            </div>
            <div className="friends-name">
              <h5>
                {/* {item.receiverid === user.uid
              ? item.sendername
              : item.receivername} */}
                {user.uid === item.senderid
                  ? item.receivername
                  : item.sendername}
              </h5>
              <h6>Dinner?</h6>
            </div>
            <div className="friends-list-btn">
              <button
                type="button"
                className="block-btn"
                onClick={() => handleBlock(item)}
              >
                Block
              </button>
              <button onClick={() => handleUnfriend(item)} type="button">
                Unfriend
              </button>
            </div>
          </div>
        ))
      ) : myfriend.length === 0 ? (
        <p className="empty">there is no friends</p>
      ) : (
        myfriend.map((item, i) => (
          <div key={i} className="friends-item-wrapper">
            {console.log("item dekhao", item)}
            <div className="friends-images">
              {item.receiverid === user.uid ? (
                <img src={item.profilePicture} alt="" />
              ) : (
                <img src={item.reciverPicture} alt="" />
              )}
            </div>
            <div className="friends-name">
              <h5>
                {/* {item.receiverid === user.uid
                  ? item.sendername
                  : item.receivername} */}
                {user.uid === item.senderid
                  ? item.receivername
                  : item.sendername}
              </h5>
              <h6>Dinner?</h6>
            </div>
            <div className="friends-list-btn">
              <button
                type="button"
                className="block-btn"
                onClick={() => handleBlock(item)}
              >
                Block
              </button>
              <button onClick={() => handleUnfriend(item)} type="button">
                Unfriend
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Friends;
