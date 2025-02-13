import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Header = (props) => {
  const { logout, user } = useContext(UserContext);
  const [hiddenHeader, setHiddenHeader] = useState(false);
  // useEffect(() => {
  //   if (window.location.pathname === "login") {
  //     setHiddenHeader(true);
  //   }
  // }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
    toast.success("Logout success!");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {(user && user.auth || window.location.pathname === "/") && (
              <>
                <Nav className="me-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/users">Manage Users</Nav.Link>
                </Nav>

                <Nav>
                  {user && user.email && (
                    <span className="nav-link">Welcome {user.email}</span>
                  )}
                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    {/* <NavDropdown.Item href="/login">Login</NavDropdown.Item> */}
                    {user && user.auth === false ? (
                      <Nav.Link href="/login" className="dropdown-item">
                        Login
                      </Nav.Link>
                    ) : (
                      <NavDropdown.Item onClick={() => handleLogout()}>
                        Logout
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
