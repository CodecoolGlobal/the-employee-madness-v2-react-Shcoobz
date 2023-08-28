const createEquipment = (equipment) => {
  return fetch('/api/equipment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

export default createEquipment;
