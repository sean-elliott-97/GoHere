import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Logo from '../../images/goHerebig.png'

const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header-cont mb-4 py-2 flex-row align-center">
      <div className=" flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <img className="go-here-img" src={Logo} />
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Profile</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
              <Link to ="/savedTrips">Saved Trips</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
