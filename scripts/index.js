const socket = new WebSocket('ws://localhost:8080'); // Conectar ao servidor WebSocket

// Função para atualizar a interface com os dados recebidos do servidor
function updateUI(data) {
  document.querySelector('.numero').textContent = data.senhaAtual;
  const historicoElements = document.querySelectorAll('.senha p');
  for (let i = 0; i < data.historico.length; i++) {
    historicoElements[i].textContent = data.historico[i];
  }
}

// Receber mensagens do servidor
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  updateUI(data);
});
