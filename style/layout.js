const senhaAtualElement = document.querySelector('.numero');

const ws = new WebSocket('ws://localhost:8080');

ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);

    if (data.senhaAtual !== undefined) {
        senhaAtualElement.textContent = data.senhaAtual;

        if (data.senhaAtual.length >= 4) {
            senhaAtualElement.style.fontSize = '12vw';
        } else {
            senhaAtualElement.style.fontSize = '16vw';
        }
    }
});
