const goToSubscriptionPage = () => {
  window.location.href = 'subscription.html';
}

//Load table with subscriptions

document.addEventListener("DOMContentLoaded", () => {
  const contentToLoad = localStorage.getItem("subscriptions");
  generateTable(JSON.parse(contentToLoad));
});

// End subscription dates for comparison

let endSubSecondTrumpet = "30/07/2024, 23:59:59";
let endSubSecondCello = "06/09/2024, 23:59:59";
let endSubThirdViolin = "12/09/2024, 23:59:59";
let endSubSecondViolin = "20/09/2024, 23:59:59";

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

const deletePreviousErrorMessages = () => {
  let errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function (msg) {
    msg.remove();
  });
}

const createErrorMessage = (field) => {
  deletePreviousErrorMessages();
  let errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');

  if (field.id === "complete-name" || field.id === "complete-name-modal") {
    errorMessage.textContent = "O nome deve conter ao menos 6 caracteres!";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "birth-date" || field.id === "birth-date-modal") {
    errorMessage.textContent = "Data ou formato inválido! Use dia/mês/ano (com 4 dígitos)";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "document-number" || field.id === "document-number-modal") {
    errorMessage.textContent = "Insira um CPF válido!";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "email" || field.id === "email-modal") {
    errorMessage.textContent = "Insira um e-mail válido!";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "postal" || field.id === "postal-modal") {
    errorMessage.textContent = "Você deve inserir um CEP completo";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "street" || field.id === "street-modal") {
    errorMessage.textContent = "Você deve preencher o campo 'rua' com ao menos 6 caracteres";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "neighborhood" || field.id === "neighborhood-modal") {
    errorMessage.textContent = "O campo não pode estar vazio";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "city" || field.id === "city-modal") {
    errorMessage.textContent = "O campo não pode estar vazio";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  if (field.id === "state" || field.id === "state-modal") {
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

//

const returnSubscribeDate = () => {
  let now = new Date();
  let options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'America/Sao_Paulo'
  };
  let formattedDateTime = now.toLocaleString('pt-BR', options);
  return formattedDateTime;
}

const parseDateTime = (dateTimeString) => {
  let [datePart, timePart] = dateTimeString.split(', ');
  let [day, month, year] = datePart.split('/');
  let [hours, minutes, seconds] = timePart.split(':');
  return new Date(year, month - 1, day, hours, minutes, seconds);
}

const checkSubscriptionDate = (formattedDateTime, comparisonDateTime) => {
  let date1 = parseDateTime(formattedDateTime);
  let date2 = parseDateTime(comparisonDateTime);
  return date1 < date2;
}

// Table buttons functions

const deleteSubscription = (id) => {
  const localData = localStorage.getItem("subscriptions");
  const data = JSON.parse(localData);
  const userConfirmed = confirm("Você tem certeza que deseja cancelar esta inscrição?\nA ação não poderá ser desfeita!");

  if (!userConfirmed) {
    return null;
  } else {
    data.splice(id - 1, 1);
    let newIndex = 1;
    data.forEach((item, index) => {
      item.id = newIndex++;
    });
    localStorage.setItem("subscriptions", JSON.stringify(data));
    generateTable(data);
    alert("Inscrição cancelada com sucesso!");
  }  
}


const openModal = (id) => {
  const localData = localStorage.getItem("subscriptions");
  const data = JSON.parse(localData);
  let subscriptionData = data[id - 1];

  const identifier = document.getElementById("id-modal");
  const fullName = document.getElementById("complete-name-modal");
  const birthDate = document.getElementById("birth-date-modal");
  const documentNumber = document.getElementById("document-number-modal");
  const email = document.getElementById("email-modal");
  const option = document.getElementById("subscribe-options-modal");
  const postal = document.getElementById("postal-modal");
  const street = document.getElementById("street-modal");
  const houseNumber = document.getElementById("house-number-modal");
  const neighborhood = document.getElementById("neighborhood-modal");
  const city = document.getElementById("city-modal");
  const state = document.getElementById("state-modal");

  identifier.value = subscriptionData.id;
  fullName.value = subscriptionData.name;
  birthDate.value = subscriptionData.birthDate;
  documentNumber.value = subscriptionData.documentNumber;
  email.value = subscriptionData.email;
  option.value = subscriptionData.option;
  postal.value = subscriptionData.postal;
  street.value = subscriptionData.street;
  houseNumber.value = subscriptionData.birthDate;
  neighborhood.value = subscriptionData.neighborhood;
  city.value = subscriptionData.city;
  state.value = subscriptionData.state;
};

const saveNewSettings = () => {
  const localData = localStorage.getItem("subscriptions");
  const data = JSON.parse(localData);
  const id = document.getElementById("id-modal").value;
  let subscriptionData = data[id - 1];

  const fullName = document.getElementById("complete-name-modal");
  const birthDate = document.getElementById("birth-date-modal");
  const documentNumber = document.getElementById("document-number-modal");
  const email = document.getElementById("email-modal");
  const option = document.getElementById("subscribe-options-modal");
  const postal = document.getElementById("postal-modal");
  const street = document.getElementById("street-modal");
  const houseNumber = document.getElementById("house-number-modal");
  const neighborhood = document.getElementById("neighborhood-modal");
  const city = document.getElementById("city-modal");
  const state = document.getElementById("state-modal");

  //Basic validations (just like on original form)
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
  // End of basic validations

  subscriptionData.name = fullName.value;
  subscriptionData.birthDate = birthDate.value;
  subscriptionData.documentNumber = documentNumber.value;
  subscriptionData.email = email.value;
  subscriptionData.option = option.value;
  subscriptionData.postal = postal.value;
  subscriptionData.street = street.value;
  subscriptionData.houseNumber = houseNumber.value ? houseNumber.value : "S/N";
  subscriptionData.neighborhood = neighborhood.value;
  subscriptionData.city = city.value;
  subscriptionData.state = state.value;

  data[id - 1] = subscriptionData;
  localStorage.setItem("subscriptions", JSON.stringify(data));
  alert("DADOS ATUALIZADOS COM SUCESSO!");
  generateTable(data);
  location.reload();
}


// Subscriptions Table Generation

const generateTable = (data) => {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = '';

  data.forEach((item, index) => {
    const row = document.createElement('tr');

    const idCell = document.createElement('th');
    idCell.textContent = item.id;
    row.appendChild(idCell);

    const optionCell = document.createElement('td');
    optionCell.textContent = item.option;
    row.appendChild(optionCell);

    const statusCell = document.createElement('td');
    switch (item.option) {
      case "Segundo Trompete":
        statusCell.textContent = checkSubscriptionDate(item.subscribeDate, endSubSecondTrumpet) ? "Em andamento" : "Inscrições encerradas";
        row.appendChild(statusCell);
        break;
      case "Segundo Violoncelo":
        statusCell.textContent = checkSubscriptionDate(item.subscribeDate, endSubSecondCello) ? "Em andamento" : "Inscrições encerradas";
        row.appendChild(statusCell);
        break;
      case "Terceiro Violino":
        statusCell.textContent = checkSubscriptionDate(item.subscribeDate, endSubThirdViolin) ? "Em andamento" : "Inscrições encerradas";
        row.appendChild(statusCell);
        break;
      case "Segundo Violino":
        statusCell.textContent = checkSubscriptionDate(item.subscribeDate, endSubSecondViolin) ? "Em andamento" : "Inscrições encerradas";
        row.appendChild(statusCell);
        break;
    }
    row.appendChild(statusCell);

    const actionCell = document.createElement('td');
    actionCell.classList.add('action-cell');

    const button1 = document.createElement('button');
    button1.textContent = 'Editar';
    button1.classList.add('btn', 'btn-info', 'table-button');
    button1.setAttribute('type', 'button');
    button1.setAttribute('data-bs-toggle', 'modal');
    button1.setAttribute('data-bs-target', '#exampleModal');
    button1.addEventListener('click', () => openModal(item.id));

    if (statusCell.textContent === "Em andamento") {
      actionCell.appendChild(button1);
    }

    const button2 = document.createElement('button');
    button2.textContent = 'Cancelar';
    button2.classList.add('btn', 'btn-danger', 'table-button');
    button2.addEventListener('click', () => deleteSubscription(item.id));
    actionCell.appendChild(button2);

    row.appendChild(actionCell);
    tableBody.appendChild(row);
  });
}

// Form Submission with the general logics

document.getElementById('subscription-form').addEventListener('submit', function (e) {
  e.preventDefault();

  let subscriptions = [];
  let storedData = localStorage.getItem("subscriptions");
  console.log(localStorage.getItem("subscriptions"));

  if (storedData) {
    subscriptions = JSON.parse(storedData);
  }

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
  const subscribeDate = returnSubscribeDate();
  const subscriptionData = {};

  // Basic validations
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
  // End of basic validations

  subscriptionData.id = subscriptions.length === 0 ? 1 : subscriptions.length + 1;
  subscriptionData.name = fullName.value;
  subscriptionData.birthDate = birthDate.value;
  subscriptionData.documentNumber = documentNumber.value;
  subscriptionData.email = email.value;
  subscriptionData.option = option.value;
  subscriptionData.postal = postal.value;
  subscriptionData.street = street.value;
  subscriptionData.houseNumber = houseNumber.value ? houseNumber.value : "S/N";
  subscriptionData.neighborhood = neighborhood.value;
  subscriptionData.city = city.value;
  subscriptionData.state = state.value;
  subscriptionData.tellUsMore = tellUsMore.value;
  subscriptionData.subscribeDate = subscribeDate;

  subscriptions.push(subscriptionData);
  localStorage.setItem("subscriptions", JSON.stringify(subscriptions));

  generateTable(subscriptions);
  alert("INSCRIÇÃO REALIZADA COM SUCESSO");
  document.getElementById('subscription-form').reset();
});
