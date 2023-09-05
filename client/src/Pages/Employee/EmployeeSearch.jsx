import { useEffect, useState } from 'react';

import EmployeeTable from '../../Components/Employees/EmployeeTable';

import deleteEmployee from '../../Utility/Employees/deleteEmployee';
import fetchByNameSearch from '../../Utility/Employees/fetchByNameSearch';

const EmployeeSearch = () => {
  const [employees, setEmployees] = useState(null);

  const path = window.location.pathname;
  const pathParts = path.split('/');
  const searchedName = pathParts[pathParts.length - 1];

  useEffect(() => {
    fetchByNameSearch(searchedName, setEmployees);
  }, [searchedName]);

  return (
    <div>
      <EmployeeTable employees={employees} onDelete={deleteEmployee} />
    </div>
  );
};

export default EmployeeSearch;
