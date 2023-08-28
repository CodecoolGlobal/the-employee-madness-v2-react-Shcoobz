import Employee from '../Employee/Employee';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, onDelete, handleSortByName }) => (
  <div className='EmployeeTable'>
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSortByName()} className='nameTitle'>
            Name
          </th>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Level</th>
          <th>Position</th>
          <th>Equipment</th>
          <th>Attendance</th>
          <th>Favorite Brand</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <Employee key={employee._id} employee={employee} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
