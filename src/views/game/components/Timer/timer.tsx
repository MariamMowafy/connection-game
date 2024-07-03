import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from 'react';

type TimerProps = {
    elapsedTime: number;
    setElapsedTime: Dispatch<SetStateAction<number>>;
    isGameOver: boolean;
};
  
  export const Timer = ({ elapsedTime, setElapsedTime, isGameOver  }: TimerProps) => {
    useEffect(() => {
        let intervalId: number;
        if (!isGameOver) {
            intervalId = window.setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 10);
            }, 10);
        }

        return () => clearInterval(intervalId);
    }, [isGameOver]);

    const formattedTime = (): string => {

        const seconds = Math.floor(elapsedTime / 1000) % 60;
        const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    const time = formattedTime();
    return (<h2>Time: {time}</h2>
    )
}
