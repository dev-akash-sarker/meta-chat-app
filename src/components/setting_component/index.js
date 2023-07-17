import React from "react";
import "./style.css";
import { TextField } from "@mui/material";

const SettingLi = () => {
  return (
    <>
      <div className="natureModelWrapper">
        <div className="natureModel">
          <TextField
            margin="dense"
            id="outlined-basic"
            label="Change your name"
            variant="outlined"
            fullWidth
          />

          <TextField
            margin="dense"
            fullWidth
            id="outlined-basic"
            label="Change your email"
            variant="outlined"
          />
        </div>
      </div>
    </>
  );
};

export default SettingLi;
