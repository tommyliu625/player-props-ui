import './App.css';
import { HomePage } from './ui/HomePage';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrizePicksProjectionPage from './ui/playerProjectionComponents/prize-picks/PrizePicksProjectionPage';
import UnderdogProjectionPage from './ui/playerProjectionComponents/underdog/UnderdogProjectionPage';
import {NavBar} from './ui/NavBar';
import {useState} from 'react'

function App() {

  // const [selectedPage, setSelectedPage] = useState("PrizePicks")
  
  return (
    <Router>
      <div className="App">
        {/* <NavBar selectedPage={selectedPage} setSelectedPage={setSelectedPage}/> */}
        <NavBar />
        {/* {selectedPage === "Home" ? <HomePage /> : <PlayerProjectionPage />} */}
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="/prize-picks-projections" element={<PrizePicksProjectionPage />} />
          <Route path="/underdog-projections" element={<UnderdogProjectionPage />} />
        </Routes>
      </div>
    </Router>

  );
} 

export default App;
