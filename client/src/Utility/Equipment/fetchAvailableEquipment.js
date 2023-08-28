const fetchAvailableEquipment = async () => {
  const response = await fetch('/api/equipment');
  const data = await response.json();
  return data;
};

export default fetchAvailableEquipment;
