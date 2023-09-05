const fetchByFilter = async ({ level, position }) => {
  const employeeFilters = new URLSearchParams();

  if (level) {
    employeeFilters.append('level', level);
  }

  if (position) {
    employeeFilters.append('position', position);
  }

  const response = await fetch(`/api/employees/filter?${employeeFilters.toString()}`);
  return response.json();
};

export default fetchByFilter;
