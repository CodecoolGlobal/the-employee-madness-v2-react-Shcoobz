const createEmployee = (employee) => {
  return fetch('/api/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

export default createEmployee;
