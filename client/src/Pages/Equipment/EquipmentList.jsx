import { useEffect, useState } from 'react';
import Loading from '../../Components/Loading';
import EquipmentTable from '../../Components/Equipment/EquipmentTable';

const fetchEquipments = () => {
  return fetch(`/api/equipment`).then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: 'DELETE' }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState(null);

  const handleDelete = (id) => {
    deleteEquipment(id);

    setEquipments((previousEquipments) => {
      return previousEquipments.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipments().then((equipmentsData) => {
      setLoading(false);
      setEquipments(equipmentsData);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <EquipmentTable equipments={equipments} onDelete={handleDelete} />;
    </>
  );
};

export default EquipmentList;
