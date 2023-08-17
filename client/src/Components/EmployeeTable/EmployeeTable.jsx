import { Link } from 'react-router-dom';
import './EmployeeTable.css';

const EmployeeTable = ({
  employees,
  onDelete,
  handleSort,
  sortField,
  sortOrder,
}) => (
  <div className='EmployeeTable'>
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>
            Name
            {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('firstName')}>
            First Name{' '}
            {sortField === 'firstName' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('middleName')}>
            Middle Name{' '}
            {sortField === 'middleName' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('lastName')}>
            Last Name{' '}
            {sortField === 'lastName' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('level')}>
            Level {sortField === 'level' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('position')}>
            Position{' '}
            {sortField === 'position' && (sortOrder === 'asc' ? '▲' : '▼')}
          </th>
          <th />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee._id}>
            <td>{employee.name}</td>
            <td>{employee.firstName}</td>
            <td>{employee.middleName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.level}</td>
            <td>{employee.position}</td>
            <td>
              <Link to={`/update-employee/${employee._id}`}>
                <button type='button'>Update</button>
              </Link>
              <button type='button' onClick={() => onDelete(employee._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EmployeeTable;
