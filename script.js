document.addEventListener('DOMContentLoaded', function () {
  const numeroElement = document.querySelector('.numero');
  const historicoElements = document.querySelectorAll('.senha p');

  function atualizarIndex(numero, historico) {
    numeroElement.textContent = numero;
    historicoElements.forEach((element, index) => {
      element.textContent = historico[index];
    });
  }

  if (localStorage.getItem('numero')) {
    numeroElement.textContent = localStorage.getItem('numero');
  }
  if (localStorage.getItem('historico')) {
    const historico = JSON.parse(localStorage.getItem('historico'));
    historico.forEach((value, index) => {
      historicoElements[index].textContent = value;
    });
  }

  function atualizarIndexComAdmin() {
    const numero = localStorage.getItem('numero');
    const historico = JSON.parse(localStorage.getItem('historico')) || [0, 0, 0];
    atualizarIndex(numero, historico);
  }

  atualizarIndexComAdmin();
});

