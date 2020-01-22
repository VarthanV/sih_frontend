import React from "react";
import { baseImgRoute } from "./helperConstants";

export default function Achievements({ title, image, description }) {
  const createMarkup = () => {
    console.log(image);
    
    return { __html: description.toString()};

  
  };

  return (
    <div>
      <img src={baseImgRoute + image} width="50%" alt={title}></img> 
  <h1>{title}</h1>
      <div dangerouslySetInnerHTML={createMarkup()} />
    </div>
  );
}
