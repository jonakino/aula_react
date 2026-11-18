import { useEffect, useState } from 'react';
import { solicitarPostagem } from './api-cliente.js';
import Comentarios from './Comentarios.jsx';
import Curtida from './Curtida.jsx';
import fotoGato from './gato.png';

const fotos = { 'gato.png': fotoGato };

export default function Postagem() {
  const [nome, setNome] = useState('');
  const [postagem, setPostagem] = useState(null);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState('');
  const participante = postagem?.nome;

  useEffect(() => {
    if (!participante || ocupado) return;

    const controle = new AbortController();
    let temporizador = setTimeout(consultar, 3000);

    async function consultar() {
      try {
        const dados = await solicitarPostagem(participante, undefined, undefined, controle.signal);
        if (!controle.signal.aborted) setPostagem(dados);
      } catch {
        // Em caso de falha, mantém os dados na tela e tenta de novo.
      } finally {
        if (!controle.signal.aborted) temporizador = setTimeout(consultar, 3000);
      }
    }

    return () => {
      clearTimeout(temporizador);
      controle.abort();
    };
  }, [participante, ocupado]);

  async function atualizar(acao, valor) {
    setOcupado(true);
    setErro('');
    try {
      setPostagem(await solicitarPostagem(nome.trim(), acao, valor));
      return true;
    } catch (falha) {
      setErro(falha.message);
      return false;
    } finally {
      setOcupado(false);
    }
  }

  function entrar(evento) {
    evento.preventDefault();
    if (nome.trim()) atualizar('entrada');
  }

  function trocarUsuario() {
    setPostagem(null);
    setNome('');
    setErro('');
  }

  return (
    <main>
      <h1>{postagem ? 'Meu Instagram' : 'Entrar'}</h1>
      <p>Estudando o uso de uma API para salvar curtidas e comentários no SQLite e de <code>useEffect</code> para consultar as mudanças periodicamente.</p>
      {postagem ? (
        <>
          <div className="sessao">
            <p>Olá, <strong>{postagem.nome}</strong></p>
            <button type="button" disabled={ocupado} onClick={() => atualizar()}>Atualizar</button>
            <button type="button" disabled={ocupado} onClick={trocarUsuario}>Trocar nome</button>
          </div>
          <article className="postagem" aria-label="Postagem com foto de gato">
            <header className="autor-postagem"><strong>{postagem.autor}</strong></header>
            <img src={fotos[postagem.foto]} alt="Gato laranja com as patas no parapeito da janela" />
            <Curtida
              curtiu={postagem.curtiu}
              total={postagem.total}
              ocupado={ocupado}
              alternar={() => atualizar('curtida', !postagem.curtiu)}
            />
            <Comentarios
              lista={postagem.comentarios}
              ocupado={ocupado}
              salvar={texto => atualizar('comentarios', texto)}
            />
          </article>
        </>
      ) : (
        <form className="entrada" onSubmit={entrar}>
          <label htmlFor="nome">Seu nome</label>
          <input id="nome" value={nome} onChange={evento => setNome(evento.target.value)}
            maxLength={40} required disabled={ocupado} />
          <button type="submit" disabled={ocupado || !nome.trim()}>Entrar</button>
        </form>
      )}
      {erro && <p role="alert">{erro}</p>}
    </main>
  );
}
