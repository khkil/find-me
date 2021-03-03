import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Sidebar = ({ cookies }) => {
  return (
    <>
      {cookies.user && (
        <div>
          
          <Link to='/'>
            <Button variant="contained" color="primary">home</Button>
          </Link>
          <Link to='/statistics'>
            <Button variant="contained" color="primary">
              statistics
            </Button>
          </Link>
        </div>
      )}

    </>
  )
}


export default Sidebar;