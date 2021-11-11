import React, {useEffect, useState} from "react";
import './Toast.css';
import { ToastText } from "../Typography/Fonts.component";

const Toast = ({toast}) => {
    const [show, setShow] = useState("");
    useEffect(() => {
        console.log("toast");
        setShow("show");

        setTimeout(() => {
            setShow("kill")
            return 
        }, 5500)
    }, [])

    return (
        <div className={`toast ${show}`}><ToastText toast={toast} /></div>
    )
}

export default Toast;