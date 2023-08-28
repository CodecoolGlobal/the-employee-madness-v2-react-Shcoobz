const fetchEquipmentById = (id) => {
  return fetch(`/api/equipment/${id}`).then((res) => res.json());
};

export default fetchEquipmentById;
