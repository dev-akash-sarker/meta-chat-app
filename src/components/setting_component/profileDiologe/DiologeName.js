import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import { changeName } from "../../../validation/validation";
// eslint-disable-next-line no-unused-vars
import { Database, getDatabase, ref, update } from "firebase/database";
import { Loginusers } from "../../../features/Slice/LoginSlice";

export default function DiologeName({ open, onClose }) {
  const auth = getAuth();
  console.log(auth.currentUser);
  const users = useSelector((user) => user.login.loggedIn);
  const initialValues = {
    fullname: users.displayName,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changeName,
    onSubmit: (e) => {
      console.log("akash", e.fullname);

      handleUpdateProfile();
    },
  });

  const db = getDatabase();
  const dispatch = useDispatch();
  const handleUpdateProfile = async () => {
    await updateProfile(auth.currentUser, {
      displayName: formik.values.name,
    }).then(async () => {
      const userInfo = {
        // uid: auth.currentUser.uid,
        // email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        // emailVerified: auth.currentUser.emailVerified,
        // photoURL: auth.currentUser.photoURL,
      };
      await update(ref(db, "users/" + users.uid), {
        username: userInfo.displayName,
      });
      // await updatePassword(currentuser, formik.values.password).then(() => {
      //   console.log("newPassword");
      // });
      dispatch(Loginusers({ ...users, displayName: formik.values.fullname }));
      localStorage.setItem(
        "users",
        JSON.stringify({
          ...users,
          displayName: formik.values.fullname,
        })
      );
    });
  };
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box className="flex-edit">
          <DialogTitle>Edit Your Profile Name</DialogTitle>
          <DialogActions>
            <Button onClick={onClose}>
              <AiFillCloseCircle fontSize={20} />
            </Button>
          </DialogActions>
        </Box>

        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              name="fullname"
              placeholder={users.displayName}
              sx={{ width: "400px" }}
              onChange={formik.handleChange}
              value={formik.values.fullname}
            />
            <div style={{ marginTop: "20px" }}>
              <Button type="submit" variant="contained">
                Update password
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
