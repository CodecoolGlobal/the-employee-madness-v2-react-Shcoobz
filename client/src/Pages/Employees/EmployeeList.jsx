// TODO: add hide filter inputs with btn

import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading';
import EmployeeTable from '../../Components/EmployeeTable';

const fetchEmployees = (level, position, arrange) => {
  const employeeFilters = new URLSearchParams();

  employeeFilters.append('level', level);
  employeeFilters.append('position', position);
  employeeFilters.append('arrange', arrange);

  return fetch(`/api/employees/?${employeeFilters.toString()}`).then((res) =>
    res.json()
  );
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  const [level, setLevel] = useState('');
  const [position, setPosition] = useState('');

  const [arrange, setArrange] = useState('');

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees(level, position, arrange).then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  }, [level, position, arrange]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className='employee-list-filter'>
        <label>
          Filter by Level
          <input onChange={(e) => setLevel(e.target.value)} />
        </label>
        <label>
          Filter by Position
          <input onChange={(e) => setPosition(e.target.value)} />
        </label>
        <label>
          Arrange by:
          <select
            name='arrange'
            id='arrange'
            onChange={(e) => setArrange(e.target.value)}>
            <option value=''>Choose an option:</option>
            <option value='name'>Name</option>
            <option value='level'>Level</option>
            <option value='position'>Position</option>
          </select>
        </label>
      </div>
      <EmployeeTable employees={employees} onDelete={handleDelete} />;
    </>
  );
};

export default EmployeeList;
