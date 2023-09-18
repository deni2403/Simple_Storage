import React from 'react';
import PropTypes from 'prop-types';
import { FiHome, FiUsers, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/ThemeContext';

function Navigation({ user, logoutHandler }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-primary shadow`}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          Simple Storage
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav d-flex justify-content-center align-items-center ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button
                className="navbar-menu__button"
                onClick={toggleTheme}
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? (
                  <>
                    <FiSun />
                  </>
                ) : (
                  <>
                    <FiMoon />
                  </>
                )}
              </button>
            </li>
            {user && (
              <li className="nav-item">
                <div className='container navbar-icon'>
                  <Link to="/" className="nav-link">
                    <FiHome /> Beranda
                  </Link>
                </div>
              </li>
            )}
            {user && user.role === 'admin' && (
              <li className="nav-item">
                <div className='container navbar-icon'>
                <Link to="/admin" className="nav-link">
                  <FiUsers /> Admin
                </Link>
                </div>
              </li>
            )}
            {user && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      title="Keluar"
                      onClick={logoutHandler}
                    >
                      <FiLogOut /> Keluar
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  user: PropTypes.object,
  logoutHandler: PropTypes.func,
};

export default Navigation;
