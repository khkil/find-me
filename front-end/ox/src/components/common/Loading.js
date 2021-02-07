import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ loading }) => {
  if (loading) {
    return (
      <div className="findme__loading">
        
        <Loader
          className="test"
          type="ThreeDots"
          color="black"
          height={100}
          width={100}
      />
       
      </div>
    )
  } 
  return null;
}
export default Loading;