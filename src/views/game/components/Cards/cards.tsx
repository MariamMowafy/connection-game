import styled from "@emotion/styled"
import { ButtonData, CardsType, WordType, dellBlue, dellGlacier, getRandomCards, getRandomCategories } from "./handlers/getRandomCards";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { SuccessfullAlert } from "./successfulAlert";
import Papa from 'papaparse';
import { publicIpv4 } from 'public-ip';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Modal } from 'antd';
import { Dispatch, SetStateAction } from 'react';



const CardButton = styled.button`
    align-items: center;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    font-size: 15px;
    font-weight: 800;
    min-height: 30px;
    min-width: calc(13vw - 15px);
    justify-content: center;
    text-transform: uppercase;
    transition: background-color 0.3s ease;
    height: 7vw;`;

const CardsWrapper = styled.div`
    width: 50%;
`;

const Row = styled.div`
    grid-gap: 8px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    `;

const MistakesWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;`;


const WinnerWrapper = styled.div`
    height: 80vh;
    margin-top: 80px;
    font-weight: 300;
    color: green;
`;

let randomCategories = getRandomCategories();

let randomButtons = getRandomCards(randomCategories);
let selectedButtons: (WordType & ButtonData)[] = [];
let check = true;

type CardsProps = {
    playerName: string;
    elapsedTime: number;
    email: string;
    setIsGameOver: Dispatch<SetStateAction<boolean>>;
};
  
  export const Cards = ({ playerName, elapsedTime, email,  setIsGameOver }: CardsProps) => {

    const alertColors = [
        "#80C7FB",
        "#37CC5C",
        "#8E5CEF",
        "#F4BB5E"
    ]
    const [buttons, setButtons] = useState(randomButtons);
    const [message, setMessage] = useState("");
    const [submitClicked, setSubmitClicked] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const [mistakesRemaining, setMistakesRemaining] = useState(4);
    const [isModalVisible, setIsModalVisible] = useState(false);
    let [successfulCategories, setSuccessfulCategories] = useState<CardsType[]>([]);
    const [ipAddress, setIpAddress] = useState('');
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalVisible(true);
      };

      const handleOk = () => {
        setIsModalVisible(false);
        navigate('/leaderboard');
      };
      const handleCancel = () => {
        setIsModalVisible(false);
      };
      useEffect(() => {
        if (isWinner || mistakesRemaining === 0) {
          showModal();
        }
      }, [isWinner, mistakesRemaining]);
    useEffect(() => {
        const getIpAddress = async () => {
          try {
            const ip = await publicIpv4();
            setIpAddress(ip);
          } catch (error) {
            console.error('Error:', error);
          }
        };
      
        getIpAddress();
      }, []);
      useEffect(() => {
        if (isWinner || mistakesRemaining === 0) {
            setIsGameOver(true);
        }
    }, [isWinner, mistakesRemaining]);
      useEffect(() => {
        if (isWinner) {
          axios.post('http://localhost:3001/leaderboard', {
            playerName,
            elapsedTime,
            ipAddress,
            email
          })
          .catch(error => {
            console.error('Error posting to leaderboard:', error);
          });
        //   {navigate('/leaderboard')}
        }
      }, [isWinner]);
    function failedConnection(selectedButtons: (WordType & ButtonData)[]) {

        selectedButtons.forEach((selectedButton) => {
            if (selectedButton.type !== selectedButtons[0].type) {
                check = false;
                mistakesRemaining > 1 ? setMessage("Incorrect guess, please try again") : setMessage("Game Over! All attempts used up!");
                setMistakesRemaining(mistakesRemaining - 1);
            }
        })
        if (check) successfulConnection();

    }
    
    function successfulConnection() {
        // store successful group
        const successfulCategory = randomCategories.filter(category => category.type === selectedButtons[0].type)
        successfulCategories.push(successfulCategory[0]);
        // remove successful buttons from matrix
        randomButtons = randomButtons.filter(button =>
            button.type !== selectedButtons[0].type)
        // remove successful group type from remaining types
        randomCategories = randomCategories.filter(category => category.type !== selectedButtons[0].type)
        // get new IDs for remaining types
        selectedButtons.length = 0;
        randomButtons = getRandomCards(randomCategories);
        if (randomCategories.length === 0) {
            setIsWinner(true);
            setMessage("")
        } else {
            setMessage("Congratulations! You have found a group!");
        }
        setSuccessfulCategories(successfulCategories);
        setButtons(randomButtons)
       
    }
    function checkConnection(selectedButtons: (WordType & ButtonData)[]) {

        //Connection Check
        check = true;
        failedConnection(selectedButtons);
    };

    function handleSubmit() {
        checkConnection(selectedButtons)
        setSubmitClicked(true);
    }
    function handleSelections(id: number) {

        if (!buttons[id].selected) {
            selectedButtons.push(buttons[id]);
        } else {
            const unselectedIndex = selectedButtons.findIndex((unselected) =>
                unselected.id === id)
            selectedButtons.splice(unselectedIndex, 1)
        }
    }
    function handleButtonClick(id: number) {
        // Change selected button state

        setButtons((prevButtons) =>
            prevButtons.map((button) =>
                button.id === id
                    ? { ...button, selected: !button.selected, color: button.color === dellBlue ? dellGlacier : dellBlue, backgroundColor: button.backgroundColor === dellBlue ? dellGlacier : dellBlue } // Change color on selection
                    : button
            )
        );
        handleSelections(id);
    };
    const formatTime = (milliseconds: number) => {
        const secondsTotal = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(secondsTotal / 60);
        const seconds = secondsTotal % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`;
      };
    return (
        <>
              <Modal title={isWinner ? "Congratulations!" : "Game Over"}
             visible={isModalVisible}
             onOk={handleOk}
             onCancel={handleCancel}
             footer={[
               <Button key="leaderboard" type="primary" onClick={handleOk} style={{background:dellBlue,height:'40px'}}>
                 Go to Leaderboard
               </Button>
             ]} 
      >
        <p style={{color: isWinner ? 'green' : 'red', fontSize:'22px'}}>
          {isWinner ? `You won with a score of ${formatTime(elapsedTime)}` : 'Game Over! All attempts are used up.'}
        </p>
      </Modal>
            {isWinner &&
                <WinnerWrapper style={{textAlign:'center'}}>
                    <h1>CONGRATULATIONS! <br></br>YOU HAVE FOUND ALL GROUPS!</h1>
                    <Button key="leaderboard" type="primary" onClick={handleOk} style={{background:dellBlue,height:'40px'}}>
                 Go to Leaderboard
               </Button>
                </WinnerWrapper>
            }
            {!isWinner && submitClicked && successfulCategories.length !== 0 && successfulCategories.map((category, index) => {
                
                return (
                    <SuccessfullAlert card={category} color={alertColors[index]}></SuccessfullAlert>
                    
                )
            })}
            {!isWinner && <CardsWrapper>
                <Row>
                    {randomButtons.map((button, index) => {
                        return <>
                            <CardButton onClick={() => { handleButtonClick(index) }}
                                style={{ color: buttons[index].color, backgroundColor: buttons[index].backgroundColor }}>
                                {button.word}
                            </CardButton >
                        </>
                    })}
                </Row>
                <MistakesWrapper>
                    {submitClicked && <p>{message}</p>}
                    <h2 style={{ fontWeight: 400 }}>Mistakes Remaining: {mistakesRemaining} </h2>
                </MistakesWrapper>
                <Button disabled={mistakesRemaining === 0 || !randomCategories.length || selectedButtons.length !== 4} onClick={handleSubmit}>Submit</Button>
            </CardsWrapper >}
        </>
    );
}
