import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
// import Button from "@mui/material/Button";
import "./style.css";
import UploadProfilePicture from "../UploadProfilePicture";

const PopupModel = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  return (
    <>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box className="box_modal">
              <UploadProfilePicture setOpen={setOpen} />
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default PopupModel;
