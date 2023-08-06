import React, { useEffect, useState } from "react";
import Searchbox from "../message_component/searchbox";
import "./style.css";
import { AiFillBell } from "react-icons/ai";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Notify = () => {
  const [mynot, setMynot] = useState([]);
  const user = useSelector((user) => user.login.loggedIn);
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "mynotify/" + user.uid);
    onValue(starCountRef, (snapshot) => {
      const nottifyArr = [];
      snapshot.forEach((item) => {
        console.log(item.val().receiverid);
        if (item.val().receiverid === user.uid) {
          nottifyArr.push(item.val().message);
        } else {
          console.log("hoynai");
        }

        // console.log(item.senderid);
        // if (item.val().userid === user.uid) {
        //   nottifyArr.push(item.val().message);
        //   //console.log("hoise mamma", nottifyArr);
        // } else if (item.val().reciverid === user.uid) {
        //   nottifyArr.push(item.val().message);
        // }
        // console.log("hello my loves", item.val());
      });
      setMynot(nottifyArr);
    });
  }, [user.uid]);

  console.log("woow", mynot);

  return (
    <>
      <div>
        <div className="searchbox-meta">
          <Searchbox />
        </div>
        <div className="notifyWrapper">
          {mynot.map((item, i) => (
            <>
              <div className="mainflex" key={i}>
                <NavLink to="/">
                  <div className="notify-icons">
                    <AiFillBell />
                  </div>

                  <div className="notify-message">{item}</div>
                </NavLink>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Notify;
