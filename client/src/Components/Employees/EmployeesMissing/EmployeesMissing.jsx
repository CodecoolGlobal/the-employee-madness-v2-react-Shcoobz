import { useEffect, useState } from 'react';

import Loading from '../../Loading';
import EmployeeTable from '../EmployeeTable';

import deleteEmployee from '../../../Utility/Employees/deleteEmployee';
import fetchEmployeesByMissing from '../../../Utility/Employees/fetchEmployeesByMissing';

import './EmployeesMissing.css';

const EmployeeMissing = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployeesByMissing().then((data) => {
      setLoading(false);

      const missingEmployees = data.employees.filter(
        (employee) => employee.attendance === false
      );

      setEmployees(missingEmployees);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2>Missing Employees: {employees.length}</h2>
      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeMissing;
