import { useState } from 'react';
import { Link } from 'react-router-dom';

const Employee = ({ employee, onDelete }) => {
  const [attendance, setAttendance] = useState(employee.attendance);

  const handleAttendance = () => {
    const updatedAttendance = !attendance;
    updateEmployee(employee._id, { attendance: updatedAttendance });
    setAttendance(updatedAttendance);
  };

  const updateEmployee = (id, data) => {
    fetch(`/api/employees/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  };

  return (
    <tr>
      <td>{employee.name}</td>
      <td>{employee.firstName}</td>
      <td>{employee.middleName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.level}</td>
      <td>{employee.position}</td>
      <td>{employee.equipment}</td>
      <td>
        <input type='checkbox' checked={attendance} onChange={handleAttendance} />
      </td>
      <td>{employee.favoriteBrand.name}</td>

      <td>
        <Link to={`/update/${employee._id}`}>
          <button type='button'>Update</button>
        </Link>
        <button type='button' onClick={() => onDelete(employee._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Employee;
