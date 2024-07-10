import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import medal1 from "../login/1st.jpg";
import medal2 from "../login/2nd.jpg";
import medal3 from "../login/3rd.jpg";
import transparent from '../login/transparent.png';
import trophies from './trophies.png';

export const dellBlue = "#0672CB";

interface LeaderboardEntry {
  playerName: string;
  score: string; 
  ipAddress: string;
  email: string;
}

const WinnerWrapper = styled.div`
  margin-top: 20px;
  font-weight: 300;
  color: green;
`;

const PyramidWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get<LeaderboardEntry[]>(
          "http://localhost:3001/leaderboard"
        );
        const formattedData = response.data
          .sort((a, b) => Number(a.score) - Number(b.score))
          .map((row) => ({
            ...row,
            score: formatTime(Number(row.score)), 
          }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

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
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <img
          src={trophies}
          alt="First place medal"
          style={{ width: "560px", height: "400px" }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: "center", width: "600px", marginTop: '-40px' }}>
          <div>
            <h2>
              {data.length > 0 && <h2>{data[0].playerName.toUpperCase()} - {data[0].score}</h2>}
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h2>
                {data.length > 2 && <h2>{data[2].playerName.toUpperCase()} - {data[2].score}</h2>}
              </h2>
            </div>
            <div>
              <h2>
                {data.length > 1 && <h2>{data[1].playerName.toUpperCase()} - {data[1].score}</h2>}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-30px', fontSize: '40px' }}>
          <h2 style={{ color: dellBlue }}>Leaderboard</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', fontSize: '40px' }}>
          {data.map((row, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black', borderRadius: '10px', padding: '10px', width: '1000px', position: 'relative', borderWidth: '1px', borderColor: 'lightgrey', height: '30px', marginBottom: '25px' }}>
              <img src={index === 0 ? medal1 : index === 1 ? medal2 : index === 2 ? medal3 : transparent} alt="description of image" style={{ position: 'absolute', left: -20, top: '-18%', width: '27px', height: '65px' }} />
              <div style={{ fontSize: '16px' }}>{row.playerName}</div>
              <div style={{ fontSize: '16px' }}>{row.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
