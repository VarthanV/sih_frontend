import React from "react";
import { baseImgRoute } from "./helperConstants";
import '../css/login.css'

export default function Achievements({ title, image, description }) {
  const createMarkup = () => {
    console.log(image);
    
    return { __html: description.toString()};

  
  };

  return (
    <div className="row achievement">
      <div className="row achievement">
        <div className="col-sm-4 col-lg-2">
          <div className="user-img-div">
              <img 
                  className="user-img"
                  src = { baseImgRoute + image }
              />
          </div>
        </div>
        <div className="col ml-3 mt-2">
          <div className="row emp-di-title">{ title }</div>
          <div className="row emp-d-description" dangerouslySetInnerHTML={createMarkup()} />
        </div>
      </div>
    </div>
  );
}
