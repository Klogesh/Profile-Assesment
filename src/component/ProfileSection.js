import React from "react";
import avatar from '../asset/imaegs/cover.jpg';
import profile from '../asset/imaegs/Vector.jpg';

const ProfileSection = ({ profileImage, handleUpdateClick }) => {
  return (

    <div className="Profile-sec">
      <div className="profilecover">
        <div className="baavatarimg">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="profileimg">
          <img
            src={profileImage || profile}
            alt="Profile"
            style={{ maxWidth: "200px", maxHeight: "200px", marginBottom: "10px" }}
          />
        </div>
      </div>
      <div className="updatebtn">
        <button onClick={handleUpdateClick}>Update picture</button>
      </div>
      <div className="profilename">
        <h2>Jack Smith</h2>
        <p>@kingjack <span>.</span> Senior Product Designer <span>at</span> Webflow <span>He/Him</span></p>
      </div>
    </div>
  );
}

export default ProfileSection;
