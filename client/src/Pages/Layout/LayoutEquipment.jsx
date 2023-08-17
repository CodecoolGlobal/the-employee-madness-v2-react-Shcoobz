import { Outlet, Link } from 'react-router-dom';
import './LayoutEquipment.css';

const LayoutEquipment = () => (
  <div className='Layout'>
    <nav>
      <ul>
        <li className='grow'>
          <Link to='/'>Back to Employees</Link>
        </li>
        <li className='grow'>
          <Link to='/equipment-list'>Equipment</Link>
        </li>
        <li>
          <Link to='/create-equipment'>
            <button type='button'>Add Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default LayoutEquipment;
