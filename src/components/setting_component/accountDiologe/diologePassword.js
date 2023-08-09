import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, TextField } from "@mui/material";
import { AiFillCloseCircle } from "react-icons/ai";
import { changePass } from "../../../validation/validation";
import { useFormik } from "formik";
import { getAuth, updatePassword } from "firebase/auth";

export default function DiologePassword({ open, onClose }) {
  const initialValues = {
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePass,
    onSubmit: (e) => {
      console.log("akash", e.password);
      const auth = getAuth();

      const user = auth.currentUser;
      const newPassword = e.password;
      updatePassword(user, newPassword)
        .then(() => {
          // Update successful.
          console.log("password updated");
        })
        .catch((error) => {
          // An error ocurred
          // ...
          console.log("update hoy nai", error);
        });
    },
  });

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
              sx={{ width: "400px" }}
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
