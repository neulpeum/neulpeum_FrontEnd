import React from "react";
import 'styles/ForComps/NoResult.css';

const NoResultView = (props) => {
  return (
    <div className="NoResultViewContainer">
      <img src='/icons/ic_no_result.svg' alt="No_Data"/>
      <p className="SearchQuery">{props.name}</p>
      <p>{props.explain}</p>
    </div>
  );
};

export default NoResultView;
