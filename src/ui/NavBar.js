import React from 'react';
import './NavBar.css'

export const NavBar = () => {
  return (
    <div className='header'>
      <div className='menu'>
        <i className='fa fa-bars'></i>
      </div>
      <div className='title'>Player Props</div>
      <div className='sign-in'>
        <button>Sign In</button>
      </div>
    </div>
  );
};

