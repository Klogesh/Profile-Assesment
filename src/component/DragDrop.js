import React, { useState } from "react";
import ProfileSection from './ProfileSection';
import ImageUploader from './ImageUploader';
import closeicon from '../asset/imaegs/close-icon.png';

function DragDrop() {
  const [files, setFiles] = useState([]);
  const [profileImage, setProfileImage] = useState(null); 
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [croppedImages, setCroppedImages] = useState({});
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);

  const handleChange = (newFiles) => {
    if (files.length + newFiles.length > 5) {
      alert(`You can only upload a maximum of 5 files.`);
      return;
    }
    setTimeout(() => {
      setFiles([...files, ...newFiles]);
    }, 2000);
  };

  const handleDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);

    const updatedCroppedImages = { ...croppedImages };
    delete updatedCroppedImages[index];
    setCroppedImages(updatedCroppedImages);

    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
    }
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCroppedImage = (index, croppedImageData) => {
    setCroppedImages((prev) => ({ ...prev, [index]: croppedImageData }));
  };

  const handleSelectProfileImage = () => {
    if (selectedImageIndex !== null) {
      const imageToSet = croppedImages[selectedImageIndex] || URL.createObjectURL(files[selectedImageIndex]);
      setProfileImage(imageToSet);
      setIsUpdateClicked(false);
    }
  };

  const handleUpdateClick = () => {
    setIsUpdateClicked(true);
  };

  const handleCloseClick = () => {
    setIsUpdateClicked(false);
  };

  return (
    <div>
      {isUpdateClicked && (
        <div className="dragdrop clicked">
          <button className="clos-btn" onClick={handleCloseClick}>
            <img src={closeicon} alt="Close" />
          </button>
          <ImageUploader 
            files={files} 
            handleChange={handleChange} 
            handleDelete={handleDelete} 
            handleImageClick={handleImageClick} 
            handleSelectProfileImage={handleSelectProfileImage} 
            selectedImageIndex={selectedImageIndex}
            handleCloseClick={handleCloseClick}
            croppedImages={croppedImages} // Pass cropped images data
            handleCroppedImage={handleCroppedImage} // Pass handler for cropped image
          />
        </div>
      )}
      <ProfileSection 
        profileImage={profileImage} 
        handleUpdateClick={handleUpdateClick}
      />
    </div>
  );
}

export default DragDrop;
