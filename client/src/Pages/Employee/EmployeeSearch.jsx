import { useEffect, useState } from 'react';

import EmployeeTable from '../../Components/Employees/EmployeeTable';

import deleteEmployee from '../../Utility/Employees/deleteEmployee';
import fetchEmployeesBySearch from '../../Utility/Employees/fetchEmployeesBySearch';

const EmployeeSearch = () => {
  const [employees, setEmployees] = useState(null);

  const path = window.location.pathname;
  const pathParts = path.split('/');
  const searchedName = pathParts[pathParts.length - 1];

  useEffect(() => {
    fetchEmployeesBySearch(searchedName, setEmployees);
  }, [searchedName]);

  return (
    <div>
      <EmployeeTable employees={employees} onDelete={deleteEmployee} />
    </div>
  );
};

export default EmployeeSearch;
