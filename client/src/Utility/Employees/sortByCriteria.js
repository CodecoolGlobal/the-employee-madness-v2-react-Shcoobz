const sortByCriteria = async ({ arrange, sortByName }) => {
  const sortParams = new URLSearchParams();

  if (arrange) {
    sortParams.append('arrange', arrange);
  }

  if (sortByName) {
    sortParams.append('sortByName', sortByName);
  }

  const response = await fetch(`/api/employees/sort?${sortParams.toString()}`);
  return response.json();
};

export default sortByCriteria;
