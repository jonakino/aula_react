import { useState } from 'react';
import fotoGato from './gato.png';

export default function Postagem() {
  const [curtiu, setCurtiu] = useState(false);
  const curtidas = 10 + (curtiu ? 1 : 0);

  return (
    <main>
      <h1>Meu Instagram</h1>

      <article className="postagem" aria-label="Postagem com foto de gato">
        <img src={fotoGato} alt="Gato laranja com as patas no parapeito da janela" />

        <div className="acoes">
          <button
            type="button"
            aria-label="Curtir foto"
            aria-pressed={curtiu}
            onClick={() => setCurtiu(valor => !valor)}
          >
            <span aria-hidden="true">{curtiu ? '♥︎' : '♡'}</span>
          </button>
          <strong aria-live="polite">{curtidas} curtidas</strong>
        </div>
      </article>
    </main>
  );
}
