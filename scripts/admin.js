// Referências dos elementos HTML
const senhaRef = firebase.database().ref('senhas');
const numeroAtualElement = document.querySelector('.numero');
const botaoAdicionar = document.getElementById('add');
const inputEditar = document.querySelector('input[type="text"]');
const botaoZerar = document.getElementById('zerar');

// Função para atualizar o número atual exibido na página
function atualizarNumeroAtual(numero) {
  numeroAtualElement.textContent = numero.toString().padStart(2, '0');
}

// Função para adicionar +1 ao número atual
botaoAdicionar.addEventListener('click', () => {
  senhaRef.once('value', (snapshot) => {
    const numeroAtual = snapshot.val()?.senha || 0; // Obter o valor atual do Firebase (ou 0 se for nulo)
    
    // Lógica para adicionar +1 ao número atual
    const novoNumero = numeroAtual + 1;
    
    // Atualizar o valor no Firebase
    senhaRef.set({
      senha: novoNumero
    });
  });
});

// Função para editar o número atual a partir do input
inputEditar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const novoNumero = parseInt(inputEditar.value);
    if (!isNaN(novoNumero)) {
      // Atualizar o valor no Firebase
      senhaRef.set({
        senha: novoNumero
      });
    }
    inputEditar.value = ''; // Limpar o input
  }
});

// Função para zerar o número atual
botaoZerar.addEventListener('click', () => {
  // Zerar o valor no Firebase
  senhaRef.set({
    senha: 0
  });
});


