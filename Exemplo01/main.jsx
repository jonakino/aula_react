import { createRoot } from 'react-dom/client';
import Contador from './example_usestate.jsx';

createRoot(document.getElementById('root')).render(
  <main>
    <h1>Contador com useState</h1>
    <p>Estudando o <code>useState</code> para guardar o contador entre renderizações e atualizar o valor exibido a cada clique.</p>
    <Contador />
  </main>
);
