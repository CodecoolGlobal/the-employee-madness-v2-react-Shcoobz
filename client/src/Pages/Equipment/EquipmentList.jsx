import { useEffect, useState } from 'react';

import Loading from '../../Components/Loading';
import EquipmentTable from '../../Components/Equipment/EquipmentTable';

import deleteEquipment from '../../Utility/Equipment/deleteEquipment';
import fetchEquipments from '../../Utility/Equipment/fetchEquipments';

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
