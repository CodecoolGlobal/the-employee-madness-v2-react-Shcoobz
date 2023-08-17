import { Outlet, Link } from 'react-router-dom';

import './LayoutEmployee.css';

const LayoutEmployee = () => (
  <div className='Layout'>
    <nav>
      <ul>
        <li className='grow'>
          <Link to='/'>Employees</Link>
        </li>
        <li className='grow'>
          <Link to='/equipment-list'>Go to Equipment</Link>
        </li>
        <li>
          <Link to='/create-employee'>
            <button type='button'>Create Employee</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default LayoutEmployee;
