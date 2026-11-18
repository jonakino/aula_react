const rota = '/api/exemplo07';

export async function solicitarPostagem(nome, acao, valor, signal) {
  let resposta;

  if (acao) {
    const curtida = acao === 'curtida';
    resposta = await fetch(`${rota}/${acao}`, {
      method: curtida ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, [curtida ? 'curtiu' : 'texto']: valor }),
    });
  } else {
    resposta = await fetch(`${rota}?${new URLSearchParams({ nome })}`, { signal });
  }

  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro);
  return dados;
}
