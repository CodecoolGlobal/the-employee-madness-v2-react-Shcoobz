import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeForm from '../../Components/Employees/EmployeeForm';
import Loading from '../../Components/Loading';

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

const fetchEquipment = (dataSetter) => {
  return fetch(`/api/equipment`)
    .then((res) => res.json())
    .then((data) => dataSetter(data));
};

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);

  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id).then((employee) => {
      setEmployee(employee);
      setEmployeeLoading(false);
    });
  }, [id]);

  useEffect(() => {
    fetchEquipment(setEquipment);
  }, []);

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
