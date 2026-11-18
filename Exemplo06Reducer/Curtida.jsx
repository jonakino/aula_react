import { useState } from 'react';

export default function Curtida() {

  //Fluxo: clique → onClick → setCurtiu → nova renderização → aria-pressed

  const [curtiu, setCurtiu] = useState(false);
  const curtidas = 10 + (curtiu ? 1 : 0);

  return (
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
  );
}
