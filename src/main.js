// importa folha de estilo
import './style.css';

// importa funções auxiliares
import { searchCep } from './helpers/cepFunctions';
import {
  createProductElement,
  createCartProductElement,
} from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { getSavedCartIDs } from './helpers/cartFunctions';

// captura de elementos html para manipulação via js
const productsContainer = document.querySelector('.products');

// criação de elementos html para exibição de mensagens de carregamento e erro
const displayLoading = () => {
  const loadingElement = document.createElement('h2');
  loadingElement.className = 'loading';
  loadingElement.innerText = 'Carregando...';
  productsContainer.appendChild(loadingElement);
};

// listagem de produtos na tela conforme requisição feita a api, filtrando apenas as informações desejadas, para isso usamos as funções auxiliares fetchProductsList e creatProductElement
const displayProductList = async () => {
  try {
    const productList = await fetchProductsList('computer');
    productsContainer.innerHTML = '';

    productList.forEach((product) => {
      const productElement = createProductElement(product);
      productsContainer.appendChild(productElement);
    });
  } catch (error) {
    productsContainer.innerHTML = '';

    const errorElement = document.createElement('h2');
    errorElement.className = 'error';
    errorElement.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
    productsContainer.appendChild(errorElement);
  }
};

// recupera na tela itens salvo no local storage no carrinho ao atualizar a pagina
const recoveryLocalStorage = () => {
  const cart = document.querySelector('.cart__products');
  const savedIds = getSavedCartIDs();

  savedIds.forEach(async (id) => {
    const productElement = await fetchProduct(id);
    const product = createCartProductElement(productElement);
    cart.appendChild(product);
  });
};

// soma ou subtrai o valor de cada item do carrinho no preço total, para isso faz-se o uso das funções auxiliares getSaveCartIds e fetchProduct
const sumCartTotalPrice = () => {
  const totalPrice = document.querySelector('.total-price');
  const savedIds = getSavedCartIDs();

  let total = 0;

  savedIds.forEach(async (id) => {
    const productElement = await fetchProduct(id);
    console.log(productElement);
    total += productElement.price;
    totalPrice.innerText = total;
  });
};

// addEventListeners
document.querySelector('.cep-button').addEventListener('click', searchCep);

// chamada de funções
window.onload = () => {
  displayLoading();
  displayProductList();
  recoveryLocalStorage();
  sumCartTotalPrice();
};
