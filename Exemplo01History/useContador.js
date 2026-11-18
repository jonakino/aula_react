import { useState } from 'react';

export default function useContador() {
  const [valor, setValor] = useState(0);

  function incrementar() {
    setValor(anterior => anterior + 1);
  }

  return { valor, incrementar };
}
