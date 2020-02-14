import React, { useState, useEffect } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";

import { getUser, deleteUser } from "../api/storage";
import { useHistory } from "react-router-dom";

const AppBar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});
  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);
  console.log(user);
  useEffect(() => {
    const data = getUser();
    setUser(data.user);
  }, []);

  const handleLogout = () => {
    deleteUser();
    history.push("/");
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <div className="container" style={{ display: "flex" }}>
          <NavbarBrand>BlogApp</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {/* <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  GitHub
                </NavLink>
              </NavItem> */}
            </Nav>
            {/* <NavbarText></NavbarText> */}
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Welcome, {user.firstname}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                  {/* <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem> */}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default AppBar;
