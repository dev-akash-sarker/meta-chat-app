import React from "react";
import Grid from "@mui/material/Grid";
import { BsSearch } from "react-icons/bs";
import "./style.css";
import Searchbox from "../../../components/message_component/searchbox";
import Groups from "../../../components/message_component/groups";
import Friends from "../../../components/message_component/friends";
import Chat from "../../../components/message_component/chat";

const Message = () => {
  return (
    <>
      <Grid container className="message_pages" justifyContent="space-around">
        <Grid item xs={4} className="message_items">
          <Searchbox style={{ margin: "10px" }} />
          <Groups />
          <Friends />
        </Grid>
        <Grid item xs={7} className="message_items">
          <Chat />
        </Grid>
      </Grid>
    </>
  );
};

export default Message;
