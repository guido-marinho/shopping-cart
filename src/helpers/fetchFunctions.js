export const fetchProduct = async (productId) => {
  if (!productId) {
    throw new Error('ID não informado');
  }

  const URL = 'https://api.mercadolibre.com/items/';

  const response = await fetch(`${URL}${productId}`);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (product) => {
  if (!product) {
    throw new Error('Termo de busca não informado');
  }

  const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=';

  const response = await fetch(`${URL}${product}`);
  const data = await response.json();

  return data.results;
};
