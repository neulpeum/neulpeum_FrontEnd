import React from 'react';
import { Link } from 'react-router-dom';

const createHeader = () => {
  const isMobile = window.innerWidth <= 768
  const dest = isMobile ? "/citizens" : "/options";

  return(
    <div className="header-container">
      <div className="logo-container">
        <Link className="home-button" to={dest}>
          <img src="/icons/ic_logo.svg" alt="logo" className="logo"/>
        </Link>
      </div>
    </div>
  )
}

export default createHeader;