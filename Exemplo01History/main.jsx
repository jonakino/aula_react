import { createRoot } from 'react-dom/client';
import ContadorClasse from './ContadorClasse.jsx';
import ContadorHook from './ContadorHook.jsx';
import './estilos.css';

createRoot(document.getElementById('root')).render(
  <main>
    <h1>React antes e depois dos Hooks</h1>
    <p>Clique em um contador e observe quais valores mudam.</p>

    <div className="comparacao">
      <ContadorClasse
        titulo="Com classe (React antes dos Hooks)"
        subtitulo="Componente de classe do React com this.state e this.setState."
      />
      <ContadorHook
        titulo="Com Hook A"
        subtitulo="Hook customizado useContador, que usa useState do React."
      />
      <ContadorHook
        titulo="Com Hook B"
        subtitulo="Mesmo Hook customizado useContador, com estado independente."
      />
    </div>
  </main>
);
