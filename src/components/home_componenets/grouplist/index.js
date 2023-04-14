import React, { useEffect, useState } from "react";
import "./style.css";
import { RiAddLine } from "react-icons/ri";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { TextField } from "@mui/material";
import { getDatabase, ref, set, onValue, push } from "firebase/database";
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
  const user = useSelector((user) => user.login.loggedIn);
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
      console.log("hoises");
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
    // storeage database
    const storage = getStorage();
    const fetchUsers = ref(db, "grouplist");
    onValue(fetchUsers, (snapshot) => {
      let usersArr = [];
      snapshot.forEach((users) => {
        if (user.uid !== users.adminid) {
          getDownloadURL(storageRef(storage, users.val().adminid))
            .then((url) => {
              usersArr.push({
                ...users.val(),
                id: users.val().adminid,
                profilePicture: url,
              });
            })
            .catch((error) => {
              usersArr.push({
                ...users.Val(),
                id: users.val().adminid,
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
  }, []);

  return (
    <>
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

        {grouplist.map((item, i) => (
          <>
            {item.adminid !== user.uid && (
              <div key={i} className="group-item-wrapper">
                <div className="group-images">
                  <img src={item.profilePicture} alt="" />
                </div>
                <div className="group-name">
                  <h5>{item.groupname}</h5>
                  <h6>{item.tagname}</h6>
                </div>
                <div className="group-list-btn">
                  <button type="button">Join</button>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Grouplist;
