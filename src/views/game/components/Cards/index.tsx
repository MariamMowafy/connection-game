import styled from "@emotion/styled"
import { ButtonData, CardsType, WordType, dellBlue, dellGlacier, getRandomCards, getRandomCategories } from "./handlers/getRandomCards";
import { useState } from "react";
import { Button } from "antd";
import { SuccessfullAlert } from "./successfulAlert";


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

export const Cards = () => {

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

    let [successfulCategories, setSuccessfulCategories] = useState<CardsType[]>([]);

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
    return (
        <>
            {isWinner &&
                <WinnerWrapper>
                    <h1>CONGRATULATIONS! <br></br>YOU HAVE FOUND ALL GROUPS!</h1>
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
