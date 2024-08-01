const goToSubscriptionPage = () => {
  window.location.href = 'subscription.html';
}

// Validations

const validateMail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const validateBirthdate = (date) => {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[-\/](0[1-9]|1[0-2])[-\/](\d{4})$/;

  if (!dateRegex.test(date)) {
    return false;
  }

  const parts = date.split(/[-\/]/);
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  const isValidDate = (d, m, y) => {
    const dateObj = new Date(y, m - 1, d); // JavaScript Date usa mês baseado em zero
    return dateObj.getFullYear() === y && dateObj.getMonth() === m - 1 && dateObj.getDate() === d;
  };
  return isValidDate(day, month, year);
};

const validateDocumentNumber = (docNumber) => {
  docNumber = docNumber.replace(/[^\d]/g, '');

  if (docNumber.length !== 11) {
    return false;
  }

  if (/^(\d)\1{10}$/.test(docNumber)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(docNumber.charAt(i)) * (10 - i);
  }
  let firstCheckDigit = 11 - (sum % 11);
  firstCheckDigit = firstCheckDigit >= 10 ? 0 : firstCheckDigit;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(docNumber.charAt(i)) * (11 - i);
  }
  let secondCheckDigit = 11 - (sum % 11);
  secondCheckDigit = secondCheckDigit >= 10 ? 0 : secondCheckDigit;

  return firstCheckDigit === parseInt(docNumber.charAt(9)) && secondCheckDigit === parseInt(docNumber.charAt(10));
};

// Creation of Error messages

const createErrorMessage = (field) => {
  let errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');

  if (field.id === "complete-name") {
    errorMessage.textContent = "O nome deve conter ao menos 6 caracteres!";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "birth-date") {
    errorMessage.textContent = "Data ou formato inválido! Use dia/mês/ano (com 4 dígitos)";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "document-number") {
    errorMessage.textContent = "Insira um CPF válido!";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "email") {
    errorMessage.textContent = "Insira um e-mail válido!";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "postal") {
    errorMessage.textContent = "Você deve inserir um CEP completo";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "street") {
    errorMessage.textContent = "Você deve preencher o campo 'rua' com ao menos 6 caracteres";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "neighborhood") {
    errorMessage.textContent = "O campo não pode estar vazio";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "city") {
    errorMessage.textContent = "O campo não pode estar vazio";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "state") {
    errorMessage.textContent = "O campo 'UF' deve conter apenas 2 caracteres";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "tell-us-more") {
    errorMessage.textContent = "Este campo não pode estar vazio!!!";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }
}

// Getting address from API

const getAddressByPostalcode = (postalCode) => {
  return fetch(`https://viacep.com.br/ws/${postalCode}/json/`).then(response => response.json());
}

const fetchAddress = async (postalCode) => {
  try {
    const address = await getAddressByPostalcode(postalCode);
    return address;
  } catch (e) {
    console.error(e);
    return "Erro";
  };
}

// Fill address fields based on postal code

async function fillAddressFields(postalCode) {
  const street = document.getElementById("street");
  const neighborhood = document.getElementById("neighborhood");
  const city = document.getElementById("city");
  const state = document.getElementById("state");

  try {
    const add = await fetchAddress(postalCode);
    if (add.erro) {
      throw new Error("CEP Inválido ou não encontrado!");
    }
    street.value = add.logradouro;
    neighborhood.value = add.bairro;
    city.value = add.localidade;
    state.value = add.uf
  } catch (e) {
    console.error("Erro ao buscar o endereço\n" + e);
  }
}

document.getElementById('postal').addEventListener('input', e => {
  const postalCode = e.target.value;
  const address = {};

  if (postalCode.length === 8) {
    fillAddressFields(postalCode);
  }
});

// Form Submission with the general logics

document.getElementById('subscription-form').addEventListener('submit', function (e) {
  e.preventDefault();

  let errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function (msg) {
    msg.remove();
  });

  const fullName = document.getElementById("complete-name");
  const birthDate = document.getElementById("birth-date");
  const documentNumber = document.getElementById("document-number");
  const email = document.getElementById("email");
  const option = document.getElementById("subscribe-options");
  const postal = document.getElementById("postal");
  const street = document.getElementById("street");
  const houseNumber = document.getElementById("house-number");
  const neighborhood = document.getElementById("neighborhood");
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const tellUsMore = document.getElementById("tell-us-more");

  if (fullName.value.length < 6) {
    createErrorMessage(fullName);
    return;
  }

  if (!validateBirthdate(birthDate.value)) {
    createErrorMessage(birthDate);
    return;
  }

  if (!validateDocumentNumber(documentNumber.value)) {
    createErrorMessage(documentNumber);
    return;
  }

  if (!validateMail(email.value)) {
    createErrorMessage(email);
    return;
  }

  if (postal.value.length !== 8) {
    createErrorMessage(postal);
    return;
  }

  if (street.value.length < 6) {
    console.log(street.value.length);
    createErrorMessage(street);
    return;
  }

  if (neighborhood.value.length < 2) {
    createErrorMessage(neighborhood);
    return;
  }

  if (city.value.length < 2) {
    createErrorMessage(city);
    return;
  }

  if (state.value.length < 2 || state.value.length > 4) {
    createErrorMessage(state);
    return;
  }

  if (tellUsMore.value.length === 0) {
    createErrorMessage(tellUsMore);
    return;
  }
  alert("SUCESSO");
  document.getElementById('subscription-form').reset();
});
