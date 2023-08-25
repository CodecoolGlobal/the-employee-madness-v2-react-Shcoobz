import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EquipmentForm from '../../Components/EquipmentForm';
import Loading from '../../Components/Loading';

const updateEquipment = (equipment) => {
  return fetch(`/api/equipment/${equipment._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const fetchEquipment = (id) => {
  return fetch(`/api/equipment/${id}`).then((res) => res.json());
};

const EquipmentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(true);

  useEffect(() => {
    setEquipmentLoading(true);
    fetchEquipment(id)
      .then((equipmentData) => {
        setEquipment(equipmentData);
        setEquipmentLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching equipment:', error);
        setEquipmentLoading(false);
      });
  }, [id]);

  const handleUpdateEquipment = (updatedEquipment) => {
    setUpdateLoading(true);
    updateEquipment(updatedEquipment)
      .then(() => {
        setUpdateLoading(false);
        navigate('/equipment-list');
      })
      .catch((error) => {
        console.error('Error updating equipment:', error);
        setUpdateLoading(false);
        alert('There was an error updating the equipment. Please try again.');
      });
  };

  if (equipmentLoading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      equipment={equipment}
      onSave={handleUpdateEquipment}
      disabled={updateLoading}
      onCancel={() => navigate('/equipment-list')}
    />
  );
};

export default EquipmentUpdater;
