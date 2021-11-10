import React, {useState,useEffect} from "react";

import './Fonts.css';

const Title = ({title}) => <h1 className="title">{title}</h1>

const Bio = ({bio}) => <span className="bio">{bio}</span>

const Info = ({info, extraClass}) => <span className={`info ${extraClass}`}>{info}</span>

const Answer = ({answer}) => <span className="answer">{answer}</span>

const Message = ({message}) => {
    const [fontSize, setFontSize] = useState("xxl")

    useEffect(() => {
        let msgLen = message.length;
        switch(true){
            case msgLen <= 8:
                setFontSize("xxl");
                break;
            case msgLen <= 14:
                setFontSize("xl");
                break;
            case msgLen <= 50: 
                setFontSize("lg");
                break;
            case msgLen <= 150:
                setFontSize("md");
                break;
            case msgLen <= 200:
                setFontSize("sm");
                break;
            default:
                setFontSize("xs");
        }
    }, [message])
    
    return <span className={`message ${fontSize}`}>{message}</span>
}

export {Title, Bio, Message, Info, Answer}
