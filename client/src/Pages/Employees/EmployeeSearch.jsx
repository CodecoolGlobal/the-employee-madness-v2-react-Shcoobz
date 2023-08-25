import { useEffect, useState } from 'react';

import EmployeeTable from '../../Components/Employees/EmployeeTable';
import deleteEmployee from '../../Utility/Employees/deleteEmployee';

const fetchEmployees = (name, handleFetchedData) => {
  return fetch(`/api/employees/search/${name}`)
    .then((res) => res.json())
    .then((data) => handleFetchedData(data));
};

const EmployeeSearch = () => {
  const [employees, setEmployees] = useState(null);

  const path = window.location.pathname;
  const pathParts = path.split('/');
  const searchedName = pathParts[pathParts.length - 1];

  useEffect(() => {
    fetchEmployees(searchedName, setEmployees);
  }, [searchedName]);

  return (
    <div>
      <EmployeeTable employees={employees} onDelete={deleteEmployee} />
    </div>
  );
};

export default EmployeeSearch;
