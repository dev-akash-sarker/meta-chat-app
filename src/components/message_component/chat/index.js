import React, { useRef, useState } from "react";
import "./style.css";
import { FaEllipsisV } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
// import { AiOutlineRight } from "react-icons/ai";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
// import { styled } from "@mui/material/styles";
// import SpeedDial from "@mui/material/SpeedDial";
// import SpeedDialIcon from "@mui/material/SpeedDialIcon";
// import SpeedDialAction from "@mui/material/SpeedDialAction";
// import MoodIcon from "@mui/icons-material/Mood";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [openCam, setOpenCam] = useState(false);
  const chooseFile = useRef(null);
  const activeChatName = useSelector((active) => active.active.activeChat);

  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }

  // const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  //   position: "absolute",
  //   "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
  //     bottom: theme.spacing(2),
  //     right: theme.spacing(2),
  //   },
  //   "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
  //     top: theme.spacing(2),
  //     left: theme.spacing(2),
  //   },
  // }));

  // const actions = [
  //   { icon: <MoodIcon />, name: "Emoji" },
  //   { icon: <CameraAltIcon />, name: "Camera" },
  //   { icon: <KeyboardVoiceIcon />, name: "Voice" },
  //   { icon: <PhotoSizeSelectActualOutlinedIcon />, name: "Gallery" },
  // ];

  // const [direction, setDirection] = React.useState("right");
  function handleCameraStop() {
    console.log("handleCameraStop");
  }
  // const handleImageUpload = () => {};

  return (
    <>
      <div className="chatting_box">
        <div className="active_user_status">
          <div className="user_image">
            <div className="image">
              {activeChatName === null ? (
                ""
              ) : (
                <img src={activeChatName.picture} alt="" />
              )}
            </div>
            <div className="info">
              {activeChatName === null ? "" : <h4>{activeChatName.name}</h4>}

              <span>Online</span>
            </div>
          </div>
          <div className="info_bar">
            <FaEllipsisV color="rgb(83, 83, 255)" fontSize="25px" />
          </div>
        </div>
        <div className="message">
          {/* left message start */}
          <div className="left_msg">
            <div className="left_text">
              <p>Hello how are you</p>
            </div>
            <span>Today, 2:30pm</span>
          </div>
          {/* left message end */}
          {/* right message start */}
          <div className="right_msg">
            <div className="right_text">
              <p>
                Hello how are you Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Labore natus error inventore molestias
                accusamus impedit illo iusto repudiandae est amet,
                necessitatibus ipsum! Earum cupiditate hic sapiente tenetur
                corporis temporibus reprehenderit incidunt quos omnis cumque
                quam exercitationem id fugit suscipit voluptas, tempore
                praesentium, optio dignissimos obcaecati, explicabo sequi culpa
                repellendus quas!
              </p>
            </div>
            <span>Today, 2:30pm</span>
          </div>
          {/* right message end */}
          {/* left message start */}
          <div className="left_msg">
            <div className="left_img">
              <ModalImage
                small={"./images/men.jpg"}
                large={"./images/men.jpg"}
                alt="Hello World!"
              />
            </div>
            <span>Today, 2:30pm</span>
          </div>
          {/* left message end */}
          {/* right message start */}
          <div className="right_msg">
            <div className="right_img">
              <ModalImage
                small={"./images/men.jpg"}
                large={"./images/men.jpg"}
                alt="Hello World!"
              />
            </div>
            <span>Today, 2:30pm</span>
          </div>
          {/* right message end */}
          {/* left message start */}
          <div className="left_msg">
            <audio controls src=""></audio>
            <span>Today, 2:30pm</span>
          </div>
          {/* left message end */}
          {/* right message start */}
          <div className="right_msg">
            <audio controls src=""></audio>
            <span>Today, 2:30pm</span>
          </div>
          {/* right message end */}
          {/* left message start */}
          <div className="left_msg">
            <video controls src=""></video>
            <span>Today, 2:30pm</span>
          </div>
          {/* left message end */}
        </div>
        <div className="message-inputs">
          <div className="text_inputs">
            <input type="text" />
            <div className="options">
              <div onClick={() => setOpen(!open)}>
                <BsPlusLg />
              </div>

              {open && (
                <div className="more">
                  <div className="camera">
                    <div>
                      <div onClick={() => setOpenCam(true)}>
                        <AiOutlineCamera fontSize={30} />
                      </div>
                    </div>
                  </div>
                  <label className="galleryX">
                    <div onClick={() => chooseFile.current.click()}>
                      <TfiGallery />
                    </div>
                    <input
                      hidden
                      // onChange={handleImageUpload}
                      type="file"
                      ref={chooseFile}
                    />
                  </label>
                  <div className="voiceRec">
                    <div>
                      <div>
                        <MdOutlineKeyboardVoice fontSize={30} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className="message_send">
            <FaPaperPlane />
          </button>
        </div>
        {openCam && (
          <div className="capture_image">
            <div className="close" onClick={() => setOpenCam(false)}>
              <RxCross1 />
            </div>
            <Camera
              onTakePhoto={(dataUri) => {
                handleTakePhoto(dataUri);
              }}
              onCameraStop={() => {
                handleCameraStop();
              }}
              isFullscreen={false}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
