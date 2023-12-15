import React from 'react';
import './NavBar.css'
import { Link } from 'react-router-dom';

export const NavBar = ({setSelectedPage}) => {
  return (
    <div className='header'>
      <div className='title'>
        <Link to="/">Player Props</Link>
        <Link to="/projections">Prize Pricks Projections</Link>
        {/* <div onClick={() => setSelectedPage("Home")}>Player Props</div>
        <div onClick={() => setSelectedPage("PrizePicks")}>Prize Pricks Projections</div> */}
      </div>
      <div id='links-group'>
        <a href='https://github.com/tommyliu625/' target='_blank'>
          <img width='40px' alt='github' src='github.png' />
        </a>
        <a href='https://www.linkedin.com/in/tommyliu625/' target='_blank'>
          <img width='40px' alt='linkedin' src='linkedin.png' />
        </a>
      </div>
    </div>
  );
};

