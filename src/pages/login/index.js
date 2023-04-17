import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.css";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { signin } from "../../validation/validation";
import { Alert } from "@mui/material";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Loginusers } from "../../features/Slice/LoginSlice";

const Signin = () => {
  const db = getDatabase();
  const [loading, setloading] = useState(false);
  const [signuser, setSignuser] = useState();
  const provider = new GoogleAuthProvider();
  const providerFB = new FacebookAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signin,
    onSubmit: () => {
      setloading(true);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(({ user }) => {
          dispatch(Loginusers(user));
          localStorage.setItem("users", JSON.stringify(user));
          setloading(false);
          formik.resetForm();
          toast.success("Log In Successfully Complete", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
          setTimeout(() => {
            navigate("/");
          }, 1600);
        })
        .catch((error) => {
          console.log(error.code);
          toast.error("Email Or Password Are Incorrect", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
          });
        });
    },
  });

  // console.log("aaammmmmi", signuser);
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let userArr = [];
      snapshot.forEach((item) => {
        console.log(item.key, "boka");
        console.log(auth.currentUser.uid, "tmi vai");
        if (item.key == auth.currentUser.uid) {
          // userArr.push({ displayName: item.val().username });
          updateProfile(auth.currentUser, {
            displayName: item.val().username,
            photoURL: "./images/profile.jpg",
          }).then(() => {
            dispatch(Loginusers(auth.currentUser));
            localStorage.setItem("users", JSON.stringify(auth.currentUser));
          });
        }
      });
    });
  }, [db]);

  const HandleGoogle = () => {
    signInWithPopup(auth, provider)
      .then(({ user }) => {
        dispatch(Loginusers(user));
        localStorage.setItem("users", JSON.stringify(user));
        console.log("google complete");
        setTimeout(() => {
          navigate("/");
        }, 1600);
      })
      .then(() => {
        const db = getDatabase();
        const starCountRef = ref(db, "users/");
        onValue(starCountRef, (snapshot) => {
          let userArr = [];
          snapshot.forEach((item) => {
            console.log(item.key, "boka");
            console.log(auth.currentUser.uid, "tmi vai");
            if (item.key == auth.currentUser.uid) {
              // userArr.push({ displayName: item.val().username });
              updateProfile(auth.currentUser, {
                displayName: item.val().username,
                photoURL: [],
              }).then(() => {
                dispatch(Loginusers(auth.currentUser));
                localStorage.setItem("users", JSON.stringify(auth.currentUser));
              });
            }
          });
        });
      })
      .catch((error) => {
        console.log(error.code);
        console.log("hoy nai");
      });
  };

  // set(ref(db , "users/" + userid))

  const handleFacebook = () => {
    signInWithPopup(auth, providerFB)
      .then(({ user }) => {
        dispatch(Loginusers(user));
        localStorage.setItem("users", JSON.stringify(user));
        console.log("facebook complete");
        setTimeout(() => {
          navigate("/");
        }, 1600);
      })
      .catch((error) => {
        console.log(error.code);
        console.log("hoy nai");
      });
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
              <div className="thirdParty-auth">
                <Button
                  onClick={HandleGoogle}
                  variant="outlined"
                  style={{ margin: "0px 10px 0px 0px" }}
                >
                  <FcGoogle style={{ marginRight: "10px" }} /> Google
                </Button>
                <Button
                  onClick={handleFacebook}
                  variant="outlined"
                  style={{ margin: "0px 10px" }}
                >
                  <BsFacebook style={{ marginRight: "10px" }} /> Facebook
                </Button>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit} action="">
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
              <TextField
                className="form-style"
                label="Password"
                variant="outlined"
                margin="dense"
                type="password"
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
              {loading ? (
                <Button type="submit" className="submitBtn" variant="contained">
                  <ScaleLoader color="#fff" />
                </Button>
              ) : (
                <Button type="submit" className="submitBtn" variant="contained">
                  Sign In
                </Button>
              )}

              <div className="accounts">
                <Link to="/forgetpass">
                  <p>Forget password </p>
                </Link>
              </div>
              <div className="accounts">
                <p>
                  Already have an account ? <Link to="/signup">Sign Up</Link>
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

export default Signin;
