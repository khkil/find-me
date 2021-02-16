import React from 'react';
import Button from '@material-ui/core/Button';
import Sidebar from '../components/common/SideBar';
import Header from '../components/common/Header';


const DashBoardPage = ({ history }) => {

  return (
    <div>
      <Header history={history} />
      <Sidebar />
      <Button variant="contained" color="primary">asd</Button>
    </div>
  )
}
export default DashBoardPage;