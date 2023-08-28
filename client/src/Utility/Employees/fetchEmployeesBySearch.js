const fetchEmployeesBySearch = (name, handleFetchedData) => {
  return fetch(`/api/employees/search/${name}`)
    .then((res) => res.json())
    .then((data) => handleFetchedData(data));
};

export default fetchEmployeesBySearch;
