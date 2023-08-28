// TODO: add hide filters with btn
// TODO: create equipment delete utility like with employees
// TODO: make util comp for fetchEmp && fetchFilteredEmp
// TODO: MARK ALL/RESET attendance

import { useEffect, useState } from 'react';

import Loading from '../../Components/Loading';
import EmployeeTable from '../../Components/Employees/EmployeeTable';

import fetchFilteredEmployees from '../../Utility/Employees/fetchEmployeesByFilter';
import deleteEmployee from '../../Utility/Employees/deleteEmployee';

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const [level, setLevel] = useState('');
  const [position, setPosition] = useState('');
  const [arrange, setArrange] = useState('');
  const [sortByName, setSortByName] = useState(null);

  useEffect(() => {
    fetchFilteredEmployees(level, position, arrange, sortByName).then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  }, [level, position, arrange, sortByName]);

  const handleSortByName = () => {
    if (sortByName === null) {
      setSortByName('asc');
    } else if (sortByName === 'asc') {
      setSortByName('des');
    } else if (sortByName === 'des') {
      setSortByName('asc');
    }
  };

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
            <option value='firstName'>First Name</option>
            <option value='middleName'>Middle Name</option>
            <option value='lastName'>Last Name</option>
            <option value='level'>Level</option>
            <option value='position'>Position</option>
            <option value='equipment'>Equipment</option>
            <option value='favoriteBrand'>Favorite Brand</option>
          </select>
        </label>
      </div>

      <EmployeeTable
        employees={employees}
        onDelete={handleDelete}
        handleSortByName={handleSortByName}
      />
    </>
  );
};

export default EmployeeList;
