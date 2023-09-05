const fetchAll = () => {
  return fetch('/api/employees/').then((res) => res.json());
};

export default fetchAll;
