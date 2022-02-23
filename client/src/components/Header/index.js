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
    
    <div className="img-cont"><Link to="/"> <img className="go-here-img" src={Logo} /> </Link>
    <div className="attach">
    <div className="dropdown">
      <button class="dropbtn">☰</button>
    <header className="dropdown-content">
      
      <div className=" flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
   
        </Link>
      </div>
        <nav className="nav-links">
        <Link to="/">Home</Link>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Profile</Link>
             
              <Link to ="/savedTrips">Saved</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
              
            </>
          )}
        </nav>
      
    </header>
    </div>
    </div>
    </div>
  );
};

export default Header;
