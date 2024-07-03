
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './views/login/login';
import LeaderboardPage from './views/leader-board/leader';
import { Game } from './views/game/game';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
