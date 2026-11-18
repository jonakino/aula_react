import Curtida from './Curtida.jsx';
import Comentarios from './Comentarios.jsx';
import fotoGato from './gato.png';

export default function Postagem() {
  return (
    <main>
      <h1>Meu Instagram</h1>
      <p>Estudando o estado local em uma postagem composta por dois componentes, um para a curtida e outro para os comentários.</p>

      <article className="postagem" aria-label="Postagem com foto de gato">
        <img src={fotoGato} alt="Gato laranja com as patas no parapeito da janela" />
        <Curtida />
        <Comentarios />
      </article>
    </main>
  );
}
