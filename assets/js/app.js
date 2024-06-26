const validateMail = (email) => {
  const nameArray = email.split('');
  const endMailArray = nameArray.splice(-4, 4);
  const endMailString = endMailArray.join('');
  const endingDotCom = endMailString === ".com";
  const endingDotBr = endMailString === "m.br";
  const validationOne = nameArray.filter(el => el === "@");
  const validationTwo = endingDotCom || endingDotBr;
  return validationOne.length === 1 && validationTwo;
}

document.getElementById('newsletter-form').addEventListener('submit', function (e) {
  e.preventDefault(); 

  let errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function (msg) {
    msg.remove();
  });

  const fullName = document.getElementById("complete-name");
  const email = document.getElementById("mail");

  
  if (fullName.value.length < 6) {
    let errorMessage = document.createElement('div');
    console.log("Cheguei aqui")
    errorMessage.classList.add('error-message');
    errorMessage.textContent = "O nome de usuário é obrigatório e deve conter ao menos 6 caracteres.";
    fullName.parentNode.insertBefore(errorMessage, fullName.nextSibling);
    return;
  }

  if (!validateMail(email.value)) {
    let errorMessage = document.createElement('div');
    errorMessage.classList.add('error-message');
    errorMessage.textContent = "Você deve fornecer um e-mail válido!";
    email.parentNode.insertBefore(errorMessage, email.nextSibling);
    return;
  }

  alert("Obrigado por se inscrever! Manteremos você atualizado(a)! ;)");
  document.getElementById('newsletter-form').reset();
});