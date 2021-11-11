import React from "react";

import './Waves.css';

import { Message, Info, Bio } from "../Typography/Fonts.component";

const Waves = ({waveDetails : {message = "", address = "", timestamp = ""} = {}}) => {
    return (
            <div className="waveDetails">
                <Message message={message} />
                <Bio bio="Waved by:" />
                <a className="link" target="_blank" rel="noopener noreferrer" href={`https://rinkeby.etherscan.io/address/${address}`}>
                    <Info info={address} extraClass="link"/>
                </a>
                <Info info={`at ${timestamp.getDate()}/${timestamp.getMonth() + 1}/${timestamp.getFullYear()} ${timestamp.getHours()}:${timestamp.getMinutes()<10?'0':''}${timestamp.getMinutes()}`} />
            </div>
    )
}

export default Waves;