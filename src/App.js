import * as React from "react";
// import { ethers } from "ethers";
import './App.css';

export default function App() {

  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        <span role="img" aria-label="wave">👋</span> Hey there!
        </div>

        <div className="bio">
        I am Bhargav and welcome to my world of dapps. Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}
