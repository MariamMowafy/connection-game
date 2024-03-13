import { CardsType } from "./handlers/getRandomCards";
import styled from "@emotion/styled";


type AlertProps = {
    card: CardsType;
    color: string;
}

const AlertWrapper = styled.div<{ color: string }>`
    display: flex;
    align-items: stretch;    
    flex-direction: column;
    height: 20%;
    border-radius: 5px;
    width: 50%;
    border: solid 1px;
    border-color: ${(p) => p.color};
    margin-bottom: 10px;
`;
const AlertHeader = styled.div<{ color: string }>`
    background-color: ${(p) => p.color};
`;

const AlertContent = styled.div`
`;

export const SuccessfullAlert = (props: AlertProps) => {
    return (

        <AlertWrapper color={props.color}>
            <AlertHeader color={props.color}>
                <p>{props.card.type}</p>
            </AlertHeader>
            <AlertContent>
                <p>{props.card.words[0] + " - " + props.card.words[1] + " - " + props.card.words[2] + " - " + props.card.words[3]}</p>
            </AlertContent>
        </AlertWrapper>
    )
}
