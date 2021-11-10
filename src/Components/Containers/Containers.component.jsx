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

const TextContainer = ({children}) => <div className="textContainer">{children}</div>

export {MainContainer, Container, TextContainer};