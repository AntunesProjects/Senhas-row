const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let senhaAtual = '';
let historico = ['', '', ''];

function atualizarHistorico(nome) {
  historico.push(nome);
  if (historico.length > 3) {
    historico.shift(); // Remove o elemento mais antigo se o histórico tiver mais de 3 itens
  }
}

wss.on('connection', (ws) => {
  // Enviar a senha atual e o histórico para o cliente quando uma nova conexão é estabelecida
  ws.send(JSON.stringify({ senhaAtual, historico }));

  ws.on('message', (message) => {
    try {
      const parsedMessage = JSON.parse(message);

      if (parsedMessage.resetar) {
        senhaAtual = '';
        historico = ['', '', ''];

        // Enviar a senha atual e o histórico para todos os clientes após o reset
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ resetar: true, senhaAtual, historico }));
          }
        });
      } else {
        senhaAtual = parsedMessage;
        atualizarHistorico(senhaAtual);

        // Enviar a senha atual e o histórico para todos os clientes
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ senhaAtual, historico }));
          }
        });
      }
    } catch (error) {
      console.error('Erro ao analisar a mensagem JSON:', error);
    }
  });
});
