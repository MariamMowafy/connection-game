
import styled from "@emotion/styled"
import { Timer } from "./components/Timer";
import { Cards } from "./components/Cards";

const TitleWrapper = styled.div`
    width: 100%;
    justify-content: space-around;
    display: flex;
    align-items: center;
`;

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    `;


export const Game = () => {
    return (
        <ContentWrapper>
            <TitleWrapper>
                <h2>Find 4 Groups of 4 Words</h2>
                <Timer />
            </TitleWrapper>
            <Cards />
        </ContentWrapper>
    )
}