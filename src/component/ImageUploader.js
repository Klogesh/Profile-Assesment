import React from "react";
import { FileUploader } from "react-drag-drop-files";
import UploadedImage from './UploadedImage';
import uploadicon from '../asset/imaegs/Thumbnail Icons.png';


const fileLabel = "Click or drag and drop to upload ";
const fileLabel2 = "PNG or JPG (Max 5MB)";

const fileTypes = ["PNG", "JPG"];

const ImageUploader = ({ files, handleChange, handleDelete, handleImageClick, handleCloseClick,  handleSelectProfileImage, selectedImageIndex, handleCroppedImage }) => {

  

  return (
  
    <div>
      <div className="drogbox-con">
      <h2>Upload image(s)</h2>
      <p>You may upload up to 5 images</p>
      </div>
      
      <div className="drogbox">
        <img src={uploadicon} alt="updateimg" className="uploadicon"/>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} label={fileLabel} multiple /> 
      <p className="filelable2">{fileLabel2}</p>
      </div>
      {files.length > 0 && (
        <div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {files.map((file, index) => (
              <UploadedImage 
                key={index} 
                file={file} 
                index={index} 
                handleDelete={handleDelete} 
                handleImageClick={handleImageClick} 
                isSelected={selectedImageIndex === index} 
                handleCroppedImage={handleCroppedImage} // Pass the handler down to UploadedImage
              />
            ))}
          </div>
          <div className="dragdropbtn">
          <button className="cancelbtn upbtn" onClick={handleCloseClick}>Cancel</button>
          <button className="selectbtn upbtn" onClick={handleSelectProfileImage}>Select Image</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
