import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <header>
      <div>
        <img src="" alt="Logo" />
        <h1>App Name</h1>
      </div>

      <nav>
        <div>
          <NavLink to="/" end>Dashboard</NavLink>
        </div>
        <div>
          <NavLink to="/myissues">My Issues</NavLink>
        </div>
        <div>
          <NavLink to="/resolved_issues">Resolved Issues</NavLink>
        </div>
        <div>
          <NavLink to="/reports">Reports & Analysis</NavLink>
        </div>
        <div>
          <NavLink to="/settings">Settings and Profile</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Sidebar;
