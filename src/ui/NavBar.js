import React from 'react';
import './NavBar.css'

export const NavBar = () => {
  return (
    <div className='header'>
      <div className='menu'>
        <i className='fa fa-bars'></i>
      </div>
      <div className='title'>Player Props</div>
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

