const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/leaderboard', async (req, res) => {
  console.log(req.body)
  const { playerName, elapsedTime, ipAddress, email } = req.body;
  try {
    let leaderboard = {};
    if (fs.existsSync('leaderboard.json')) {
      leaderboard = JSON.parse(fs.readFileSync('leaderboard.json'));
    }
    leaderboard[playerName] = { score: elapsedTime, ipAddress, email:email };
    fs.writeFileSync('leaderboard.json', JSON.stringify(leaderboard));
    res.status(200).send('Score saved successfully');
  } catch (err) {
    console.error('Error saving to file:', err);
    res.status(500).send('Error saving score');
  }
});

app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = JSON.parse(fs.readFileSync('leaderboard.json'));
    const formattedLeaderboard = Object.entries(leaderboard).map(([playerName, data]) => {
      const { score, ipAddress, email } = data;
      return { playerName, score, ipAddress, email };
    });
    res.status(200).json(formattedLeaderboard);
  } catch (err) {
    console.error('Error fetching leaderboard from file:', err);
    res.status(500).send('Error fetching leaderboard');
  }
});

app.post('/check-ip', async (req, res) => {
  const { ipAddress } = req.body;
  try {
    const leaderboard = JSON.parse(fs.readFileSync('leaderboard.json'));
    const ipExists = Object.values(leaderboard).some(entry => entry.ipAddress === ipAddress);
    if (ipExists) {
      res.status(200).json({ allowed: false });
    } else {
      res.status(200).json({ allowed: true });
    }
  } catch (err) {
    console.error('Error checking IP in file:', err);
    res.status(500).send('Error checking IP');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
