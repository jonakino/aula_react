import { createRoot } from 'react-dom/client';
import Contador from './example_useeffect.jsx';

createRoot(document.getElementById('root')).render(
  <main>
    <h1>Temporizador com useEffect</h1>
    <p>Estudando o <code>useEffect</code> para iniciar o intervalo quando o temporizador é ativado e limpá-lo ao pausar ou desmontar o componente.</p>
    <Contador />
  </main>
);
