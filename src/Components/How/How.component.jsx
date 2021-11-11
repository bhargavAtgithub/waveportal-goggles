import React from "react";

import { Card } from "..";
import { TextContainer, Fonts } from "..";

const HowCard = ({onClose}) => {
    return (
        <Card onClose={onClose}>
            <TextContainer left m>
            <Fonts.How text="You can wave only once every 15 minutes." />
            </TextContainer>
            <TextContainer left m>
            <Fonts.How text="If you are lucky you might win some eth." />
            </TextContainer>
            <TextContainer left m>
            <Fonts.How text="You can check this by -" />
            </TextContainer>
            <TextContainer left>
            <Fonts.How text="1. Click on your wallet address under your wave." />
            </TextContainer>
            <TextContainer left>
            <Fonts.How text='2. In etherscan, click on Txn hash which belongs to your wave (In column "from", find your wallet address).' />
            </TextContainer>
            <TextContainer left>
            <Fonts.How text='3. If you have won eth, you will find TRANSFER in "To" row. ' />
            </TextContainer>
            <TextContainer left m>
            <Fonts.How text='Ususally a wave takes ~ 0.0002 eth (gas cost included). If you win, you will receive 0.001 eth.' />
            </TextContainer>
        </Card>
    )
}

export default HowCard;