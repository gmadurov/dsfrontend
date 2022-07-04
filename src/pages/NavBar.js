// import LINKS from "./LINKS"
import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const { user, logoutFunc } = useContext(AuthContext);
  const [burger, setBurger] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  if (!user) {
    return <></>;
  }
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{
        flexGrow: "1",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div className="navbar-brand">
        <img
          src="/images/blazoen_1.gif"
          alt="Home"
          style={{ width: "50px", height: "40px" }}
        />
        <div className="navbar-item">
          <img
            src="/images/dumspiro.gif"
            alt="DumSpiroSpero"
            style={{ width: "231px", height: "39px" }}
          />
        </div>

        <div
          role="button"
          className={burger ? "navbar-burger is-active" : "navbar-burger"}
          aria-label="menu"
          aria-expanded="false"
          onClick={() => setBurger(!burger)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div className={burger ? "navbar-menu is-active" : "navbar-menu"}>
        <div className="navbar-start">
          <div className="navbar-item"></div>

          <Link to="/agenda" onClick={() => setBurger(!burger)}>
            <p className="navbar-item ">Agenda</p>
          </Link>
          {/* <div className="button" onClick={() => changeapi()}>
            heroku
          </div> */}
          <Link to="/dsani" onClick={() => setBurger(!burger)}>
            <p className="navbar-item">DSANI</p>
          </Link>
          <Link to="/decla" onClick={() => setBurger(!burger)}>
            <p className="navbar-item">Decla</p>
          </Link>
          <Link to="/declas" onClick={() => setBurger(!burger)}>
            <p className="navbar-item">Declas </p>
          </Link>
        </div>
        <div className="navbar-end">
          <div
            className="navbar-item has-dropdown"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <p className="navbar-link">Hello, {user?.name} </p>
            <div
              className="navbar-dropdown"
              style={{ display: showDropdown ? "block" : "none" }}
            >
              <li className="navbar-item">
                <Link
                  to={`/account/${user.lid_id}`}
                  onClick={() => setBurger(!burger)}
                >
                  Account
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/agenda" onClick={() => setBurger(!burger)}>
                  Agenda
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/dsani" onClick={() => setBurger(!burger)}>
                  DSANI
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/addevent" onClick={() => setBurger(!burger)}>
                  New Event
                </Link>
              </li>
              <hr className="navbar-divider" />
              <li className="navbar-item">
                <Link to="/test" onClick={() => setBurger(!burger)}>
                  Test
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/event" onClick={() => setBurger(!burger)}>
                  event
                </Link>
              </li>
              <li className="navbar-item">
                <Link
                  to="/login"
                  onClick={() => {
                    logoutFunc();
                    console.log("loged out");
                  }}
                >
                  Log Out
                </Link>
              </li>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
