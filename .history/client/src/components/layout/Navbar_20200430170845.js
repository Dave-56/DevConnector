import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='index.html'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to='profiles.html'>Developers</Link>
        </li>
        <li>
          <a href='register.html'>Register</a>
        </li>
        <li>
          <a href='login.html'>Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
