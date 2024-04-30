const socket = new WebSocket('ws://10.100.10.91:8080'); // Conectar ao servidor WebSocket
const audioElement = new Audio();
audioElement.src = '/assets/bell.mp3';
audioElement.preload = 'auto'; // Define para carregar o áudio automaticamente

let isPlaying = false;

// Função para atualizar a interface com os dados recebidos do servidor
function updateUI(data) {
  const numeroElement = document.querySelector('.numero');
  const historicoElements = document.querySelectorAll('.senha p');

  // Verifica se o número foi alterado
  if (numeroElement.textContent !== data.senhaAtual.toString()) {
    // Atualiza o número na interface
    numeroElement.textContent = data.senhaAtual;

    // Reproduz o áudio sempre que o número é alterado
    playAudio();
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
  playAudio();
});

// Configura o MutationObserver para observar mudanças no conteúdo do elemento
observer.observe(numeroElement, { childList: true, subtree: true });

// Função para reproduzir o áudio
function playAudio() {
  if (!isPlaying) {
    isPlaying = true;
    audioElement.currentTime = 0;
    audioElement.play();
    audioElement.onended = function() {
      isPlaying = false;
    };
  }
}

