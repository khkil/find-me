import React from 'react';

const Sidebar = ({ showSideTags }) => {
	return (
		<>
			{showSideTags && 
        <div>
          <h2>
            sidebar
          </h2>
        </div>
      }
    </>
	)
}


export default Sidebar;