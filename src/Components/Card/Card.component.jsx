import React from "react";
import './Card.css';
import { Icon, TextContainer } from "..";
import X from "../../assets/x.svg";

const Card = ({children, onClose}) => 
    <div className="card">
        <TextContainer>
            <Icon src={X} alt="Close" onClick={(e) => {
                e.stopPropagation()
                onClose()
            }} />
        </TextContainer>
        {children}
    </div>

export default Card;