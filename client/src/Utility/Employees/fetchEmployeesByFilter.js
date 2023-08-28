const fetchFilteredEmployees = (level, position, arrange, sortByName) => {
  const employeeFilters = new URLSearchParams();
  employeeFilters.append('level', level);
  employeeFilters.append('position', position);
  employeeFilters.append('arrange', arrange);

  if (sortByName) {
    employeeFilters.append('sortByName', sortByName);
  }

  return fetch(`/api/employees/?${employeeFilters.toString()}`).then((res) => res.json());
};

export default fetchFilteredEmployees;
