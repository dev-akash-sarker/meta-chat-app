import React from "react";
import Grid from "@mui/material/Grid";
import "./style.css";
import Searchbox from "../../../components/home_componenets/searchbox";
import Grouplist from "../../../components/home_componenets/grouplist";
import FriendRequest from "../../../components/home_componenets/freindrequest";
import Friends from "../../../components/home_componenets/friends";
import Mygroup from "../../../components/home_componenets/my groups";
import Userlist from "../../../components/home_componenets/userlist";
import Blockedblock from "../../../components/home_componenets/blockedusers";

const Home = () => {
  return (
    <>
      <Grid container className="home_pages">
        <Grid item xs={4} className="home_items">
          <div>
            <Searchbox />
          </div>
          <div>
            <Grouplist />
          </div>
          <div>
            <FriendRequest />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Friends />
          </div>
          <div>
            <Mygroup />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Userlist />
          </div>
          <div>
            <Blockedblock />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
