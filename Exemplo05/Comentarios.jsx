import { useState } from 'react';

export default function Comentarios() {
  const [texto, setTexto] = useState('');
  const [comentarios, setComentarios] = useState([]);

  function publicar(evento) {
    evento.preventDefault();
    const comentario = texto.trim();
    if (!comentario) return;

    setComentarios(anteriores => [...anteriores, comentario]);
    setTexto('');
  }

  return (
    <section className="comentarios" aria-labelledby="titulo-comentarios">
      <h2 id="titulo-comentarios">Comentários ({comentarios.length})</h2>

      <ul aria-live="polite">
        {comentarios.map((comentario, indice) => (
          <li key={indice}>{comentario}</li>
        ))}
      </ul>

      <form onSubmit={publicar}>
        <input
          aria-label="Escreva um comentário"
          placeholder="Escreva um comentário"
          value={texto}
          onChange={evento => setTexto(evento.target.value)}
          required
        />
        <button type="submit">Publicar</button>
      </form>
    </section>
  );
}
