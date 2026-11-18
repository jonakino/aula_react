import { useState } from "react";

export default function Curtida() {
  const [curtiu, setCurtiu] = useState(false);
  const curtidas = curtiu ? 1 : 0;

  return (
    <div>
      <h2>Curtidas: {curtidas}</h2>
      <button onClick={() => setCurtiu(valor => !valor)}>
        {curtiu ? "Descurtir" : "Curtir"}
      </button>
    </div>
  );
}
