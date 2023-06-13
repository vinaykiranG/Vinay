import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/reservation">Reservation</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
