const fetchFavoriteBrands = async () => {
  const response = await fetch('/api/favoriteBrands');
  const data = await response.json();
  return data;
};

export default fetchFavoriteBrands;
