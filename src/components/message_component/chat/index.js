/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { FaEllipsisV } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineCamera } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";
import Camera from "react-html5-camera-photo";
import Tooltip from "@mui/material/Tooltip";
import "react-html5-camera-photo/build/css/index.css";
// import { AiOutlineRight } from "react-icons/ai";
// import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadBytesResumable,
  getDownloadURL,
  uploadString,
  uploadBytes,
} from "firebase/storage";
import moment from "moment/moment";
import { v4 as uuidv4 } from "uuid";
import ModalImage from "react-modal-image";
import { AudioRecorder } from "react-audio-voice-recorder";
import { Button } from "@mui/material";
const Chat = () => {
  const firstMsg = useRef();
  const [grpmembers, setGrpmembers] = useState();
  const [grpmsgsglist, setGrpmsgsglist] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCam, setOpenCam] = useState(false);
  const [msg, setMsg] = useState("");
  const [blob, setBlob] = useState();
  const [audiourl, setAudiourl] = useState();
  const [showaudio, setShowaudio] = useState(false);
  const [msgList, setMsgList] = useState([]);
  const [isactive, setIsactive] = useState([]);
  const chooseFile = useRef(null);
  const user = useSelector((state) => state.login.loggedIn);
  const activeChatName = useSelector((active) => active.active.activeChat);
  const db = getDatabase();
  const storage = getStorage();

  function handleTakePhoto(dataUri) {
    // setCaptureImage(dataUri);
    const storageRef = sref(storage, uuidv4());
    uploadString(storageRef, dataUri, "data_url").then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        if (activeChatName?.status === "single") {
          set(push(ref(db, "singleMessage")), {
            myuserid: user.uid,
            myusername: user.displayName,
            myuserImage: user.photoURL,
            myreciverid: activeChatName.id,
            myrecivername: activeChatName.name,
            message: msg,
            img: downloadURL,
            date: ` ${new Date().getFullYear()} - ${
              new Date().getMonth() + 1
            } - ${new Date()} ${new Date().getHours()} : ${new Date().getMinutes()} `,
          }).then(() => {
            setOpenCam(false);
          });
        } else if (activeChatName?.status === "group") {
          set(push(ref(db, "groupMessage")), {
            myuserid: user.uid,
            myusername: user.displayName,
            myuserImage: user.photoURL,
            myreciverid: activeChatName?.id,
            myrecivername: activeChatName?.name,
            adminid: activeChatName?.adminid,
            message: msg,
            img: downloadURL,
            date: ` ${new Date().getFullYear()} - ${
              new Date().getMonth() + 1
            } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()} `,
          }).then(() => {
            setOpenCam(false);
          });
        }
      });
    });
  }
  // function handleTakePhoto(dataUri) {
  //   const storage = getStorage();
  //   // console.log(dataUri);
  //   const storageRef = sref(storage, uuidv4());
  //   console.log("hhhh", storageRef);

  //   uploadString(storageRef, dataUri, "data_uri").then((snapshot) => {
  //     console.log("snapshot", snapshot);
  //     // getDownloadURL(storageRef).then((downloadURL) => {
  // set(push(ref(db, "singleMessage")), {
  //   myuserid: user.uid,
  //   myusername: user.displayName,
  //   myreciverid: activeChatName.id,
  //   myrecivername: activeChatName.name,
  //   message: msg,
  //   img: downloadURL,
  //   date: ` ${new Date().getFullYear()} - ${
  //     new Date().getMonth() + 1
  //   } - ${new Date()} ${new Date().getHours()} : ${new Date().getMinutes()} `,
  // }).then(() => {
  //   setOpenCam(false);
  // });
  //     //   // console.log("File available at", downloadURL);
  //     // });
  //   });
  // }

  // console.log(msgList);

  // const [direction, setDirection] = React.useState("right");
  function handleCameraStop() {
    console.log("handleCameraStop");
  }
  // const handleImageUpload = () => {};

  // send message

  const handleMsg = () => {
    if (activeChatName?.status === "single") {
      // if the input value is empty - message never send

      set(push(ref(db, "singleMessage")), {
        myuserid: user.uid,
        myusername: user.displayName,
        myuserImage: user.photoURL,
        myreciverid: activeChatName.id,
        myrecivername: activeChatName.name,
        message: msg,
        date: ` ${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()} `,
      }).then(() => {
        setMsg("");
      });
    } else if (activeChatName?.status === "group") {
      set(push(ref(db, "groupMessage")), {
        myuserid: user.uid,
        myusername: user.displayName,
        myuserImage: user.photoURL,
        myreciverid: activeChatName.id,
        myrecivername: activeChatName.name,
        adminid: activeChatName.adminid,
        message: msg,
        date: ` ${new Date().getFullYear()} - ${
          new Date().getMonth() + 1
        } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()} `,
      }).then(() => {
        setMsg("");
      });
    }
  };
  // console.log("kutta");
  // get all message
  useEffect(() => {
    const starCountRef = ref(db, "singleMessage/");
    onValue(starCountRef, (snapshot) => {
      let singleMessageArr = [];
      snapshot.forEach((item) => {
        if (
          (item.val().myuserid === user.uid &&
            item.val().myreciverid === activeChatName?.id) ||
          (item.val().myreciverid === user.uid &&
            item.val().myuserid === activeChatName?.id)
        ) {
          singleMessageArr.push(item.val());
        }
        setMsgList(singleMessageArr);
      });
    });
  }, [activeChatName, db, user.uid]);

  // get groupmembers
  useEffect(() => {
    onValue(ref(db, "groupMessage"), (snapshot) => {
      let membersArr = [];
      snapshot.forEach((item) => {
        membersArr.push(item.val().groupid + item.val().userid);
      });
      setGrpmembers(membersArr);
    });
  }, [db]);

  // get group message
  useEffect(() => {
    onValue(ref(db, "groupMessage"), (snapshot) => {
      let grpmsgArr = [];
      snapshot.forEach((item) => {
        grpmsgArr.push(item.val());
      });
      setGrpmsgsglist(grpmsgArr);
    });
  }, [activeChatName?.id, db]);

  const handleImageUpload = (e) => {
    setOpen(false);
    // console.log("ase", e.target.files[0]);
    const storageRef = sref(storage, "message" + uuidv4());

    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (activeChatName?.status === "single") {
            set(push(ref(db, "singleMessage")), {
              myuserid: user.uid,
              myusername: user.displayName,
              myuserImage: user.photoURL,
              myreciverid: activeChatName.id,
              myrecivername: activeChatName.name,
              message: msg,
              img: downloadURL,
              date: `${new Date().getFullYear()} - ${
                new Date().getMonth() + 1
              } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
            });
          } else if (activeChatName?.status === "group") {
            set(push(ref(db, "groupMessage")), {
              myuserid: user.uid,
              myusername: user.displayName,
              myuserImage: user.photoURL,
              myreciverid: activeChatName?.id,
              myrecivername: activeChatName?.name,
              adminid: activeChatName?.adminid,
              message: msg,
              img: downloadURL,
              date: ` ${new Date().getFullYear()} - ${
                new Date().getMonth() + 1
              } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()} `,
            });
          }

          console.log("File available at", downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    const starCountRef = ref(db, "loginuser");
    onValue(starCountRef, (snapshot) => {
      const activeArr = [];
      snapshot.forEach((item) => {
        if (user.uid === item.key) {
          console.log(item.key);
          activeArr.push({ ...item.val(), id: item.key });
          console.log(item.val());
        } else {
          console.log("hoise");
        }
      });
      setIsactive(...activeArr);
      localStorage.setItem("ifactive", JSON.stringify(isactive));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      if (activeChatName?.status === "single") {
        // if the input value is empty - message never send
        set(push(ref(db, "singleMessage")), {
          myuserid: user.uid,
          myusername: user.displayName,
          myuserImage: user.photoURL,
          myreciverid: activeChatName.id,
          myrecivername: activeChatName.name,
          message: msg,
          date: `${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
        }).then(() => {
          setMsg("");
        });
      } else if (activeChatName?.status === "group") {
        set(push(ref(db, "groupMessage")), {
          myuserid: user.uid,
          myusername: user.displayName,
          myuserImage: user.photoURL,
          myreciverid: activeChatName?.id,
          myrecivername: activeChatName?.name,
          adminid: activeChatName?.adminid,
          message: msg,
          date: ` ${new Date().getFullYear()} - ${
            new Date().getMonth() + 1
          } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()} `,
        }).then(() => {
          setMsg("");
        });
      }
    }
    // console.log("dkh", e.target.value);
  };

  // audio part

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    setAudiourl(url);
    setBlob(blob);
    // document.body.appendChild(audio);
  };

  const handleAudioUpload = () => {
    const storage = getStorage();
    const audiostorageRef = sref(storage, audiourl);

    // 'file' comes from the Blob or File API
    uploadBytes(audiostorageRef, blob).then((snapshot) => {
      getDownloadURL(audiostorageRef).then((downloadURL) => {
        if (activeChatName?.status === "single") {
          set(push(ref(db, "singleMessage")), {
            myuserid: user.uid,
            myusername: user.displayName,
            myuserImage: user.photoURL,
            myreciverid: activeChatName.id,
            myrecivername: activeChatName.name,
            audio: downloadURL,
            date: `${new Date().getFullYear()} - ${
              new Date().getMonth() + 1
            } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()}`,
          }).then(() => {
            setAudiourl("");
          });
        } else if (activeChatName?.status === "group") {
          set(push(ref(db, "groupMessage")), {
            myuserid: user.uid,
            myusername: user.displayName,
            myuserImage: user.photoURL,
            myreciverid: activeChatName?.id,
            myrecivername: activeChatName?.name,
            adminid: activeChatName?.adminid,
            audio: downloadURL,
            date: ` ${new Date().getFullYear()} - ${
              new Date().getMonth() + 1
            } - ${new Date().getDate()} ${new Date().getHours()} : ${new Date().getMinutes()} `,
          }).then(() => {
            setAudiourl("");
          });
        }
      });
    });
  };

  useEffect(() => {
    firstMsg?.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgList, grpmsgsglist]);
  return (
    <>
      <div className="chatting_box">
        <div className="active_user_status">
          <div className="user_image">
            {activeChatName === null ? (
              ""
            ) : (
              <div className="image_wrap">
                <img src={activeChatName?.picture} alt="" />
              </div>
            )}

            <div className="info">
              {}
              {activeChatName === null ? "" : <h4>{activeChatName.name}</h4>}
              {isactive?.length > 0 ? (
                <span>Offline</span>
              ) : (
                <span>Online</span>
              )}
              {/* {isactive.id === user.uid ? (
                <span>Online</span>
              ) : (
                <span>Offline</span>
              )} */}
            </div>
          </div>
          <div className="info_bar">
            <FaEllipsisV color="rgb(83, 83, 255)" fontSize="25px" />
          </div>
        </div>
        <div className="message">
          {/* left message start */}

          {
            activeChatName?.status === "single"
              ? msgList.map((item, i) => (
                  <div key={i} ref={firstMsg}>
                    {item.myuserid === user.uid ? (
                      item.message ? (
                        <div className="right_msg">
                          <Tooltip title={item.myusername}>
                            <div className="chatprofile_right">
                              <img src={user.photoURL} alt="" />
                            </div>
                          </Tooltip>
                          <div className="right_text">
                            <p>{item.message}</p>
                          </div>
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      ) : item.img ? (
                        <div className="right_msg">
                          <Tooltip title={item.myusername}>
                            <div className="chatprofile_right">
                              <img src={user.photoURL} alt="" />
                            </div>
                          </Tooltip>
                          <div className="right_img">
                            <ModalImage
                              small={item.img}
                              large={item.img}
                              alt=""
                            />
                          </div>
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      ) : item.audio ? (
                        <div className="right_msg">
                          <Tooltip title={item.myusername}>
                            <div className="chatprofile_right">
                              <img src={user.photoURL} alt="" />
                            </div>
                          </Tooltip>
                          <div className="right_img">
                            <audio controls src={item.audio}></audio>
                          </div>
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      ) : (
                        ""
                      )
                    ) : item.message ? (
                      <div className="left_msg">
                        <Tooltip title={item.myusername}>
                          <div className="chatprofile_left">
                            <img src={activeChatName?.picture} alt="" />
                          </div>
                        </Tooltip>
                        <div className="left_text">
                          <p>{item.message}</p>
                        </div>
                        <span>
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    ) : item.img ? (
                      <div className="left_msg">
                        <Tooltip title={item.myusername}>
                          <div className="chatprofile_left">
                            <img src={activeChatName?.picture} alt="" />
                          </div>
                        </Tooltip>
                        <div className="left_img">
                          <ModalImage
                            small={item.img}
                            large={item.img}
                            alt=""
                          />
                        </div>
                        <span>
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    ) : item.audio ? (
                      <div className="left_msg">
                        <Tooltip title={item.myusername}>
                          <div className="chatprofile_left">
                            <img src={activeChatName?.picture} alt="" />
                          </div>
                        </Tooltip>
                        <div className="left_img">
                          <audio controls src={item.audio}></audio>
                        </div>
                        <span>
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))
              : activeChatName?.status === "group"
              ? grpmsgsglist.map((item, i) => (
                  <div key={i}>
                    {item.myuserid === user.uid ? (
                      item.myreciverid === activeChatName?.id &&
                      (item.message ? (
                        <div className="right_msg">
                          <Tooltip title={item.myusername}>
                            <div className="chatprofile_right">
                              <img src={user.photoURL} alt="" />
                            </div>
                          </Tooltip>

                          <div className="right_text">
                            <p>{item.message}</p>
                          </div>
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      ) : item.img ? (
                        <div className="right_msg">
                          <Tooltip title={item.myusername}>
                            <div className="chatprofile_right">
                              <img src={user.photoURL} alt="" />
                            </div>
                          </Tooltip>
                          <div className="right_img">
                            <ModalImage
                              small={item.img}
                              large={item.img}
                              alt=""
                            />
                          </div>
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      ) : item.audio ? (
                        <div className="right_msg">
                          <Tooltip title={item.myusername}>
                            <div className="chatprofile_right">
                              <img src={user.photoURL} alt="" />
                            </div>
                          </Tooltip>
                          <div className="right_img">
                            <audio controls src={item.audio}></audio>
                          </div>
                          <span>
                            {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                          </span>
                        </div>
                      ) : (
                        ""
                      ))
                    ) : item.message ? (
                      <div className="left_msg">
                        <Tooltip title={item.myusername}>
                          <div className="chatprofile_left">
                            <img src={item.myuserImage} alt="" />
                          </div>
                        </Tooltip>

                        <div className="left_text">
                          <p>{item.message}</p>
                        </div>
                        <span>
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    ) : item.img ? (
                      <div className="left_msg">
                        <Tooltip title={item.myusername}>
                          <div className="chatprofile_left">
                            <img src={item.myuserImage} alt="imageleft" />
                          </div>
                        </Tooltip>
                        <div className="left_img">
                          <ModalImage
                            small={item.img}
                            large={item.img}
                            alt=""
                          />
                        </div>
                        <span>
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    ) : item.audio ? (
                      <div className="left_msg">
                        <Tooltip title={item.myusername}>
                          <div className="chatprofile_left">
                            <img src={item.myuserImage} alt="imageleft" />
                          </div>
                        </Tooltip>
                        <div className="left_img">
                          <audio controls src={item.audio}></audio>
                        </div>
                        <span>
                          {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))
              : ""

            // user?.uid === activeChatName?.adminid ||
            //   grpmembers?.includes(activeChatName?.id + user.uid)
            // ? grpmsgsglist.map((item, i) => (
            //     <div key={i} ref={firstMsg}>
            //       {item.myuserid === user.uid
            //         ? item.myreciverid === activeChatName?.id &&
            //           (item.message ? (
            //             <div className="right_msg">
            //               <div className="right_text">
            //                 <p>{item.message}</p>
            //               </div>
            //               <span>
            //                 {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
            //               </span>
            //             </div>
            //           ) : item.img ? (
            //             <div className="right_msg">
            //               <div className="right_img">
            //                 <ModalImage
            //                   small={item.img}
            //                   large={item.img}
            //                   alt=""
            //                 />
            //               </div>
            //               <span>
            //                 {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
            //               </span>
            //             </div>
            //           ) : item.audio ? (
            //             <div className="right_msg">
            //               <div className="right_img">
            //                 <audio controls src={item.audio}></audio>
            //               </div>
            //               <span>
            //                 {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
            //               </span>
            //             </div>
            //           ) : (
            //             ""
            //           ))
            //         : item.myreciverid === activeChatName?.id &&
            //           (item.message ? (
            //             <div className="left_msg">
            //               <div className="left_text">
            //                 <p>{item.message}</p>
            //               </div>
            //               <span>
            //                 {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
            //               </span>
            //             </div>
            //           ) : item.img ? (
            //             <div className="left_msg">
            //               <div className="left_img">
            //                 <ModalImage
            //                   small={item.img}
            //                   large={item.img}
            //                   alt=""
            //                 />
            //               </div>
            //               <span>
            //                 {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
            //               </span>
            //             </div>
            //           ) : item.audio ? (
            //             <div className="left_msg">
            //               <div className="left_img">
            //                 <audio controls src={item.audio}></audio>
            //               </div>
            //               <span>
            //                 {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
            //               </span>
            //             </div>
            //           ) : (
            //             ""
            //           ))}
            //     </div>
            //   ))
            // : ""
          }
          {/* {activeChatName?.status === "single"
            ? msgList.map((item, i) =>
                item.myuserid === user.uid ? (
                  item.myuserid === user.uid ? (
                    <div className="right_msg">
                      <div className="right_text">
                        <p>{item.message}</p>
                      </div>
                      <span>
                        {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      </span>
                    </div>
                  ) : (
                    <div>{item.img}</div>
                  )
                ) : (
                  <div className="left_msg">
                    <div className="left_text">
                      <p>{item.message}</p>
                    </div>
                    <span>{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</span>
                  </div>
                )
              )
            : "grp msg"} */}
          {/* <div className="left_msg">
            <div className="left_text">
              <p>Hello how are you</p>
            </div>
            <span>Today, 2:30pm</span>
          </div> */}
          {/* left message end */}
          {/* right message start */}
          {/* <div className="right_msg">
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
          </div> */}
          {/* right message end */}
          {/* left message start */}
          {/* <div className="left_msg">
            <div className="left_img">
              <ModalImage
                small={"./images/men.jpg"}
                large={"./images/men.jpg"}
                alt="Hello World!"
              />
            </div>
            <span>Today, 2:30pm</span>
          </div> */}
          {/* left message end */}
          {/* right message start */}
          {/* <div className="right_msg">
            <div className="right_img">
              <ModalImage
                small={"./images/men.jpg"}
                large={"./images/men.jpg"}
                alt="Hello World!"
              />
            </div>
            <span>Today, 2:30pm</span>
          </div> */}
          {/* right message end */}
          {/* left message start */}
          {/* <div className="left_msg">
            <audio controls src=""></audio>
            <span>Today, 2:30pm</span>
          </div> */}
          {/* left message end */}
          {/* right message start */}
          {/* <div className="right_msg">
            <audio controls src=""></audio>
            <span>Today, 2:30pm</span>
          </div> */}
          {/* right message end */}
          {/* left message start */}
          {/* <div className="left_msg">
            <video controls src=""></video>
            <span>Today, 2:30pm</span>
          </div> */}
          {/* left message end */}
        </div>
        <div className="message-inputs">
          {!showaudio && !audiourl && (
            <div className="text_inputs">
              <input
                type="text"
                onKeyUp={handleEnterPress}
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />

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
                    <div className="galleryX">
                      <div onClick={() => chooseFile.current.click()}>
                        <TfiGallery />
                      </div>
                      <input
                        hidden
                        onChange={handleImageUpload}
                        type="file"
                        ref={chooseFile}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="recorderbtn" onClick={() => setShowaudio(!showaudio)}>
            {/* <BsMicFill fontSize={16} /> */}
            <AudioRecorder
              onRecordingComplete={(blob) => addAudioElement(blob)}
              // audioTrackConstraints={{
              //   noiseSuppression: true,
              //   echoCancellation: true,
              // }}
              // downloadOnSavePress={true}
              // downloadFileExtension="webm"
            />
          </div>
          {!showaudio && !audiourl && (
            <button className="message_send" onClick={handleMsg}>
              <FaPaperPlane />
            </button>
          )}

          {audiourl && (
            <>
              <div className="audio_wrapper">
                <audio controls src={audiourl}></audio>
                <Button className="audio_send" onClick={handleAudioUpload}>
                  Send
                </Button>
                <Button
                  className="audio_delete"
                  onClick={() => setAudiourl("")}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
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
