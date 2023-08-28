const updateEquipment = (equipment) => {
  return fetch(`/api/equipment/${equipment._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

export default updateEquipment;
