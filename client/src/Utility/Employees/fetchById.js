const fetchById = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};

export default fetchById;
