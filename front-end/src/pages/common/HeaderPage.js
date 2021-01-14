import { useEffect } from 'react';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { getInspection } from '../../modules/inspection';

const HeaderPage = () => {

  const dispatch = useDispatch();
  const { host } = window.location;
  useEffect(() => {
    dispatch(getInspection(host));
  }, [host]);
  // const { data, loading, error } = useSelector(state => state.inspection);
  // if (loading || !data) return null
  // if (error) return <div>에러 발생!</div>;
  // if (!data) return null;
  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" >
      <Navbar.Brand href="#home">React Bootstrap Navbar</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about-us">Contact Us</Nav.Link>
          <Nav.Link href="/contact-us">About Us</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  )
}

export default HeaderPage;
