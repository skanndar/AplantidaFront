import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../lib/Auth'

class Navbar extends Component {
  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider 
    // and are injected by the withAuth HOC
    const { user, logout, isLoggedIn } = this.props;

    return (
      <nav className="navbar">
        <Link to={'/'} >
          <img src="/logo.png" alt="logo-small"/>
        </Link>
        {
          isLoggedIn
            ? <div>
              <p>{user.fName}</p>
              <button onClick={logout}> Logout </button>
            </div>
            : (
              <>
                <Link to="/login">
                  {' '}
                  <button className="navbar-button">Login</button>{' '}
                </Link>
                <br />
                <Link to="/signup">
                  {' '}
                  <button className="navbar-button">Sign Up</button>{' '}
                </Link>
              </>
            )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
