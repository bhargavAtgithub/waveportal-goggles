import React from "react";
import { Fonts } from "..";
import { Divider } from "..";

const Help = () => {
    return (
    <>
        <Fonts.Bio bio="You have to Connect with metamask to view all the waves." />
        <Divider />
        <Fonts.Bio bio="What is Metamask?" />
        <Fonts.Answer answer={ `MetaMask is crypto-wallet to store and transact ethereum or any other ERC-20 tokens.It also allows our Dapp (decentralized application) Waves Portal to interact with Ethereum blockchain. Metamask signs our transactions securely and them miners will start mining.`} />
        <Divider />
        <Fonts.Bio bio="Do you need to buy Ethereum to wave?"/>
        <Fonts.Answer answer={`No. Waves portal is deployed on Rinkeby Test Networks, which are simply forks of mainnets but with different consensus mechanisms or sometimes same as mainnet.
        But you still need to have ethereum on your metamask to wave ( let's get you some ethereum :p ).  
        `} />
        <Divider />
        <Fonts.Bio bio="So how do get some ethereum to wave?" />
        <Fonts.Answer answer={`
1. Create a metamask account. ( FYI : You have to install Metamask browser extension or install app on your mobile to sign the transactions. )
2. Then go to https://faucet.rinkeby.io/ or https://buildspace-faucet.vercel.app/ And get some Eth (🤑  FYI : they are fake Eths)
3. In your metamask (chrome extension or app), change your network to Rinkeby Test Network.
3. Come back to Wave Portal. Connect your meta mask. And send me wave. You can also write a note.
        `} />
        <Divider />
        <Fonts.Bio bio="I'll catch your wave :)" />
    </> 
    )
}

export default Help;
