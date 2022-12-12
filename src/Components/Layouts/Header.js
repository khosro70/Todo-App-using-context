import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// context
import AuthContext from "../../Context/auth";


function Header() {
  const authContext = useContext(AuthContext);

  let doLogin = () => authContext.dispatch({ type: "login_user" });
  let doLogout = () => authContext.dispatch({ type: "logout_user" });

  return (
    <header>
      <div className="navbar navbar-dark bg-dark shadow-sm navbar-expand-md">
        <div className="container d-flex justify-content-between">
          <a href="#" className="navbar-brand d-flex align-items-center">
            <strong>Todo App</strong>
          </a>
          <ul className="d-flex flex-row navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" end to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item ms-2">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item ms-2">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          {!authContext.authenticated ? (
            <button className="btn btn-sm btn-success" onClick={doLogin}>
              login
            </button>
          ) : (
            <button className="btn btn-sm btn-danger" onClick={doLogout}>
              logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
