import { useReducer } from 'react';

const estadoInicial = { texto: '', comentarios: [] };

function reducer(estado, acao) {
  switch (acao.tipo) {
    case 'digitar':
      return { ...estado, texto: acao.texto };

    case 'publicar': {
      const comentario = estado.texto.trim();
      if (!comentario) return estado;

      return { texto: '', comentarios: [...estado.comentarios, comentario] };
    }

    default:
      return estado;
  }
}

export default function Comentarios() {
  const [{ texto, comentarios }, dispatch] = useReducer(reducer, estadoInicial);

  function publicar(evento) {
    evento.preventDefault();
    dispatch({ tipo: 'publicar' });
  }

  return (
    <section className="comentarios" aria-labelledby="titulo-comentarios">
      <h2 id="titulo-comentarios">Comentários ({comentarios.length})</h2>

      <ul aria-live="polite">
        {comentarios.map((comentario, indice) => (
          <li key={indice}>{comentario}</li>
        ))}
        {texto.trim() && <li className="digitando">Um usuário está comentando...</li>}
      </ul>

      <form onSubmit={publicar}>
        <input
          aria-label="Escreva um comentário"
          placeholder="Escreva um comentário"
          value={texto}
          onChange={evento => dispatch({ tipo: 'digitar', texto: evento.target.value })}
          required
        />
        <button type="submit">Publicar</button>
      </form>

    </section>
  );
}
