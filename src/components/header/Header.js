import React from 'react';

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
    </div>
  )
}

export default createHeader;