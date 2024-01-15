const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let senhaAtual = 0;
let historico = [0, 0, 0, 0];

function atualizarHistorico(numero) {
  historico.push(numero);
  if (historico.length > 4) {
    historico.shift(); // Remove o elemento mais antigo se o histórico tiver mais de 3 itens
  }
}

wss.on('connection', (ws) => {
  // Enviar a senha atual e o histórico para o cliente quando uma nova conexão é estabelecida
  ws.send(JSON.stringify({ senhaAtual, historico }));

ws.on('message', (message) => {
  const parsedMessage = JSON.parse(message);

  if (parsedMessage.resetar) {
    senhaAtual = 0;
    historico = [0, 0, 0, 0];

    // Enviar a senha atual e o histórico para todos os clientes após o reset
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ resetar: true, senhaAtual, historico }));
      }
    });
  } else {
    senhaAtual = parseInt(parsedMessage);
    atualizarHistorico(senhaAtual);

    // Enviar a senha atual e o histórico para todos os clientes
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ senhaAtual, historico }));
      }
    });
  }
});

});