import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import "./style.css";
import Searchbox from "../../../components/home_componenets/searchbox";
import { BsSearch } from "react-icons/bs";
import Grouplist from "../../../components/home_componenets/grouplist";
import FriendRequest from "../../../components/home_componenets/freindrequest";
import Friends from "../../../components/home_componenets/friends";
import Mygroup from "../../../components/home_componenets/my groups";
import Userlist from "../../../components/home_componenets/userlist";
import Blockedblock from "../../../components/home_componenets/blockedusers";

const Home = () => {
  const [filterAll, setFilterAll] = useState([]);
  const [groupsearch, setGroupsearch] = useState("");
  const handleSearch = (e) => {
    setGroupsearch(e.target.value);
  };

  return (
    <>
      <Grid container className="home_pages">
        <Grid item xs={4} className="home_items">
          {/* <div>
            <Searchbox />
          </div> */}
          <div>
            <div className="search_wrapper">
              <div className="search_icons">
                <BsSearch />
              </div>
              <div className="search_fills">
                <input
                  onChange={handleSearch}
                  type="text"
                  placeholder="search here ..."
                />
              </div>
            </div>
          </div>
          <div>
            <Grouplist grpfind={groupsearch} />
          </div>
          <div>
            <FriendRequest />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Friends grpfind={groupsearch} />
          </div>
          <div>
            <Mygroup grpfind={groupsearch} />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Userlist grpfind={groupsearch} />
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
