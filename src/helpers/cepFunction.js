export const getAddress = async (cep) => {
  const URL_1 = 'https://cep.awesomeapi.com.br/json/';
  const URL_2 = 'https://brasilapi.com.br/api/cep/v2/';

  const response = await Promise.any([
    fetch(`${URL_1}${cep}`),
    fetch(`${URL_2}${cep}`),
  ]);

  if (!cep || !response.ok) {
    throw new Error('CEP não encontrado');
  }

  const data = await response.json();
  return data;
};

export const searchCep = async () => {
  const cepValue = document.querySelector('.cep-input');
  const displayCep = document.querySelector('.cart__address');

  try {
    const cep = await getAddress(cepValue.value);
    const streetAddress = cep.address || cep.street;
    const districtAddress = cep.district || cep.neighborhood;
    const address = `${streetAddress} - ${districtAddress} - ${cep.city} - ${cep.state}`;
    displayCep.innerText = address;
  } catch (error) {
    displayCep.innerText = 'CEP não encontrado';
  }
};
