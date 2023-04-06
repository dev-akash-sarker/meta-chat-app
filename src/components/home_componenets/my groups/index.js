import React, { useEffect, useState } from "react";
import "./style.css";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Mygroup = () => {
  const [grpname, setGrpname] = useState("");
  const [tgname, setTgname] = useState("");
  const [groupDetail, setGroupDetail] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const user = useSelector((user) => user.login.loggedIn);
  const db = getDatabase();
  const handleGroups = () => {
    set(push(ref(db, "groups")), {
      adminname: user.displayName,
      adminid: user.uid,
      groupname: grpname,
      tagname: tgname,
    });
    setOpen(false);
  };

  useEffect(() => {
    const starCountRef = ref(db, "groups/");
    onValue(starCountRef, (snapshot) => {
      // console.log(snapshot.val(), "ami ase");
      const groupArr = [];
      snapshot.forEach((groupitem) => {
        groupArr.push(groupitem.val());
      });
      setGroupDetail(groupArr);
    });
  }, [db]);

  return (
    <>
      <div className="mygroups" id="style-2">
        <div className="mygroups_header">
          <h4>My Groups</h4>
          <Button
            varient="contained"
            className="creategroups"
            onClick={handleClickOpen}
          >
            Create Groups
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <div className="diologeGroupe">
              <div className="title">
                <h4>Create Group</h4>
                <Button onClick={handleClose}>
                  <AiOutlineCloseCircle fontSize="20px" />
                </Button>
              </div>
              <div className="grpname">
                <TextField
                  label="Group Name"
                  variant="standard"
                  fullWidth
                  margin="dense"
                  onChange={(e) => setGrpname(e.target.value)}
                  name="groupname"
                />
                <br />
                <TextField
                  label="Tag Name"
                  variant="standard"
                  fullWidth
                  margin="dense"
                  onChange={(e) => setTgname(e.target.value)}
                  name="tagname"
                />
              </div>
              <div className="grpbutton" style={{ textAlign: "center" }}>
                <Button
                  varient="contained"
                  style={{
                    backgroundColor: "#5f35f5",
                    textTransform: "capitalize",
                    color: "#fff",
                    fontWeight: "600",
                    marginTop: "20px",
                  }}
                  margin="dense"
                  onClick={handleGroups}
                >
                  Create Group
                </Button>
              </div>
            </div>
            {/* <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions> */}
          </Dialog>
        </div>
        {groupDetail.map((item, i) => (
          <div key={i} className="friends-item-wrapper">
            {console.log(item, "ami ami")}
            <div className="friends-images"></div>
            <div className="friends-name">
              <h5>{item.groupname}</h5>
              <h6>{item.tagname}</h6>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Mygroup;
