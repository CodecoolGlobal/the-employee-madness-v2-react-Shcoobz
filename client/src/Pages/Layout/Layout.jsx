import { Outlet, Link } from 'react-router-dom';

import './Layout.css';

const Layout = () => (
  <div className='Layout'>
    <nav>
      <ul>
        <li className='grow'>
          <Link to='/'>Employees</Link>
        </li>
        <li>
          <Link to='/missing'>
            <button type='button'>Check missing Employees</button>
          </Link>
        </li>
        <li>
          <Link to='/create'>
            <button type='button'>Create Employee</button>
          </Link>
        </li>
        <li className='grow'>
          <Link to='/equipment-list'>Equipment</Link>
        </li>
        <li>
          <Link to='/create-equipment'>
            <button type='button'>Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
