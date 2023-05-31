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
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

import { useSelector } from "react-redux";
import { BsSearch } from "react-icons/bs";

const Userlist = () => {
  const [userme, setUserme] = useState([]);
  const [frindreq, setFriendreq] = useState([]);
  const [canclereq, setCanclereq] = useState([]);
  const [friendlist, setFriendlist] = useState([]);
  const [blocklist, setBlocklist] = useState([]);
  const [userlist, setUserlist] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [filterUserAll, setFilterUserAll] = useState([]);
  const [visible, setVisible] = useState("none");
  const [widths, setWidths] = useState("65px !important");
  const searchData = useSelector((state) => state.search.searchIn);
  const [activeClass, setActiveClass] = useState(
    "search_wrapper search_wrapper_users "
  );
  const user = useSelector((user) => user.login.loggedIn);
  // db database
  const db = getDatabase();
  // profile pucture from storage
  useEffect(() => {
    // storeage database
    const storage = getStorage();
    const fetchUsers = ref(db, "users");
    onValue(fetchUsers, (snapshot) => {
      let usersArr = [];
      snapshot.forEach((users) => {
        if (user.uid !== users.key) {
          getDownloadURL(storageRef(storage, users.key))
            .then((url) => {
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
                profilePicture:
                  "https://firebasestorage.googleapis.com/v0/b/meta-9c6a3.appspot.com/o/profile.jpg?alt=media&token=6f967d96-86ba-4d57-bc88-9ff983a196e1",
              });
            })
            .then(() => {
              // setUserlist([...usersArr]);
              setUserme([...usersArr]);
            });
        }
      });
    });
  }, [db, user.uid]);

  console.log("jack sparrow", userme);

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

  // Create a reference under which you want to list

  // cancle request
  const handleCancle = (data) => {
    canclereq.map((item) => {
      if (data.id === item.receiverid) {
        remove(ref(db, "friendrequest/" + item.maindId));
      } else {
        console.log("hoy nai");
      }
      return "";
    });
  };

  // as friends
  useEffect(() => {
    const starCountRef = ref(db, "friends/");
    onValue(starCountRef, (snapshot) => {
      let friendArr = [];
      snapshot.forEach((item) => {
        friendArr.push(item.val().receiverid + item.val().senderid);
      });
      setFriendlist(friendArr);
    });
  }, [db]);

  useEffect(() => {
    const starCountRef = ref(db, "block/");
    onValue(starCountRef, (snapshot) => {
      let blockArr = [];
      snapshot.forEach((item) => {
        blockArr.push(item.val().blockedId + item.val().blockedById);
      });
      setBlocklist(blockArr);
    });
  }, [db]);

  const handleOut = () => {
    setVisible("block");
    setWidths("300px");
    setActiveClass("search_wrapper search_wrapper_users activename ");
  };

  const handleClose = () => {
    setActiveClass("search_wrapper search_wrapper_users ");
  };

  const handleSearch = (e) => {
    let arr = [];
    userlist.filter((item) => {
      if (item.username.toLowerCase().includes(e.target.value.toLowerCase())) {
        arr.push(item);
      }
      return item;
    });

    setFilterUser(arr);
  };

  // console.log("amake dekhao", searchData.searchParam.toLowerCase());
  // console.log("dhaka jami", searchData.searchParam.toLowerCase());

  useEffect(() => {
    let arr = [];
    userlist.filter((item) => {
      if (
        (item.username || "")
          .toLowerCase()
          .includes((searchData.searchParam || "").toLowerCase())
      ) {
        arr.push(item);
      }
      return item;
    });
    setFilterUserAll(arr);
  }, [searchData, userlist]);

  return (
    <>
      <div className="userlist" id="style-2">
        <div className="userlist_header">
          <h4>userlist Lists</h4>
          <div
            className={activeClass}
            onClose={handleClose}
            onClick={handleOut}
            style={{ width: `${widths}` }}
          >
            <div className="search_icons">
              <BsSearch />
            </div>
            <div className="search_fills" style={{ display: `${visible}` }}>
              <input
                onChange={handleSearch}
                type="text"
                placeholder="search here ..."
              />
            </div>
          </div>
        </div>
        {filterUserAll.length > 0
          ? filterUserAll.map((item, i) => (
              <div key={i} className="userlist-item-wrapper">
                <div className="userlist-images">
                  <img src={item.profilePicture} alt="" />
                </div>
                <div className="userlist-name">
                  <h5>{item.username}</h5>

                  <h6>Today, 9:58pm</h6>
                </div>
                {}

                <div className="user-list-btn">
                  {friendlist.includes(item.id + user.uid) ||
                  friendlist.includes(user.uid + item.id) ? (
                    <button type="button" disabled>
                      friends
                    </button>
                  ) : blocklist.includes(item.id + user.uid) ||
                    blocklist.includes(user.uid + item.id) ? (
                    <div>
                      <button type="button" onClick={() => handleCancle(item)}>
                        Blocked
                      </button>
                    </div>
                  ) : frindreq.includes(item.id + user.uid) ||
                    frindreq.includes(user.uid + item.id) ? (
                    <div>
                      <button type="button" onClick={() => handleCancle(item)}>
                        Cancle Request
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => handleRequest(item)}>
                      Add Friend
                    </button>
                  )}
                </div>
              </div>
            ))
          : filterUser.length > 0
          ? filterUser.map((item, i) => (
              <div key={i} className="userlist-item-wrapper">
                <div className="userlist-images">
                  <img src={item.profilePicture} alt="" />
                </div>
                <div className="userlist-name">
                  <h5>{item.username}</h5>

                  <h6>Today, 9:58pm</h6>
                </div>

                <div className="user-list-btn">
                  {friendlist.includes(item.id + user.uid) ||
                  friendlist.includes(user.uid + item.id) ? (
                    <button type="button" disabled>
                      friends
                    </button>
                  ) : blocklist.includes(item.id + user.uid) ||
                    blocklist.includes(user.uid + item.id) ? (
                    <div>
                      <button type="button" onClick={() => handleCancle(item)}>
                        Blocked
                      </button>
                    </div>
                  ) : frindreq.includes(item.id + user.uid) ||
                    frindreq.includes(user.uid + item.id) ? (
                    <div>
                      <button type="button" onClick={() => handleCancle(item)}>
                        Cancle Request
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => handleRequest(item)}>
                      Add Friend
                    </button>
                  )}
                </div>
              </div>
            ))
          : userme.map((item, i) => (
              <div key={i} className="userlist-item-wrapper">
                <div className="userlist-images">
                  <img src={item.profilePicture} alt="" />
                </div>
                <div className="userlist-name">
                  <h5>{item.username}</h5>

                  <h6>Today, 9:58pm</h6>
                </div>

                <div className="user-list-btn">
                  {friendlist.includes(item.id + user.uid) ||
                  friendlist.includes(user.uid + item.id) ? (
                    <button type="button" disabled>
                      friends
                    </button>
                  ) : blocklist.includes(item.id + user.uid) ||
                    blocklist.includes(user.uid + item.id) ? (
                    <div>
                      <button type="button" onClick={() => handleCancle(item)}>
                        Blocked
                      </button>
                    </div>
                  ) : frindreq.includes(item.id + user.uid) ||
                    frindreq.includes(user.uid + item.id) ? (
                    <div>
                      <button type="button" onClick={() => handleCancle(item)}>
                        Cancle Requestss
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => handleRequest(item)}>
                      Add Friend
                    </button>
                  )}
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default Userlist;
