import React, { useState } from "react";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.css";
import { useFormik } from "formik";
import { signup } from "../../validation/validation";
import { Alert } from "@mui/material";
import ScaleLoader from "react-spinners/ScaleLoader";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const db = getDatabase();
  const [loading, setLoading] = useState(false);
  const [showpass, setShowpass] = useState("password");
  const [showpasse, setShowpasse] = useState("password");
  const auth = getAuth();
  const navigate = useNavigate();
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signup,
    onSubmit: () => {
      setLoading(true);
      createUserWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          console.log(user);
          setLoading(false);
          updateProfile(auth.currentUser, {
            displayName: formik.values.fullname,
          })
            .then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                set(ref(db, "users/" + user.uid), {
                  username: user.displayName,
                  email: user.email,
                }).then(() => {
                  toast.success(
                    "Registration Successfully Complete! Please Check your mail",
                    {
                      position: "bottom-center",
                      autoClose: 1500,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: false,
                    }
                  );
                  formik.resetForm();
                  setTimeout(() => {
                    navigate("/signin");
                  }, 1600);
                });
              });
            })
            .catch((error) => {
              console.log(error.code);
            });
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
  });
  // console.log(formik);
  console.log(auth);
  const handlevisible = () => {
    if (showpass === "password") {
      setShowpass("text");
    } else {
      setShowpass("password");
    }
  };
  const handleConvis = () => {
    if (showpasse === "password") {
      setShowpasse("text");
    } else {
      setShowpasse("password");
    }
  };
  return (
    <>
      <ToastContainer />
      <Container fixed>
        <Grid className="register-center" container spacing={2}>
          <Grid item xs={6}>
            <div className="form-header">
              <h3>Get started with easily register</h3>
              <p>Free register and you can enjoy it</p>
            </div>
            <form onSubmit={formik.handleSubmit} action="">
              <TextField
                className="form-style"
                label="Fullname"
                variant="outlined"
                margin="dense"
                type="text"
                name="fullname"
                onChange={formik.handleChange}
                value={formik.values.fullname}
              />
              {formik.errors.fullname ? (
                <Alert className="errorsRe" severity="error">
                  {formik.errors.fullname}
                </Alert>
              ) : (
                ""
              )}
              <TextField
                className="form-style"
                label="Email"
                variant="outlined"
                margin="dense"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && formik.touched.email ? (
                <Alert className="errorsRe" severity="error">
                  {formik.errors.email}
                </Alert>
              ) : (
                ""
              )}
              <div className="eyes-wrapper">
                <TextField
                  className="form-style"
                  label="Password"
                  variant="outlined"
                  margin="dense"
                  type={showpass}
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                  <Alert className="errorsRe" severity="error">
                    {formik.errors.password}
                  </Alert>
                ) : (
                  ""
                )}
                <div className="eyes" onClick={handlevisible}>
                  {showpass === "password" ? (
                    <AiFillEye size={25} />
                  ) : (
                    <AiFillEyeInvisible size={25} />
                  )}
                </div>
              </div>
              <div className="eyes-wrapper">
                <TextField
                  className="form-style"
                  label="Confirm password"
                  variant="outlined"
                  margin="dense"
                  type={showpasse}
                  name="confirmpassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmpassword}
                />
                {formik.errors.confirmpassword &&
                formik.touched.confirmpassword ? (
                  <Alert className="errorsRe" severity="error">
                    {formik.errors.confirmpassword}
                  </Alert>
                ) : (
                  ""
                )}
                <div className="eyes" onClick={handleConvis}>
                  {showpasse === "password" ? (
                    <AiFillEye size={25} />
                  ) : (
                    <AiFillEyeInvisible size={25} />
                  )}
                </div>
              </div>
              {loading ? (
                <Button type="submit" className="submitBtn" variant="contained">
                  <ScaleLoader color="#fff" />
                </Button>
              ) : (
                <Button type="submit" className="submitBtn" variant="contained">
                  Sign up
                </Button>
              )}

              <div className="accounts">
                <p>
                  Already have an account ?{" "}
                  <Link className="signin-color" to="/signin">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </Grid>
          <Grid item xs={6}>
            <div className="registration-images">
              <picture>
                <img src="./images/signup.png" alt="signup" />
              </picture>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Registration;
