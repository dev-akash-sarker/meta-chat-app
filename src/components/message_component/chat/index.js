import React from "react";
import "./style.css";
import { FaEllipsisV } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";

const Chat = () => {
  return (
    <>
      <div className="message-chat" style={{ marginLeft: "27px" }}>
        <div className="message_header">
          <div className="message_profile">
            <div className="profile_image">
              <img src="./images/men.jpg" alt="men" />
            </div>
            <div className="profile_name">
              <h4 className="name_tag">Swathi</h4>
              <p className="online_tag">Online</p>
            </div>
          </div>
          <div className="message_settings">
            <FaEllipsisV color="#5F35F5" fontSize="30px" />
          </div>
        </div>
        <hr
          className="borderBottomMes"
          style={{ marginTop: "24.5px", marginBottom: "56px" }}
        />
        <div className="message_screen">
          <div className="left_screen">
            <div className="leftMgs">
              <h3 className="msgtext">Hey There !</h3>
              <p className="msgtime">Today, 2:01pm</p>
            </div>
            <div className="leftMgs">
              <h3 className="msgtext">Hey There !</h3>
              <p className="msgtime">Today, 2:01pm</p>
            </div>
          </div>
          <div className="right_screen">
            <div className="rightMgs">
              <h3 className="msgtext">Hey There !</h3>
              <p className="msgtime">Today, 2:01pm</p>
            </div>
            <div className="rightMgs">
              <h3 className="msgtext">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
                asperiores minima quos animi recusandae odio sunt, velit
                quibusdam incidunt officia ex vel doloribus quisquam! Numquam
                aut, laborum distinctio odio asperiores nam officia iusto harum
                quasi, aperiam nesciunt. Nobis dolorem quibusdam, culpa saepe
                reprehenderit repudiandae autem sed sapiente quos numquam iste!
                Eaque, doloremque est nemo vero repellendus placeat natus
                consequuntur illo cumque, quae fugit molestias laborum
                aspernatur sint eos aperiam impedit sed adipisci tempore velit
                eligendi non recusandae veritatis. Placeat in, perferendis aut
                eum aliquam consequatur, sed veritatis voluptates impedit
                incidunt praesentium. Laboriosam minima aliquid labore, deserunt
                temporibus quia nesciunt libero. !
              </h3>
              <p className="msgtime">Today, 2:01pm</p>
            </div>
          </div>
        </div>
        <hr className="borderBottomMes" style={{ marginTop: "47px" }} />
        <div className="message_feild">
          <div className="text_msg_feild">
            <button className="btn-left">
              <AiOutlineRight fontSize="20px" />
            </button>
            <input className="text_input" type="text" />
          </div>
          <div className="btnw-wrapper">
            <button className="send_btn">
              <FaPaperPlane color="#fff" fontSize="20px" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
