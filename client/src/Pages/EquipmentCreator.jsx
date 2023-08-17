import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EquipmentForm from '../Components/EquipmentForm';

const createEquipment = (equipment) => {
  return fetch('/api/equipment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const EquipmentCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEquipment = (equipment) => {
    setLoading(true);

    createEquipment(equipment).then(() => {
      setLoading(false);
      navigate('/equipment-list'); // navigate to the list of equipment
    });
  };

  return (
    <EquipmentForm
      onCancel={() => navigate('/equipment-list')} // if canceled, return to the equipment list
      disabled={loading}
      onSave={handleCreateEquipment}
    />
  );
};

export default EquipmentCreator;
