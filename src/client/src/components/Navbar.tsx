import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import auth from '../api/core/auth';

// image imports
import logo from "../assets/logo-full.png";

// style imports
import '../styles/navbar.css';


const NavbarContainer = styled.div`
  width: 100vw;
  height: 60px;
  padding: 0px 50px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  justify-content: space-between;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.15);
`;

const NavbarItem = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.div`
  width: 120px;
  margin-top: 2px;
`;


class ProfileMenu extends React.Component<{}, {open: boolean}> {

  state = {
    open: false,
  };

  toggleMenu = () => {
    this.setState(state => {
      return {
        open: !state.open,
      };
    });
  };

  render() {
    return (
      <div className="navbar-container">
        <button type="button" className="button" onClick={this.toggleMenu}>
          Profile
        </button>
        {this.state.open && (
          <div className="dropdown">
            <ul className="navbar-ul">
              <li className="navbar-li">
                Profile
              </li>
              <li className="navbar-li" onClick={() => auth.logout()}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

const Navbar = () => {
  let history = useHistory();
  const [loggedIn, setLoggedIn] = useState(auth.isAuthenticated());

  const logout = ({ loggedIn }: { loggedIn: boolean }) => {
    history.push('/');
    setLoggedIn(loggedIn);
  };

  const login = ({ loggedIn }: { loggedIn: boolean }) => {
    setLoggedIn(loggedIn);
  };

  auth.addLoginSubscribers(login);
  auth.addLogoutSubscribers(logout);

  return (
    <NavbarContainer>
      <NavbarItem>
        <a href="/" className="title is-6">
          <Logo>
            <img src={logo} alt="Onward Financial"></img>
          </Logo>
        </a>
      </NavbarItem>
      <NavbarItem>
        
      </NavbarItem>
      <NavbarItem>
        {loggedIn && (
          <ProfileMenu></ProfileMenu>
        )}
      </NavbarItem>
      {/* <NavbarItem>
        {loggedIn && (
          <h1
            className="title is-6"
            onClick={() => auth.logout()}
          >
            Logout
          </h1>
        )}
      </NavbarItem> */}
    </NavbarContainer>
  );
};

export default Navbar;
