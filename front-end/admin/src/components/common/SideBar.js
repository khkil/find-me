import React from 'react';

const Sidebar = ({ cookies }) => {
  return (
    <>
      {cookies.user && (
        <div>
          <h2>
            sidebar
        </h2>
        </div>
      )}

    </>
  )
}


export default Sidebar;