import React, { useRef, useState } from "react";
import { ImImages } from "react-icons/im";
import ImageCropper from "./imageCropper";
import { getAuth, updateProfile } from "firebase/auth";
import { Loginusers } from "../../features/Slice/LoginSlice";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";

const UploadProfilePicture = ({ setOpen }) => {
  const dispatch = useDispatch();
  const user = useSelector((user) => user.login.loggedIn);
  const auth = getAuth();
  const storage = getStorage();
  const storageRef = ref(storage, user.uid);
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const chooseFile = useRef(null);
  const handleUploadProfile = (e) => {
    e.preventDefault();
    console.log(e.target.files);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setOpen(false);
            dispatch(Loginusers({ ...user, photoURL: downloadURL }));
            localStorage.setItem(
              "users",
              JSON.stringify({ ...user, photoURL: downloadURL })
            );
          });
          // console.log("File available at", downloadURL);
        });
      });
    }
  };

  return (
    <>
      <div className="uploadbox">
        <input
          type="file"
          hidden
          ref={chooseFile}
          onChange={handleUploadProfile}
        />
        <div className="upload" onClick={() => chooseFile.current.click()}>
          <div className="upload-icon">
            <ImImages />
          </div>
          Upload Picture
        </div>
        {image && (
          <ImageCropper
            image={image}
            setCropper={setCropper}
            setImage={setImage}
            cropData={cropData}
            getCropData={getCropData}
          />
        )}
      </div>
    </>
  );
};

export default UploadProfilePicture;
