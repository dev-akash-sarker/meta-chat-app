import React from "react";
import Grid from "@mui/material/Grid";
import "./style.css";

import { BsSearch } from "react-icons/bs";
import Grouplist from "../../../components/home_componenets/grouplist";
import FriendRequest from "../../../components/home_componenets/freindrequest";
import Friends from "../../../components/home_componenets/friends";
import Mygroup from "../../../components/home_componenets/my groups";
import Userlist from "../../../components/home_componenets/userlist";
import Blockedblock from "../../../components/home_componenets/blockedusers";
import { useDispatch } from "react-redux";
import { SearchAll } from "../../../features/Slice/SearchSlice";

const Home = () => {
  const dispatch = useDispatch();
  // const searchData = useSelector((state) => state.search.searchIn);
  const handleSearch = (e) => {
    console.log(e.target.value);
    dispatch(SearchAll({ searchParam: e.target.value }));
  };

  return (
    <>
      <Grid container className="home_pages">
        <Grid item xs={4} className="home_items">
          <div>
            <div
              className="search_wrapper"
              style={{ width: "100% !important" }}
            >
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
            <Grouplist /> {/* searcg */}
          </div>
          <div>
            <FriendRequest />
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Friends /> {/* searcg */}
          </div>
          <div>
            <Mygroup /> {/* searcg */}
          </div>
        </Grid>
        <Grid item xs={4} className="home_items">
          <div>
            <Userlist /> {/* searcg */}
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
