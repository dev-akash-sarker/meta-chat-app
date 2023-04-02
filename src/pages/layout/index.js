import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";

const Rootlayout = () => {
  const [avaterprofile, setAvaterprofile] = useState("");
  return (
    <>
      <div>
        <Grid container>
          <Grid item xs={1}>
            <Sidebar
              avaterprofile={avaterprofile}
              setAvaterprofile={setAvaterprofile}
            />
          </Grid>
          <Grid item xs={11}>
            <Outlet />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Rootlayout;
