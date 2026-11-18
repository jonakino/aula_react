import { createRoot } from 'react-dom/client';
import Curtida from './example_curtida.jsx';

createRoot(document.getElementById('root')).render(
  <main>
    <h1>Curtida com useState</h1>
    <p>Estudando o estado booleano para representar a curtida e calcular o total e o texto do botão.</p>
    <Curtida />
  </main>
);
