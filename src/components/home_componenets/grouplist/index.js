import React, { useEffect, useState } from "react";
import "./style.css";
import { RiAddLine } from "react-icons/ri";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  remove,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { useSelector } from "react-redux";

const Grouplist = () => {
  const [open, setOpen] = React.useState(false);
  const [groupname, setGroupname] = useState("");
  const [tagname, setTagname] = useState("");
  const [grouplist, setGrouplist] = useState([]);
  const [filterGroup, setFilterGroup] = useState([]);
  const [joinedGroup, setJoinedGroup] = useState();
  const [joinreq, setJoinreq] = useState();
  const [requestcancle, setRequestCancle] = useState();
  const user = useSelector((state) => state.login.loggedIn);
  const searchData = useSelector((state) => state.search.searchIn);
  const db = getDatabase();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateGroupList = () => {
    set(push(ref(db, "grouplist/")), {
      adminname: user.displayName,
      adminid: user.uid,
      groupname: groupname,
      tagname: tagname,
    });
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  useEffect(() => {
    const starCountRef = ref(db, "grouplist/");
    onValue(starCountRef, (snapshot) => {
      const groupArr = [];
      snapshot.forEach((item) => {
        groupArr.push({ ...item.val(), keyId: item.key });
      });
      setGrouplist(groupArr);
    });
  }, [db]);

  useEffect(() => {
    const starCountRef = ref(db, "groupmembers/");
    onValue(starCountRef, (snapshot) => {
      let joingrouparr = [];
      snapshot.forEach((item) => {
        joingrouparr.push(item.val().userid + item.val().adminid);
      });
      setJoinedGroup(joingrouparr);
    });
  }, [db]);

  useEffect(() => {
    // storeage database
    const storage = getStorage();
    const fetchUsers = ref(db, "grouplist");
    onValue(fetchUsers, (snapshot) => {
      let usersArr = [];
      snapshot.forEach((users) => {
        if (user.uid !== users.adminid) {
          getDownloadURL(
            storageRef(storage, `profile_Image/${users.val().adminid}`)
          )
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
              setGrouplist([...usersArr]);
            });
        }
      });
    });
  }, [db, user.uid]);

  const handleJoingrp = (item) => {
    set(push(ref(db, "groupjoinrequest/")), {
      groupid: item.keyid,
      groupname: item.groupname,
      grouptag: item.tagname,
      adminname: item.adminname,
      adminid: item.adminid,
      userid: user.uid,
      username: user.displayName,
      userimage: user.photoURL,
    }).then(() => {
      set(push(ref(db, "mynotify/" + item.adminid)), {
        message: user.displayName + " has request to join to " + item.groupname,
        groupname: item.groupname,
        adminname: item.adminname,
        adminid: item.adminid,
        receiverid: item.adminid,
        senderid: user.uid,
      });
    });
  };

  useEffect(() => {
    const starCountRef = ref(db, "groupjoinrequest/");
    onValue(starCountRef, (snapshot) => {
      let reqArr = [];
      let cancleArr = [];

      snapshot.forEach((item) => {
        cancleArr.push(item.key);
        reqArr.push(item.val().adminid + item.val().userid);
        // canclekey.push({ ...item.val(), maindId: item.key });
      });
      setJoinreq(reqArr);
      setRequestCancle(cancleArr);
    });
  }, [db]);

  useEffect(() => {
    let arr = [];
    grouplist.filter((item) => {
      if (
        (item.groupname || "")
          .toLowerCase()
          .includes((searchData.searchParam || "").toLowerCase())
      ) {
        arr.push(item);
      }
      return item;
    });
    setFilterGroup(arr);
  }, [grouplist, searchData]);

  const handleCanclegrp = (item) => {
    remove(ref(db, "groupjoinrequest/" + requestcancle));
  };

  return (
    <div className="grouplist" id="style-2">
      <div className="grouplist_header">
        <h4>Group Lists</h4>
        <button className="grouplist_new_btn" onClick={handleClickOpen}>
          Create New Groups <RiAddLine className="plus-ico" />
        </button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="create-new-group-style">
            <h3 style={{ marginBottom: "10px" }}>Create Your New Group</h3>
            <label>Group Name</label>
            <br />
            <TextField
              type="text"
              placeholder="your group name"
              margin="dense"
              fullWidth
              onChange={(e) => setGroupname(e.target.value)}
            />
            <br />
            <label>Tag Name</label>
            <br />
            <TextField
              type="text"
              placeholder="your tag name"
              margin="dense"
              fullWidth
              onChange={(e) => setTagname(e.target.value)}
            />
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                style={{ marginTop: "10px" }}
                fullWidth
                onClick={handleCreateGroupList}
              >
                Create Group
              </Button>
            </div>
          </div>
        </Dialog>
      </div>
      {filterGroup.length > 0
        ? filterGroup.map((item, i) => (
            <div>
              {item.adminid !== user.uid && (
                <div key={i} className="group-item-wrapper search_highlights">
                  <div className="group-images">
                    <img src={item.profilePicture} alt="" />
                  </div>
                  <div className="group-name">
                    <h5>{item.groupname}</h5>
                    <h6>{item.tagname}</h6>
                  </div>
                  <div className="group-list-btn">
                    {joinedGroup?.includes(item.adminid + user.uid) ||
                    joinedGroup?.includes(user.uid + item.adminid) ? (
                      <button type="button" onClick={() => handleJoingrp(item)}>
                        Joined
                      </button>
                    ) : joinreq?.includes(item.adminid + user.uid) ||
                      joinreq?.includes(user.uid + item.adminid) ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => handleCanclegrp(item)}
                        >
                          Requested
                        </button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => handleJoingrp(item)}>
                        Join
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        : grouplist.map((item, i) => (
            <div key={i} className="group-item-wrapper">
              {item.adminid !== user.uid && (
                <div>
                  <div className="group-images">
                    <img src={item.profilePicture} alt="" />
                  </div>
                  <div className="group-name">
                    <h5>{item.groupname}</h5>
                    <h6>{item.tagname}</h6>
                  </div>
                  <div className="group-list-btn">
                    {joinedGroup?.includes(item.adminid + user.uid) ||
                    joinedGroup?.includes(user.uid + item.adminid) ? (
                      <button type="button" onClick={() => handleJoingrp(item)}>
                        Joined
                      </button>
                    ) : joinreq?.includes(item.adminid + user.uid) ||
                      joinreq?.includes(user.uid + item.adminid) ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => handleJoingrp(item)}
                        >
                          Requested
                        </button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => handleJoingrp(item)}>
                        Join
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
    </div>
  );
};

export default Grouplist;
