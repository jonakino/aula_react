import Curtida from './Curtida.jsx';
import Comentarios from './Comentarios.jsx';
import fotoGato from './gato.png';

export default function Postagem() {
  return (
    <main>
      <h1>Meu Instagram</h1>

      <article className="postagem" aria-label="Postagem com foto de gato">
        <img src={fotoGato} alt="Gato laranja com as patas no parapeito da janela" />
        <Curtida />
        <Comentarios />
      </article>
    </main>
  );
}
