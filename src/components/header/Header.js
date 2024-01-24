import logo from './ic_logo.svg';
import home from './ic_home.svg';
import './Header.css';
import React from 'react';

function createHeader() {
  return(
    <div class="header-container">
      <div class="logo-container">
        <img src={logo} alt="logo" class="logo"/>
      </div>

      <a href="#!" class="home-button">
          <img src={home} alt="Home"/>
      </a>
    </div>
  )
}

export default createHeader;