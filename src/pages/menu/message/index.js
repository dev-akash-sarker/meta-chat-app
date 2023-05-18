import React from "react";
import Grid from "@mui/material/Grid";
import { BsSearch } from "react-icons/bs";
import "./style.css";
import Searchbox from "../../../components/message_component/searchbox";
import Groups from "../../../components/message_component/groups";
import Friends from "../../../components/message_component/friends";

const Message = () => {
  return (
    <>
      <Grid container className="message_pages">
        <Grid item xs={4} className="message_items">
          <Searchbox style={{ margin: "10px" }} />
          <Groups />
          <Friends />
        </Grid>
        <Grid item xs={8} className="message_items">
          hello
        </Grid>
      </Grid>
    </>
  );
};

export default Message;
