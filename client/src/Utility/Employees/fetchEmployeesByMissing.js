const fetchMissingEmployees = () => {
  return fetch(`/api/employees/missing`).then((res) => res.json());
};

export default fetchMissingEmployees;
