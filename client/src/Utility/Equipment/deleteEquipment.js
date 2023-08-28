const deleteEquipment = (id) => {
  return fetch(`/api/equipment/${id}`, { method: 'DELETE' }).then((res) => res.json());
};

export default deleteEquipment;
