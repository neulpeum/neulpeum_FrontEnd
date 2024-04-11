import React from "react";
import noResultImage from "Images/ic_no_result.svg";
import 'styles/ForComps/NoResult.css';

const NoResultView = (props) => {
  return (
    <div className="NoResultViewContainer">
      <img src={noResultImage} alt="No_Data"/>
      <p className="SearchQuery">{props.name}</p>
      <p>{props.explain}</p>
    </div>
  );
};

export default NoResultView;
