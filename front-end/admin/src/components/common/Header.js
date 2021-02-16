import React from 'react';

const Header = ({ history }) => {
  return (
    <div>
      {JSON.stringify(history)}
    </div>
  )
}

export default Header;