import useContador from './useContador.js';

export default function ContadorHook({ titulo, subtitulo }) {
  const { valor, incrementar } = useContador();

  return (
    <section>
      <h2>{titulo}</h2>
      <p className="subtitulo">{subtitulo}</p>
      <p>Valor: {valor}</p>
      <button onClick={incrementar}>Incrementar</button>
    </section>
  );
}
