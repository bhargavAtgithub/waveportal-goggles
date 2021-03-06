import React from "react";

import './Containers.css';

const MainContainer = ({children}) => {
    return (
        <div className={"mainContainer"}>
            {children}
        </div>
    )
}

const Container = ({children, containerPosition}) => {
    return(
        <div className={`container container-${containerPosition}`}>
            {children}
        </div>
    )
}

const TextContainer = ({children, left, m}) => <div className={`textContainer ${!!left ? "left" : ''} ${!!m ? "m" : ""}`}>{children}</div>

const ToastContainer = ({children}) => <div className="toastContainer">{children}</div>

export {MainContainer, Container, TextContainer, ToastContainer};