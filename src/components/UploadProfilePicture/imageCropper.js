import { Button } from "@mui/material";
import React from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { AiOutlineClose } from "react-icons/ai";

const ImageCropper = ({
  image,
  setImage,
  cropData,
  setCropper,
  getCropData,
}) => {
  return (
    <>
      <div className="crop_image_box">
        <div className="upload_header">
          <h4>Upload Profile Picture</h4>
          <div className="close" onClick={() => setImage()}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="preview-photo">
          <div className="img-preview"></div>
        </div>
        <div className="crop-images">
          <Cropper
            style={{ height: 400, width: "100%" }}
            zoomTo={0.5}
            initialAspectRatio={1}
            preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        </div>
        <div className="upload-btn">
          <Button variant="contained" onClick={getCropData}>
            Upload Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default ImageCropper;
