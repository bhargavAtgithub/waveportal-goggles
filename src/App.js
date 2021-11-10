import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import ABI from "./utils/wavePortal.json";
import  * as Components from "./Components";
export default function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([])
  const [waveMsg, setWaveMsg] = useState("👋");
  const [buttonTitle, setButtonTitle] = useState("Send Wave");

  const contractAddress = "0xCB5604Dd43b1896961CE0f47c136D5981c56F960";

  const contractABI = ABI.abi;

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const waves = await wavePortalContract.getAllWaves();
        
        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });
        wavesCleaned = wavesCleaned.reverse();
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {     
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return
      } else {
        console.log("We have ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorised account:", account);
        setCurrentAccount(account);
        getAllWaves();
      } else {
        console.log("No authorised account found");
      }
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Allow user to connect wallet
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get metamask');
        return
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0])
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const wave = async () => {
    setButtonTitle("Opening Metamask...")
    try {
      const {ethereum} = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const waveTxn = await wavePortalContract.wave(waveMsg);
        console.log("mining...", waveTxn.hash);
        setButtonTitle("Mining...");
        
        await waveTxn.wait();
        console.log("mined--", waveTxn.hash);
        setButtonTitle("Woohoo! Mined");
        
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        getAllWaves();
        setButtonTitle("Send Wave")
        setWaveMsg("👋")
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Components.MainContainer>
      <Components.Container containerPosition={1}>
        <Components.WaveIcon />
        <Components.TextContainer>
          <Components.Fonts.Title title={"Waves Portal"} />
        </Components.TextContainer>
        <Components.TextContainer>
          <Components.Fonts.Bio bio="I am Bhargav and welcome to my world of dapps." />
        </Components.TextContainer>
        <Components.TextContainer>
          <Components.Fonts.Bio bio="Connect your Ethereum wallet and wave at me!" />
        </Components.TextContainer>
        {
          !currentAccount ? 
          <Components.Button title="Connect Metamask" onClick={connectWallet}/> :
          <>
            <Components.Textarea 
              value={waveMsg} 
              placeholder={"Stary typing..."} 
              onChange={(e) => setWaveMsg(e.target.value)} 
            />
            <Components.Button title={buttonTitle} onClick={buttonTitle === "Send Wave" ? wave : () => {}} /> 
          </>

        }
      </Components.Container>
      <Components.Container containerPosition={2}>
        <Components.TextContainer>
          <Components.Fonts.Info info="All the waves" />
        </Components.TextContainer>
        <Components.Divider />
        {
          !allWaves.length && 
            <Components.Help />
        }
        {
          allWaves.map((wave, index) => 
          <>
            <Components.Waves waveDetails={wave} key={`wave_${index}`}/>
            <Components.Divider />
          </>)
        }
      </Components.Container>
    </Components.MainContainer>
  );
}
