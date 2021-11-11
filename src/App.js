import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import './App.css';
import ABI from "./utils/wavePortal.json";
import  * as Components from "./Components";
import I from './assets/i.svg';

export default function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([])
  const [waveMsg, setWaveMsg] = useState("👋");
  const [buttonTitle, setButtonTitle] = useState("Send Wave");
  const [toastQueue, setToastQueue] = useState([]);
  const [displayCard,setDisplayCard] = useState(false);

  const contractAddress = "0xb120930E6A283daEe264Be0D2c38F3fB33cB6A25";

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
          console.log(wave)
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
    let wavePortalContract;

    const onNewWave = (from, message, timestamp) => {
      console.log('NewWave', from, timestamp, message);
      setAllWaves(prevState => {
        console.log(from, timestamp, message)
        return[        
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
        },
        ...prevState
      ]}
      );
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
  
      wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
      wavePortalContract.on('NewWave', onNewWave);
    }
  
    return () => {
      if (wavePortalContract) {
        wavePortalContract.off('NewWave', onNewWave);
      }
    };
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  const wave = async () => {
    let temp = [...toastQueue, 'Opening Metamask...'];
    setToastQueue([...temp])
    setButtonTitle("...")
    try {
      const {ethereum} = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);

        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        const waveTxn = await wavePortalContract.wave(waveMsg, {gasLimit: 300000});
        console.log("mining...", waveTxn.hash);
        temp.push("Mining started")
        setToastQueue([...temp])

        
        await waveTxn.wait();
        console.log("mined--", waveTxn.hash);
        temp.push("Woohoo! Mined")
        setToastQueue([...temp])
        
        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        temp.push("Waving back 👋")
        setToastQueue([...temp])

        setButtonTitle("Send Wave")
        setWaveMsg("👋")
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.error(error);
      temp.push("Couldn't mine. We have to wait for 15 min for a new wave.")
      setToastQueue(temp)
      setButtonTitle("Send Wave")
    }
  }


  return (
    <Components.MainContainer>
      {
        displayCard ?
          <Components.HowCard onClose={() => setDisplayCard(false)} /> : null
      }
      <Components.ToastContainer>
        {
          toastQueue.map((toastMsg, index) => <Components.Toast toast={toastMsg} key={`toast_${index}`} /> )
        }
      </Components.ToastContainer>
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
        
          <Components.TextContainer>
            <Components.Icon src={I} alt="info"  onClick={() => setDisplayCard(true)}/>
          </Components.TextContainer>
          
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
