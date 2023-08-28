import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading';
import EmployeeTable from '../../Components/Employees/EmployeeTable';

import deleteEmployee from '../../Utility/Employees/deleteEmployee';

const fetchMissingEmployees = () => {
  return fetch(`/api/employees/missing`).then((res) => res.json());
};

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
    fetchMissingEmployees().then((data) => {
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
