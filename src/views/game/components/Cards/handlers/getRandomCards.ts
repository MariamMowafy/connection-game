import CARDS_RESPONSE from '../../../../../api/connection-words-fixtures.json';

const CardsResponse = CARDS_RESPONSE.categories;

export type CardsType = {
    words: string[]
    type: string
}
export type WordType = {
    word: string;
    type: string;
}
export type ButtonData = {
    id: number;
    selected: boolean;
    backgroundColor: string;
    color: string;
    // Optional: other properties like color, symbol, etc.
}

export const dellBlue = "#0672CB";
export const dellGlacier = "#E5F8FF";


let CardsResponseCopy = CardsResponse;

export function getRandomCategories() {
    let x = 4;
    let randomIndex = 0;
    let checkIndex = [false];
    let randomCards: CardsType[] = [];

    while (x--) {

        randomIndex = Math.floor(Math.random() * CardsResponseCopy.length);
        while (true) {
            if (checkIndex[randomIndex]) {
                randomIndex = Math.floor(Math.random() * CardsResponseCopy.length);
            } else {
                checkIndex[randomIndex] = true;
                randomCards.push(CardsResponseCopy[randomIndex])
                break;
            }
        }

    }
    return randomCards;
}
export function getRandomCards(randomCategories: CardsType[]) {
    let allRandomButtons: (WordType & ButtonData)[] = [];
    let id = 0;

    allRandomButtons.length = 0;

    randomCategories.map((category) => {
        category.words.map((word) => {
            allRandomButtons.push({ id: id, word: word, type: category.type, color: dellGlacier, backgroundColor: dellBlue, selected: false })
        })
    })
    //Shuffle Arrays
    allRandomButtons = shuffleArray(allRandomButtons);
    return allRandomButtons;
}

export function shuffleArray(allRandomButtons: (WordType & ButtonData)[]) {
    for (let i = allRandomButtons.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allRandomButtons[i], allRandomButtons[j]] = [allRandomButtons[j], allRandomButtons[i]]
        allRandomButtons[i].id = i;
    }
    return allRandomButtons;
}


