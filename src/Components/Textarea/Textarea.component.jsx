import React from "react";
import "./Textarea.css";
import { Info } from "../Typography/Fonts.component";

const Textarea = ({value, placeholder, onChange}) => {

    const autoResize = (e) => {
            e.target.style.height = "";
            e.target.style.height = (e.target.scrollHeight) + "px";
    }

    return (
        <div className="textarea-wrapper">
            <textarea className="textarea" placeholder={placeholder} value={value} onChange={onChange} maxLength={280} onKeyUp={autoResize}/>
            <div className="count"><Info info={`${value.length}/280`} /></div>
        </div>
    )
}

export default Textarea;