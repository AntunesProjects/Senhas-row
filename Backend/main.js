const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let senhaAtual = 0;
let historico = [];

function atualizarHistorico(numero) {
  historico.push(numero);
  if (historico.length > 3) {
    historico.shift(); // Remove o elemento mais antigo se o histórico tiver mais de 3 itens
  }
}

wss.on('connection', (ws) => {
  // Enviar a senha atual e o histórico para o cliente quando uma nova conexão é estabelecida
  ws.send(JSON.stringify({ senhaAtual, historico }));

  ws.on('message', (message) => {
    if (message === 'resetar') {
      senhaAtual = 0;
      historico = [];
    } else {
      senhaAtual = parseInt(message);
      atualizarHistorico(senhaAtual);
    }

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ senhaAtual, historico }));
      }
    });
  });
});
