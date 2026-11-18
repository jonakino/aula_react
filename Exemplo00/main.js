const valorExibido = document.getElementById('valor');
const botao = document.getElementById('incrementar');

let contador = 0;

botao.addEventListener('click', () => {
  contador += 1;
  valorExibido.textContent = contador;
});
