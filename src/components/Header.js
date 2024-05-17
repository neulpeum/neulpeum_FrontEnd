import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import 'styles/ForComps/Header.css';


const CreateHeader = ({nav, isLogoutVisible, acitveTab}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  const dest = "/citizens"; 
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


  const mainView = 
    (isMobile) ? 
      <div className="my-header-container">
        <Link to={dest}>
          <img src="/icons/ic_logo.svg" alt="home-button" className="logo"/>
        </Link>
        {visible && (
          <div onClick={logout} className='logout-container'>
            <img src='/icons/ic_logout.svg' alt='logout' className='logout'/>
          </div>
        )}
      </div>
    : 
      <div className="my-header-container">
        <Link className='home-button' to={dest}>
          <img src="/icons/ic_logo.svg" alt="home-button" className="logo"/>
        </Link>
        <div className='subMenu-container'>
          <NavLink className={({isActive}) => acitveTab === "drugs" ? "drugActive" : ""} to='/drugs'>약 재고화면</NavLink>
          <NavLink className={({isActive}) => acitveTab === "citizens" ? "citizenActive" : ""} to='/citizens'>주민 화면</NavLink>
          <NavLink className={({isActive}) => acitveTab === "account" ? "accountActive" : ""} to='/accountSettings'>개인정보 수정 화면</NavLink>
        </div>
        {visible && (
        <div onClick={logout} className='logout-container'>
          <img src='/icons/ic_logout.svg' alt='logout' className='logout'/>
        </div>
    )}
      </div>

  return(
      <>{mainView}</>
  )
}

export default CreateHeader;