document.addEventListener('DOMContentLoaded', function () {
  const numeroElement = document.querySelector('.numero');
  const historicoElements = document.querySelectorAll('.senha p');
  const adicionarButton = document.getElementById('add');
  const inputEditar = document.querySelector('input[type="text"]');
  const zerarButton = document.getElementById('zerar');

  // Função para atualizar o número e o histórico
  function atualizarNumero(numero) {
    const historico = JSON.parse(localStorage.getItem('historico')) || [0, 0, 0];
    const numeroAtual = parseInt(numeroElement.textContent) || 0;

    historico.unshift(numeroAtual);
    historico.pop();

    localStorage.setItem('numero', numero);
    localStorage.setItem('historico', JSON.stringify(historico));

    numeroElement.textContent = numero;
    historicoElements.forEach((element, index) => {
      element.textContent = historico[index];
    });
  }

  // Verifica e carrega dados do LocalStorage
  if (localStorage.getItem('numero')) {
    numeroElement.textContent = localStorage.getItem('numero');
  }
  if (localStorage.getItem('historico')) {
    const historico = JSON.parse(localStorage.getItem('historico'));
    historico.forEach((value, index) => {
      historicoElements[index].textContent = value;
    });
  }

  // Evento para adicionar +1 ao número
  adicionarButton.addEventListener('click', function () {
    const numeroAtual = parseInt(numeroElement.textContent) || 0;
    const novoNumero = numeroAtual + 1;
    atualizarNumero(novoNumero);
  });

  // Evento para editar o número ao pressionar Enter no campo de texto
  inputEditar.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      const novoNumero = parseInt(inputEditar.value);
      if (!isNaN(novoNumero)) {
        atualizarNumero(novoNumero);
        inputEditar.value = '';
      }
    }
  });

  // Evento para zerar os dados com confirmação
  zerarButton.addEventListener('click', function () {
    const confirmacao = confirm('Tem certeza que deseja limpar os dados?');
    if (confirmacao) {
      localStorage.removeItem('numero');
      localStorage.removeItem('historico');
      numeroElement.textContent = '00';
      historicoElements.forEach(element => {
        element.textContent = '0';
      });
    }
  });
});

