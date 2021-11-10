import React from "react";
import "./Button.css";

const Button = ({title, onClick}) => <div className="waveButtonWrapper"><button className="waveButton" onClick={onClick}>{title}</button></div>

export default Button;