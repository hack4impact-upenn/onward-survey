import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import auth from '../utils/auth';

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

class ProfileMenu extends React.Component<{}, { open: boolean }> {
  state = {
    open: false,
  };

  toggleMenu = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  render() {
    return (
      <div
        className={
          this.state.open ? 'dropdown is-right is-active' : 'dropdown is-right '
        }
        style={{ boxShadow: 'none' }}
      >
        <div className="dropdown-trigger">
          <button
            className="button"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            onClick={this.toggleMenu}
          >
            <span>Profile</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <strong className="dropdown-item">Profile</strong>
            <hr className="dropdown-divider"></hr>
            <strong className="dropdown-item" onClick={() => auth.logout()}>
              Logout
            </strong>
          </div>
        </div>
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
            <img src="/images/logo-full.png" alt="Onward Financial"></img>
          </Logo>
        </a>
      </NavbarItem>
      <NavbarItem></NavbarItem>
      <NavbarItem>{loggedIn && <ProfileMenu></ProfileMenu>}</NavbarItem>
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
