import React from "react";
import { Fonts } from "..";
import { Divider } from "..";

const Help = () => {
    return (
    <>
        <Fonts.Bio bio="You have to Connect with metamask to view all the waves." />
        <Divider />
        <Fonts.Bio bio="What is Metamask?" />
        <Fonts.Answer answer={ `MetaMask is crypto-wallet to store and transact ethereum or any other ERC-20 tokens.It also allows our Dapp (decentralized application) Waves Portal to interact with Ethereum blockchain. Metamask signs our transactions securely and then miners will start mining.`} />
        <Divider />
        <Fonts.Bio bio="Do you need to buy Ethereum to wave?"/>
        <Fonts.Answer answer={`No. Waves portal is deployed on Rinkeby Test Networks, which are simply forks of mainnets but with different consensus mechanisms or sometimes same as mainnet.
        But you still need to have ethereum on your metamask to wave ( I mean fake eths XD  ).  
        `} />
        <Divider />
        <Fonts.Bio bio="So how do get some ethereum to wave?" />
        <Fonts.Answer answer={`
1. Create a metamask account. ( FYI : You have to install Metamask browser extension or install app on your mobile to sign the transactions.) Yes! It's a lengthy process. But some day, you will need a crypto wallet for your NFTs.
2. Then go to https://faucet.rinkeby.io/ or https://buildspace-faucet.vercel.app/ And get some Fake Eths to your address. (Becareful with your private keys.)
3. In your metamask (chrome extension or app), change your network to Rinkeby Test Network.
3. Come back to Wave Portal. Connect your meta mask. And send me wave. You can also write a note.
        `} />
        <Divider />
        <Fonts.Bio bio="Important info for mobile users." />
        <Fonts.Answer answer="Since mobile chrome doesn't allow addons, we have to use this in Metamask in-app browser. Even getting ethers from the above mentioned site are possible in meta-mask and not in chrome. It's a beautiful app btw." />
        <Fonts.Bio bio="I'll catch your wave :)" />
    </> 
    )
}

export default Help;
