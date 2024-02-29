import React from 'react';

const createHeader = () => {
  return(
    <div className="header-container">
      <div className="logo-container">
        <img src="/icons/ic_logo.svg" alt="logo" className="logo"/>
      </div>
      <a href="/" className="home-button">
          <img src="/icons/ic_home.svg" alt="Home"/>
      </a>
    </div>
  )
}

export default createHeader;