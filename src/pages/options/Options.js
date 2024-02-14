import React from 'react';
import './Options.css';
import MedicareLogo from '../../components/customInput/img_medicare_logo.svg';
import MyInfoBtn from './img_my_info_btn.svg';
import CitizensBtn from './img_citizens_btn.svg';
import MedicineBtn from './img_medicine_btn.svg';


const Options = () => {
    return (
      <div className="main-container">
        <div className="logo-container">
          <img src="/icons/ic_logo.svg" alt="logo" className="logo" />
        </div>
        <div className='main-content'>
            <h3>늘픔 약 재고 관리 서비스에 오신 것을 환영합니다</h3>
            <div className="option-btn-container">
                <img src={MyInfoBtn} alt="my-info-btn" className="my-info-btn" />
                <img src={CitizensBtn} alt="citizens-btn" className="citizens-btn" />
                <img src={MedicineBtn} alt="medicine-btn" className="medicine-btn" />
            </div>
        </div>
        <footer className="footer">
          <img src={MedicareLogo} alt="footer-logo" className="footer-logo" />
        </footer>
      </div>
    );
  };

export default Options;