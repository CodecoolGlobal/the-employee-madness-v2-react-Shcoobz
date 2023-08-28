import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from '../../Components/Employees/EmployeeForm';
import createEmployee from '../../Utility/Employees/createEmployee';

const EmployeeCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEmployee = (employee) => {
    setLoading(true);

    createEmployee(employee).then(() => {
      setLoading(false);
      navigate('/');
    });
  };

  return (
    <EmployeeForm
      onCancel={() => navigate('/')}
      disabled={loading}
      onSave={handleCreateEmployee}
    />
  );
};

export default EmployeeCreator;
