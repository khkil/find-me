import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ loading }) => {
  const style = {
    textAlign: 'center',
    height: '100vh',
    lineHeight: '100vh',
    color: 'black'
  
  }
  if (loading) {
    return (
      <Loader
        style={style}
        type="Oval"
        color="#87bddb"
        height={100}
        width={100}
        timeout={55000} //3 secs
    />
    )
  } 
  return null;
}
export default Loading;