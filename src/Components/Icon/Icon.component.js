import React from "react";
import './Icon.css';

const Icon = ({src, alt, onClick}) => <img className="icon" src={src} alt={alt} onClick={onClick} />

export default Icon;