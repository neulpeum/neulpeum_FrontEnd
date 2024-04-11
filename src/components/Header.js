import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import 'styles/ForComps/Header.css';

const createHeader = ({nav, isLogoutVisible}) => {
  const isMobile = window.innerWidth <= 768
  const dest = isMobile ? "/citizens" : "/options";
  const visible = isLogoutVisible;

  const navigate = nav;
  const logout = () => {
    axios.post(
      "/logout",
      {withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "*",
        }},
    )
    .then((response) => {
      navigate("/");
    })
    .catch((error) => {
      navigate("/");
    })
  };

  return(
    <div className="header-container">
      <div className="logo-container">
        <Link className="home-button" to={dest}>
          <img src="/icons/ic_logo.svg" alt="logo" className="logo"/>
        </Link>
      </div>
      {visible && (
        <div onClick={logout}>
          <img src='/icons/ic_logout.svg' alt='logout' className='logout'/>
        </div>
      )}
    </div>
  )
}

export default createHeader;