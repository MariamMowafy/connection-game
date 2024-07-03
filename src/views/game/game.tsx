
import styled from "@emotion/styled"
import { Timer } from "./components/Timer/timer";
import { Cards } from "./components/Cards/cards";
import { useState } from 'react';
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
      const playerName = localStorage.getItem('playerName') || '';
      const [elapsedTime, setElapsedTime] = useState(0);
      const [isGameOver, setIsGameOver] = useState(false);
  
      return (
          <ContentWrapper> 
              <TitleWrapper>
                  <h2>Find 4 Groups of 4 Words</h2>
                  <Timer elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} isGameOver={isGameOver} />
              </TitleWrapper>
              <Cards playerName={playerName} elapsedTime={elapsedTime} setIsGameOver={setIsGameOver} />
          </ContentWrapper>
      )
  }
