import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EquipmentForm from '../../Components/Equipment/EquipmentForm';

import createEquipment from '../../Utility/Equipment/createEquipment';

const EquipmentCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateEquipment = (equipment) => {
    setLoading(true);

    createEquipment(equipment).then(() => {
      setLoading(false);
      navigate('/equipment-list');
    });
  };

  return (
    <EquipmentForm
      onCancel={() => navigate('/equipment-list')}
      disabled={loading}
      onSave={handleCreateEquipment}
    />
  );
};

export default EquipmentCreator;
