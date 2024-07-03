import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import medal1 from "../login/1st.jpg";
import medal2 from "../login/2nd.jpg";
import medal3 from "../login/3rd.jpg";
import transparent from '../login/transparent.png'
import trophies from './trophies.png'

export const dellBlue = "#0672CB";

interface LeaderboardEntry {
  playerName: string;
  score: string; // or number if you prefer to keep it as a number
  ipAddress: string;
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
          .sort((a, b) => Number(a.score) - Number(b.score)) // Sort by least time first
          .map((row) => ({
            ...row,
            score: formatTime(Number(row.score)), // Ensure score is a number before formatting
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
      {/* <WinnerWrapper>
        <h1>
          CONGRATULATIONS! <br></br>YOU HAVE FOUND ALL GROUPS!
        </h1>
      </WinnerWrapper> */}
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , marginTop:'50px'}}>
              <img
        src={trophies}
        alt="First place medal"
        style={{ width: "650px", height: "490px" }}
      />
        </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , marginTop:'05px'}}>
      
  <div style={{ textAlign: "center", width: "600px" }}>
    <div>
      {/* <img
        src={medal1}
        alt="First place medal"
        style={{ width: "25px", height: "60px" }}
      /> */}
      <h2>
      {data.length > 0 && <h2>{data[0].playerName.toUpperCase()} - {data[0].score}</h2>}

</h2>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        {/* <img
          src={medal2}
          alt="Second place medal"
          style={{ width: "25px", height: "60px" }}
        /> */}
        <h2>
        {data.length > 0 && <h2>{data[2].playerName.toUpperCase()} - {data[2].score}</h2>}


        </h2>
      </div>
      <div>
        {/* <img
          src={medal3}
          alt="Third place medal"
          style={{ width: "25px", height: "60px" }}
        /> */}
        <h2>
        {data.length > 0 && <h2>{data[1].playerName.toUpperCase()} - {data[1].score}</h2>}

</h2>
      </div>
    </div>
  </div>
</div>
<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , marginTop:'20px', fontSize:'40px'}}>
    <h2 style={{color:dellBlue}}>Leaderboard</h2>
  </div>
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'20px', fontSize:'40px'}}>
    {data.map((row, index) => (
      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid black', borderRadius: '10px', padding: '10px', width: '1000px', position: 'relative', borderWidth:'1px', borderColor:'lightgrey' , height:'30px', marginBottom:'25px'}}>
        <img src={index === 0 ? medal1 : index === 1 ? medal2 : index === 2 ? medal3 : transparent} alt="description of image" style={{ position: 'absolute', left: -20, top: '-18%', width: '27px', height: '65px' }} />
        <div style={{fontSize:'16px'}}>{row.playerName}</div>
        <div style={{fontSize:'16px'}}>{row.score}</div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}

export default LeaderboardPage;
