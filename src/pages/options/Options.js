import React from 'react';
import MyInfoBtn from 'Images/img_my_info_btn.svg';
import CitizensBtn from 'Images/img_citizens_btn.svg';
import MedicineBtn from 'Images/img_medicine_btn.svg';
import { Link } from "react-router-dom";
import LoginWrapper from 'components/LoginWrapper';
import 'styles/ForPages/Options/Options.css';

const View = 
<>
<div className="option-logo-container">
  <img src="/icons/ic_logo.svg" alt="logo" className="logo" />
</div>
<div className='main-content'>
<p>늘픔 약 재고 관리 서비스에 오신 것을 환영합니다</p>
  <div className="option-btn-container">
    <Link className="default-link-styles" to="/citizens">
      <img src={CitizensBtn} alt="citizens-btn" className="citizens-btn" />
    </Link>
    <Link className="default-link-styles" to="/drugs">
      <img src={MedicineBtn} alt="medicine-btn" className="medicine-btn" />
    </Link>
    <Link className="default-link-styles" to="/accountSettings">
      <img src={MyInfoBtn} alt="my-info-btn" className="my-info-btn" />
    </Link>
  </div>
</div>
</>

const Options = () => {
    return ( <LoginWrapper content={View}/>
    );
  };

export default Options;