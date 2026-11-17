import { useState, useEffect } from "react";

export default function Contador() {
  const [contador, setContador] = useState(0);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    if (!ativo) return;

    const timer = setInterval(() => {
      setContador(c => c + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [ativo]);

  return (
    <div>
      <h2>Contador: {contador}</h2>

      <button onClick={() => setContador(c => c + 1)}>
        Incrementar
      </button>

      <button onClick={() => setAtivo(a => !a)}>
        {ativo ? "Pausar" : "Iniciar"}
      </button>
    </div>
  );
}
