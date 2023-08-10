import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, TextField } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import { changePass } from "../../../validation/validation";
import { useFormik } from "formik";
import { getAuth, signOut, updatePassword } from "firebase/auth";
import { getDatabase, ref, remove } from "firebase/database";
import { useDispatch } from "react-redux";
import { Loginusers } from "../../../features/Slice/LoginSlice";
import { Navigate } from "react-router-dom";

export default function DiologePassword({ open, onClose }) {
  // const [defaultbutton, setDefaultbutton] = useState();
  const auth = getAuth();
  const db = getDatabase();
  const dispatch = useDispatch();

  const user = auth.currentUser;

  const initialValues = {
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePass,
    onSubmit: () => {
      handleUpdateProfile();
      // const auth = getAuth();

      // const user = auth.currentUser;
      // const newPassword = e.password;
    },
  });

  const handleUpdateProfile = async () => {
    // await updatePassword(currentusers, formik.values.password).then((e) => {
    //   console.log("newPassword", e);
    // });
    const newPassword = formik.values.password;
    await updatePassword(user, newPassword)
      .then(() => {
        console.log("password change");
        // setDefaultbutton(true);
        signOut(auth)
          .then(() => {
            localStorage.removeItem("users");
            remove(ref(db, "loginuser/" + user.uid));
            dispatch(Loginusers(null));
            Navigate("/");
          })
          .catch((error) => {
            console.log(error.code);
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log("hoy nai", error);
      });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Box className="flex-edit">
          <DialogTitle>Edit Your Password</DialogTitle>
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
              name="password"
              label="password"
              type="password"
              sx={{ width: "400px" }}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
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
