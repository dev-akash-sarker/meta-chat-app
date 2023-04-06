import React from "react";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { Alert, Button } from "@mui/material";
import "./style.css";
import { forgetValid } from "../../validation/validation";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";

const Forgetpass = () => {
  const auth = getAuth();
  const initialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: forgetValid,
    onSubmit: () => {
      sendPasswordResetEmail(auth, formik.values.email)
        .then(() => {
          console.log("hoise");
          toast.success("Please check your mail!", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
          });
        })
        .catch((error) => {
          console.log(error.message);
          toast.error("Email is invalid!", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
          });
        });
    },
  });
  return (
    <>
      <ToastContainer />
      <div className="main_forget_wrapper">
        <div className="inner_forgot_box">
          <div className="forget_header">
            <h4>Reset your password</h4>
          </div>
          <div className="forget_password">
            <form onSubmit={formik.handleSubmit}>
              <TextField
                className="form-style"
                label="Email"
                variant="outlined"
                margin="dense"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                style={{ width: "100%" }}
              />
              {formik.errors.email && formik.touched.email ? (
                <Alert className="errorsRe" severity="error">
                  {formik.errors.email}
                </Alert>
              ) : (
                ""
              )}
              <div className="reset_button">
                <Button type="submit" variant="contained">
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgetpass;
