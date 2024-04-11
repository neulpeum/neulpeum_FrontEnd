import React from 'react';
import MyInfoBtn from 'Images/img_my_info_btn.svg';
import CitizensBtn from 'Images/img_citizens_btn.svg';
import MedicineBtn from 'Images/img_medicine_btn.svg';
import { Link } from "react-router-dom";
import 'styles/ForPages/Options/Options.css';


const Options = () => {
    return (
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
    );
  };

export default Options;