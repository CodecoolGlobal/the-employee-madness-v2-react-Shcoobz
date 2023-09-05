import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Loading from '../../Components/Loading';
import EmployeeForm from '../../Components/Employees/EmployeeForm';

import updateEmployee from '../../Utility/Employees/updateEmployee';
import fetchById from '../../Utility/Employees/fetchById';
import fetchAvailableEquipment from '../../Utility/Equipment/fetchAvailableEquipment';

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    setEmployeeLoading(true);

    fetchById(id).then((employee) => {
      setEmployee(employee);
      setEmployeeLoading(false);
    });

    fetchAvailableEquipment(setEquipment);
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee).then(() => {
      setUpdateLoading(false);
      navigate('/');
    });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate('/')}
      availableEquipment={equipment}
    />
  );
};

export default EmployeeUpdater;
