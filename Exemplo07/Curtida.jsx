export default function Curtida({ curtiu, total, ocupado, alternar }) {
  return (
    <div className="acoes">
      <button type="button" aria-label="Curtir foto" aria-pressed={curtiu}
        onClick={alternar} disabled={ocupado}>
        <span aria-hidden="true">{curtiu ? '♥︎' : '♡'}</span>
      </button>
      <strong aria-live="polite">{total} curtidas</strong>
    </div>
  );
}
