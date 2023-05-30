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
import { useSelector, useDispatch } from "react-redux";
import { Activeuser } from "../../../features/Slice/ActiveuserSlice";

const Friends = () => {
  const user = useSelector((state) => state.login.loggedIn);
  const dispatch = useDispatch();
  const db = getDatabase();
  const storage = getStorage();
  const [myfriend, setMyfriend] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      const friendArr = [];
      snapshot.forEach((item) => {
        if (
          user.uid === item.val().receiverid ||
          user.uid === item.val().senderid
        ) {
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
              setMyfriend(friendArr);
            });
        }
      });
    });
  }, [db, user.uid, storage]);

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

  // activesinglefrnds
  const handleActiveSingle = (item) => {
    if (item.reciverid === user.uid) {
      dispatch(
        Activeuser({
          status: "single",
          id: item.senderid,
          name: item.sendername,
        })
      );
      // localStorage.setItem("activeSingle", JSON.stringify(item));
    } else {
      dispatch(
        Activeuser({
          status: "single",
          id: item.reciverid,
          name: item.recivername,
        })
      );
    }
  };

  return (
    <div className="friends" id="style-2">
      <div className="friends_header">
        <h4>Friends</h4>
      </div>
      {myfriend.length === 0 ? (
        <p className="empty">there is no friends</p>
      ) : (
        myfriend.map((item, i) => (
          <div
            key={i}
            className="friends-item-wrapper"
            onClick={() => handleActiveSingle(item)}
          >
            <div className="friends-images">
              {item.receiverid === user.uid ? (
                <img src={item.profilePicture} alt="" />
              ) : (
                <img src={item.reciverPicture} alt="" />
              )}
            </div>
            <div className="friends-name">
              <h5>
                {item.receiverid === user.uid
                  ? item.sendername
                  : item.receivername}
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
