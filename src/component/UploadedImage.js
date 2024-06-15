import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import "./UploadedImage.css"; // Import your CSS file for component-specific styles
import closeicon from '../asset/imaegs/close-icon.png';
import cropicon from '../asset/imaegs/crop-btn.png'
import deleteicon from '../asset/imaegs/delete-btn.png'

const UploadedImage = ({ file, index, handleDelete, handleImageClick, isSelected, handleCroppedImage }) => {
  const [isCropping, setIsCropping] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const editorRef = useRef(null);

  const handleCropButtonClick = () => {
    setIsCropping(true);
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImageData = canvas.toDataURL();
      setCroppedImage(croppedImageData);
      handleCroppedImage(index, croppedImageData); // Pass cropped image data to parent
      setIsCropping(false);
    }
  };

  const handleCancelCrop = () => {
    setIsCropping(false);
  };

  const formatFileSize = (size) => {
    if (size < 1024) return size + " bytes";
    else if (size < 1048576) return (size / 1024).toFixed(1) + " KB";
    else return (size / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="uploaded-image-container">
      <div className="imgbox">
        <div
          className={`uploaded-image-preview ${isSelected ? "selected" : ""}`}
          onClick={() => handleImageClick(index)}
        >
          {croppedImage ? (
            <img
              src={croppedImage}
              alt={`Cropped ${index + 1}`}
              className="uploaded-image"
            />
          ) : (
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index + 1}`}
              className="uploaded-image"
            />
          )}
        </div>

        <div className="image-info">
          <p>{file.name}</p>
          <p>{formatFileSize(file.size)}</p>
        </div>
      </div>

      <div className="image-options">
        <input
          type="radio"
          name="selectedImage"
          checked={isSelected}
          onChange={() => handleImageClick(index)}
          style={{ marginRight: "5px" }}
        />
        <div className="optbtn">
          <button onClick={handleCropButtonClick}><img src={cropicon} /> Crop</button>
          <button onClick={() => handleDelete(index)}><img src={deleteicon} /> Delete</button>
        </div>
      </div>

      {isCropping && (
        <div className="crop-modal">
          <div className="crop-head">
            <h2>Crop your picture</h2>

            <button className="clos-btn" onClick={handleCancelCrop}>
              <img src={closeicon} alt="Close" />
            </button>
          </div>
          <AvatarEditor
            ref={editorRef}
            image={URL.createObjectURL(file)}
            width={250}
            height={250}
            border={50}
            borderRadius={125}
            className="avatar-editor"
          />
          <div className="crop-buttons">
            <button className="cancelbtn upbtn" onClick={handleCancelCrop}>Cancel</button>
            <button className="selectbtn upbtn" onClick={handleSave}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedImage;
