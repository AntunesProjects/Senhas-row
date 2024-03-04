const socket = new WebSocket('ws://127.0.0.1:8080'); // Conectar ao servidor WebSocket

const historicoElements = document.querySelectorAll('.senha p');

// Função para atualizar a interface com os dados recebidos do servidor
function updateUI(data) {
  document.querySelector('.numero').textContent = data.senhaAtual;
  const historicoElements = document.querySelectorAll('.senha p');
  for (let i = 0; i < historicoElements.length; i++) {
    if (i < data.historico.length) {
      historicoElements[i].textContent = data.historico[i];
    }
  }
}

// Função para enviar uma nova senha para o servidor quando o botão "ADICIONAR +1" é clicado
document.getElementById('add').addEventListener('click', () => {
  const novaSenha = parseInt(document.querySelector('.numero').textContent) + 1;
  socket.send(novaSenha.toString());
});

// Função para enviar a senha digitada para o servidor ao pressionar "Enter"
document.querySelector('input[type="text"]').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const novaSenha = parseInt(event.target.value);
    if (!isNaN(novaSenha)) {
      socket.send(novaSenha.toString());
      event.target.value = '';
    }
  }
});

// Função para enviar um sinal de zerar tudo para o servidor quando o botão "ZERAR" é clicado
document.getElementById('zerar').addEventListener('click', () => {
  const confirmacao = confirm('Tem certeza que deseja zerar tudo?');
  if (confirmacao) {
    const zerosConsecutivos = '0'.repeat(3); // Criar a string com 4 zeros consecutivos

    // Atualizar localmente o array historico para [0, 0, 0, 0]
    historico = [0, 0, 0];

    // Utilize a variável historicoElements definida externamente
    historicoElements.forEach((element, index) => {
      element.textContent = '0'; // Define o histórico como 0 após o reset
    });

    // Enviar a mensagem para o servidor após atualizar localmente
    socket.send(JSON.stringify({ resetar: true }));
  }
});


// Receber mensagens do servidor
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.resetar) {
    document.querySelector('.numero').textContent = '0'; // Define a senha atual como 00 após o reset
    const historicoElements = document.querySelectorAll('.senha p');
    historicoElements.forEach(element => {
      element.textContent = '0'; // Define o histórico como 0 após o reset
    });
  } else {
    updateUI(data);
  }
});
