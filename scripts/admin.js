const socket = new WebSocket('ws://127.0.0.1:8080'); // Conectar ao servidor WebSocket

const historicoElements = document.querySelectorAll('.senha p');
const novoNomeInput = document.getElementById('novoNome');

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

// Função para enviar uma nova senha para o servidor quando o botão "ADICIONAR" é clicado ou a tecla Enter é pressionada
function adicionarNome() {
  const novoNome = novoNomeInput.value.trim(); // Obtém o valor do campo de texto, removendo espaços em branco no início e no final
  if (novoNome !== '') {
    socket.send(JSON.stringify(novoNome)); // Convertendo o novo nome para JSON antes de enviar
    novoNomeInput.value = ''; // Limpa o campo de texto depois de enviar
  }
}

document.getElementById('add').addEventListener('click', adicionarNome);

// Adicionar ouvinte de evento para a tecla Enter
novoNomeInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    adicionarNome();
  }
});

// Função para enviar um sinal de zerar tudo para o servidor quando o botão "ZERAR" é clicado
document.getElementById('zerar').addEventListener('click', () => {
  const confirmacao = confirm('Tem certeza que deseja zerar tudo?');
  if (confirmacao) {
    socket.send(JSON.stringify({ resetar: true }));
  }
});

// Receber mensagens do servidor
socket.addEventListener('message', (event) => {
  try {
    const data = JSON.parse(event.data);
    if (data.resetar) {
      document.querySelector('.numero').textContent = ''; // Define a senha atual como vazia após o reset
      const historicoElements = document.querySelectorAll('.senha p');
      historicoElements.forEach(element => {
        element.textContent = ''; // Define o histórico como vazio após o reset
      });
    } else {
      updateUI(data);
    }
  } catch (error) {
    console.error('Erro ao analisar a mensagem JSON:', error);
  }
});
