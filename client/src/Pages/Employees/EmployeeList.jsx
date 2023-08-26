// TODO: add hide filters with btn
// TODO: create equipment delete utility like with employees
// TODO: make util comp for fetchEmp && fetchFilteredEmp
// TODO: MARK ALL/RESET attendance

// TODO: for PA: remove/deactivate pagination functionality

import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading';
import EmployeeTable from '../../Components/Employees/EmployeeTable';

import deleteEmployee from '../../Utility/Employees/deleteEmployee';

const fetchFilteredEmployees = (level, position, arrange) => {
  const employeeFilters = new URLSearchParams();
  employeeFilters.append('level', level);
  employeeFilters.append('position', position);
  employeeFilters.append('arrange', arrange);

  return fetch(`/api/employees/?${employeeFilters.toString()}`).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const [level, setLevel] = useState('');
  const [position, setPosition] = useState('');
  const [arrange, setArrange] = useState('');

  useEffect(() => {
    fetchFilteredEmployees(level, position, arrange).then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  }, [level, position, arrange]);

  if (loading) {
    return <Loading />;
  }

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  return (
    <>
      <div className='employee-list-filter'>
        <label>
          [ Filter by Level ]
          <input onChange={(e) => setLevel(e.target.value)} />
        </label>
        <label>
          [ Filter by Position ]
          <input onChange={(e) => setPosition(e.target.value)} />
        </label>
        <label>
          [ Arrange by ]
          <select
            name='arrange'
            id='arrange'
            onChange={(e) => setArrange(e.target.value)}>
            <option value=''>Choose an option:</option>
            <option value='name'>Name</option>
            <option value='level'>Level</option>
            <option value='position'>Position</option>
            <option value='equipment'>Equipment</option>
          </select>
        </label>
      </div>

      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </>
  );
};

export default EmployeeList;
