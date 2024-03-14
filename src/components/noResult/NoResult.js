import React from 'react';
import noResultImage from './ic_no_result.svg';

const NoResultView = (props) => {
    return (
        <div className='NoResultViewContainer'>
            <img src={noResultImage}/>
            <p className='SearchQuery'>{props.name}</p>
            <p>{props.explain}</p>
        </div>
    );
  };
  
  export default NoResultView;