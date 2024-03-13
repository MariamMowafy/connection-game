import { useState, useEffect } from "react";

export const Timer = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    useEffect(() => {
        let intervalId: number;
        intervalId = window.setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 10);
        }, 10);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = (): string => {

        const seconds = Math.floor(elapsedTime / 1000) % 60;
        const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    const time = formattedTime();
    return (<h2>Time: {time}</h2>
    )
}
