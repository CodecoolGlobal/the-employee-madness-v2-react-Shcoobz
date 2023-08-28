const fetchEquipments = () => {
  return fetch(`/api/equipment`).then((res) => res.json());
};

export default fetchEquipments;
