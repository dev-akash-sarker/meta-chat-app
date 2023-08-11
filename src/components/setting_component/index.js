import React, { useState } from "react";
import "./style.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import DiologeName from "./profileDiologe/DiologeName";
import { Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import DiologeImage from "./profileDiologe/DiologeImage";
import DiologePassword from "./accountDiologe/diologePassword";
import DarkModeCom from "../DarkMode";

const SettingLi = () => {
  const user = useSelector((user) => user.login.loggedIn);
  const [openDialogOne, setOpenDialogOne] = useState(false);
  const [openDialogTwo, setOpenDialogTwo] = useState(false);
  const [openDialogAccountOne, setOpenDialogAccountOne] = useState(false);
  const handleOpenDialogOne = () => {
    setOpenDialogOne(true);
  };

  const handleCloseDialogOne = () => {
    setOpenDialogOne(false);
  };

  const handleCloseDialogTwo = () => {
    setOpenDialogTwo(false);
  };

  const handleOpenDialogAccountOne = () => {
    setOpenDialogAccountOne(true);
  };
  const handleCloseDialogAccountOne = () => {
    setOpenDialogAccountOne(false);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center" gap="36px">
          <Grid
            item
            xs={4}
            padding="26px 39px 38px 26px"
            boxShadow="0px 4px 4px 0 rgba(0,0,0,0.25)"
            borderRadius="20px"
            marginTop="150px"
            className="setting-bg"
          >
            <div className="profile-stting">
              <h4>Profile Settings</h4>
            </div>
            <div className="user-profile">
              <div className="profile-image">
                <img src={user.photoURL} alt="" />
              </div>
              <div className="profile-text">
                <h4>{user.displayName}</h4>
                <p>Stay home stay safe</p>
              </div>
            </div>
            <hr />
            <div className="profile-setting-inner">
              <div className="profile-set-all">
                <div className="name-changer">
                  <Button onClick={handleOpenDialogOne}>
                    <AiFillEdit />
                  </Button>

                  <h4>Edit Profile Name.</h4>
                </div>
                {/* <div className="image-editor">
                  <Button onClick={handleOpenDialogTwo}>
                    <BsImage />
                  </Button>
                  <h4>Edit Profile Photo.</h4>
                </div> */}
              </div>

              <DiologeName
                open={openDialogOne}
                onClose={handleCloseDialogOne}
              />

              <DiologeImage
                open={openDialogTwo}
                onClose={handleCloseDialogTwo}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={4}
            padding="26px 39px 38px 26px"
            boxShadow="0px 4px 4px 0 rgba(0,0,0,0.25)"
            borderRadius="20px"
            marginTop="150px"
            className="setting-bg"
          >
            <div className="profile-stting">
              <h4>Account Settings</h4>
            </div>
            <div className="profile-setting-inner">
              <div className="profile-set-all">
                <div className="name-changer">
                  <Button onClick={handleOpenDialogAccountOne}>
                    <AiFillEdit />
                  </Button>

                  <h4>Change Password</h4>
                </div>
                <div className="image-editor">
                  <DarkModeCom />
                  <h4>Theme</h4>
                </div>
              </div>

              <DiologePassword
                open={openDialogAccountOne}
                onClose={handleCloseDialogAccountOne}
              />

              <DiologeImage
                open={openDialogTwo}
                onClose={handleCloseDialogTwo}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SettingLi;
