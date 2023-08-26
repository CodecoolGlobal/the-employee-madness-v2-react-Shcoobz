// TODO: add hide filters with btn
// TODO: create equipment delete utility like with employees
// TODO: make util comp for fetchEmp && fetchFilteredEmp
// TODO: MARK ALL/RESET attendance

// TODO: for PA: remove/deactivate pagination functionality

import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading';
import EmployeeTable from '../../Components/Employees/EmployeeTable';

import deleteEmployee from '../../Utility/Employees/deleteEmployee';

const fetchFilteredEmployees = (
  level,
  position,
  arrange,
  pageNumber,
  isPaginationActive
) => {
  const employeeFilters = new URLSearchParams();

  employeeFilters.append('level', level);
  employeeFilters.append('position', position);
  employeeFilters.append('arrange', arrange);
  // employeeFilters.append('pageNumber', pageNumber);
  if (isPaginationActive) {
    employeeFilters.append('pageNumber', pageNumber);
  }
  employeeFilters.append('isPaginationActive', isPaginationActive.toString());

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

  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const [isPaginationActive, setIsPaginationActive] = useState(false);

  useEffect(() => {
    fetchFilteredEmployees(
      level,
      position,
      arrange,
      pageNumber,
      isPaginationActive
    ).then((employees) => {
      setLoading(false);
      setEmployees(employees.employees);
      setItemsPerPage(employees.totalPages);
    });
  }, [level, position, arrange, pageNumber, isPaginationActive]);

  if (loading) {
    return <Loading />;
  }

  const pages = new Array(itemsPerPage).fill(null).map((v, i) => i);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  return (
    <>
      <button
        onClick={() => {
          setIsPaginationActive(!isPaginationActive);
          setPageNumber(1);
        }}>
        {isPaginationActive ? 'Pagination Off' : 'Pagination On'}
      </button>
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

      {itemsPerPage > 1 && (
        <div className='pagination'>
          {pages.map((index) => (
            <button
              key={index}
              value={index + 1}
              onClick={(e) => setPageNumber(e.target.value)}>
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default EmployeeList;
