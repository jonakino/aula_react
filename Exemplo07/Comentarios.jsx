import { useReducer } from 'react';

function reducer(estado, acao) {
  switch (acao.tipo) {
    case 'digitar':
      return { ...estado, texto: acao.texto };
    case 'publicado':
      return { ...estado, texto: '' };
    default:
      return estado;
  }
}

export default function Comentarios({ lista, ocupado, salvar }) {
  const [{ texto }, dispatch] = useReducer(reducer, { texto: '' });

  async function publicar(evento) {
    evento.preventDefault();
    if (texto.trim() && await salvar(texto)) dispatch({ tipo: 'publicado' });
  }

  return (
    <section className="comentarios" aria-labelledby="titulo-comentarios">
      <h2 id="titulo-comentarios">Comentários ({lista.length})</h2>
      <ul aria-live="polite">
        {lista.map(comentario => (
          <li key={comentario.id}><strong>{comentario.autor}</strong> {comentario.texto}</li>
        ))}
        {texto.trim() && <li className="digitando">Um usuário está comentando...</li>}
      </ul>
      <form onSubmit={publicar}>
        <input aria-label="Escreva um comentário" placeholder="Escreva um comentário"
          value={texto} maxLength={280} required disabled={ocupado}
          onChange={evento => dispatch({ tipo: 'digitar', texto: evento.target.value })} />
        <button type="submit" disabled={ocupado || !texto.trim()}>Publicar</button>
      </form>
    </section>
  );
}
