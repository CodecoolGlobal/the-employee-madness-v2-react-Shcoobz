// TODO: add hide filters with btn
// TODO: create equipment delete utility like with employees
// TODO: make util comp for fetchEmp && fetchFilteredEmp
// TODO: MARK ALL/RESET attendance

import { useEffect, useState } from 'react';

import Loading from '../../Components/Loading';
import EmployeeTable from '../../Components/Employees/EmployeeTable';
import deleteEmployee from '../../Utility/Employees/deleteEmployee';
import fetchAll from '../../Utility/Employees/fetchAll';
import fetchByFilter from '../../Utility/Employees/fetchByFilters';
import sortByCriteria from '../../Utility/Employees/sortByCriteria';

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [level, setLevel] = useState('');
  const [position, setPosition] = useState('');
  const [arrange, setArrange] = useState('');
  const [sortByName, setSortByName] = useState(null);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      const allEmployees = await fetchAll();
      setEmployees(allEmployees);
      setLoading(false);
    };

    fetchAllEmployees();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEmployees = await fetchByFilter({ level, position });
      setEmployees(fetchedEmployees);
      setLoading(false);
    };

    fetchData();
  }, [level, position]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedEmployees = await sortByCriteria({ arrange, sortByName });
      setEmployees(fetchedEmployees);
      setLoading(false);
    };

    fetchData();
  }, [arrange, sortByName]);

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     let fetchedEmployees;

  //     if (level) {
  //       fetchedEmployees = await fetchByLevel(level);
  //     } else if (position) {
  //       fetchedEmployees = await fetchByPosition(position);
  //     } else if (arrange) {
  //       fetchedEmployees = await sortByArrange(arrange);
  //     } else if (sortByName) {
  //       fetchedEmployees = await sortByNameFunction(sortByName);
  //     } else {
  //       fetchedEmployees = await fetchAll();
  //     }

  //     setEmployees(fetchedEmployees);
  //     setLoading(false);
  //   };

  //   fetchEmployees();
  // }, [level, position, arrange, sortByName]);

  if (loading) {
    return <Loading />;
  }

  const handleSortByName = () => {
    if (sortByName === null) {
      setSortByName('asc');
    } else if (sortByName === 'asc') {
      setSortByName('des');
    } else if (sortByName === 'des') {
      setSortByName('asc');
    }
  };

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
