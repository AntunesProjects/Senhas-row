const socket = new WebSocket('ws://127.0.0.1:8080'); // Conectar ao servidor WebSocket
const audioElement = new Audio('/assets/bell.mp3');

// Função para atualizar a interface com os dados recebidos do servidor
function updateUI(data) {
  const numeroElement = document.querySelector('.numero');
  const historicoElements = document.querySelectorAll('.senha p');

  // Verifica se o número foi alterado
  if (numeroElement.textContent !== data.senhaAtual.toString()) {
    // Atualiza o número na interface
    numeroElement.textContent = data.senhaAtual;

    // Reproduz o áudio sempre que o número é alterado
      setTimeout(() => {
      audioElement.play();
    }, 1000); 
  }

  // Atualiza o histórico na interface
  for (let i = 0; i < data.historico.length; i++) {
    historicoElements[i].textContent = data.historico[i];
  }
}

// Receber mensagens do servidor
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  updateUI(data);
});

// Utiliza MutationObserver para observar mudanças no conteúdo do elemento que exibe o número
const numeroElement = document.querySelector('.numero');
const observer = new MutationObserver(() => {
  // Reproduz o áudio sempre que o número é alterado
  audioElement.play();
});

// Configura o MutationObserver para observar mudanças no conteúdo do elemento
observer.observe(numeroElement, { childList: true, subtree: true });
