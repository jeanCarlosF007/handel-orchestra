const goToSubscriptionPage = () => {
  window.location.href = 'subscription.html';
}

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

const createErrorMessage = (field) => {
  let errorMessage = document.createElement('div');
  errorMessage.classList.add('error-message');
  console.log(field.id);

  if (field.id === "complete-name") {
    errorMessage.textContent = "O nome deve conter ao menos 6 caracteres!";
    field.parentNode.insertBefore(errorMessage, field.nextSibling);
    return;
  }

  errorMessage.textContent = "Você deve fornecer um e-mail válido!";
  email.parentNode.insertBefore(errorMessage, email.nextSibling);
  return;
}

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


  console.log(fullName.value);
  console.log(birthDate.value);
  console.log(documentNumber.value);
  console.log(email.value);
  console.log(option.value);
  console.log(postal.value);
  console.log(street.value);
  console.log(houseNumber.value);
  console.log(neighborhood.value);
  console.log(city.value);
  console.log(state.value);
  console.log(tellUsMore.value);


  if (fullName.value.length < 6) {
    createErrorMessage(fullName);
    return;
  }

  if (!validateMail(email.value)) {
    let errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = "Você deve fornecer um e-mail válido!";
    email.parentNode.insertBefore(errorMessage, email.nextSibling);
    return;
  }

  if (!validateBirthdate(birthDate)) {

  }

  document.getElementById('subscription-form').reset();
});

function testLS() {

}