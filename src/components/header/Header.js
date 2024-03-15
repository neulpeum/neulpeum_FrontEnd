import React from 'react';
import { Link } from 'react-router-dom';

const createHeader = () => {
  const isMobile = window.innerWidth <= 768
  const dest = isMobile ? "/citizens" : "/options";

  return(
    <div className="header-container">
      <div className="logo-container">
        <a href={dest}>
          <img src="/icons/ic_logo.svg" alt="logo" className="logo"/>
        </a>
      </div>
      <Link className="home-button" to="/">
        <img src="/icons/ic_home.svg" alt="Home"/>
      </Link>
    </div>
  )
}

export default createHeader;