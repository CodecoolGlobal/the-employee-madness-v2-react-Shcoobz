import { Link } from 'react-router-dom';
import Employee from '../Employee';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, onDelete }) => (
  <div className='EmployeeTable'>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Attendance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <Employee
            key={employee._id}
            employee={employee}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
