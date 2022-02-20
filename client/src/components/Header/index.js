import React from "react";
import pic1 from "../../images/travel1.jpeg";
import pic2 from "../../images/travel2.jpeg";
import pic3 from "../../images/travel3.jpeg";
import pic4 from "../../images/travel.jpeg";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>
            <marquee>
              Go
              <i>
                <span>Here!</span>
              </i>
            </marquee>
          </h1>
          <img src={pic1} />
          <img src={pic2} />
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              {/* <img src={pic3} /> */}
              {/* <img src={pic4} /> */}
              <Link to="/profile">Profile</Link>
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
      </div>
    </header>
  );
};

export default Header;
