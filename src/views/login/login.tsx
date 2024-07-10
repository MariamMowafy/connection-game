import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import first from "./1st.jpg";
import second from "./2nd.jpg";
import third from "./3rd.jpg";
import transparent from "./transparent.png";
import leaderboardData from "../../leaderboard.json";

export const dellBlue = "#0672CB";

interface PlayerData {
  score: number;
  ipAddress: string;
}

function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [leaderboard, setLeaderboard] = useState<Record<string, PlayerData>>(
    {}
  );
  const navigate = useNavigate();

  useEffect(() => {
    const sortedData = Object.entries(leaderboardData)
      .sort(([, a], [, b]) => a.score - b.score)
      .slice(0, 5);
    setLeaderboard(Object.fromEntries(sortedData));
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
  const handleLogin = () => {
    localStorage.setItem("playerName", name);
    localStorage.setItem("email", email);
    navigate("/game");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "Segoe UI",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="logo.png" alt="description of image" />
        </div>
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "-10px",
            fontWeight: "bolder",
          }}
        >
          Analytics Program
        </h1>
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "-10px",
            fontWeight: "bolder",
          }}
        >
          BA Games - Connection Game{" "}
        </h2>
        <h2 style={{ fontSize: "28px", fontWeight: "lighter" }}>
          Please enter your email
        </h2>
        <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: "200px",
            height: "35px",
            fontFamily: "Segoe UI",
            fontSize: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
            borderWidth: "1px",
            marginRight:"20px"
          }}
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            width: "200px",
            height: "35px",
            fontFamily: "Segoe UI",
            fontSize: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
            borderWidth: "1px",
          }}
        />
        </div>
        <button
          style={{
            backgroundColor: dellBlue,
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginTop: "10px",
            fontSize: "12px",
            marginBottom: "10px",
          }}
          onClick={handleLogin}
        >
          Start Game
        </button>
        {Object.entries(leaderboard).map(([player, data], index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              border: "1px solid black",
              borderRadius: "10px",
              padding: "10px",
              margin: "20px 0",
              width: "700px",
              position: "relative",
              borderWidth: "1px",
              borderColor: "lightgrey",
              height: "22px",
            }}
          >
            <img
              src={
                index === 0
                  ? first
                  : index === 1
                  ? second
                  : index === 2
                  ? third
                  : transparent
              }
              alt="description of image"
              style={{
                position: "absolute",
                left: -20,
                top: "-18%",
                width: "27px",
                height: "65px",
              }}
            />
            <div style={{ fontSize: "16px" }}>{player}</div>
            <div>{formatTime(data.score)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoginPage;

//if we are gonna use ip address feature
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import publicIpv4 from 'public-ip';

// function LoginPage() {
//   const [name, setName] = useState('');
//   const [ipAddress, setIpAddress] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getIpAddress = async () => {
//       try {
//         const ip = await publicIpv4();
//         setIpAddress(ip);
//       } catch (error) {
//         console.error('Error getting IP address:', error);
//       }
//     };

//     getIpAddress();
//   }, []);

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/check-ip', { ipAddress });
//       if (response.data.allowed) {
//         localStorage.setItem('playerName', name);
//         navigate('/game');
//       } else {
//         alert('Login not allowed: IP address already exists in the database.');
//       }
//     } catch (error) {
//       console.error('Error checking IP address:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
//       <button onClick={handleLogin}>Start Game</button>
//     </div>
//   );
// }

// export default LoginPage;
