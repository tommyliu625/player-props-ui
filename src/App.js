import './App.css';
import { HomePage } from './ui/HomePage';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerProjectionPage from './ui/playerProjectionComponents/PlayerProjectionPage';
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
          <Route path="/projections" element={<PlayerProjectionPage />} />
        </Routes>
      </div>
    </Router>

  );
} 

export default App;
