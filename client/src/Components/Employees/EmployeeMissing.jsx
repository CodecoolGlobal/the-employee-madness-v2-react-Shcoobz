import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading';
import EmployeeTable from '../../Components/Employees/EmployeeTable';

// import fetchEmployees from '../../Utility/Employees/fetchEmployees';
import deleteEmployee from '../../Utility/Employees/deleteEmployee';

const fetchEmployees = () => {
  return fetch(`/api/employees/`).then((res) => res.json());
};

const EmployeeMissing = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees().then((res) => {
      console.log('fetching missing employees:', res);
      setLoading(false);
      const filteredEmployees = res.filter(
        (employee) => employee.attendance === false
      );
      setEmployees(filteredEmployees);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2>Missing Employees</h2>
      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeMissing;
