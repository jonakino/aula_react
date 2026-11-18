import { fileURLToPath } from 'node:url';
import {
  abrirBanco, autorDaFoto, buscarUsuario, cadastrarUsuario, consultarPostagem,
  salvarComentario, salvarCurtida,
} from './banco.js';

const rota = '/api/exemplo07';
const arquivoBanco = fileURLToPath(new URL('../aula-instagram.sqlite', import.meta.url));

function responder(resposta, status, dados) {
  resposta.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  resposta.end(JSON.stringify(dados));
}

async function lerJson(requisicao) {
  if (requisicao.headers['content-type']?.split(';')[0].trim() !== 'application/json') return null;

  let corpo = '';
  requisicao.setEncoding('utf8');
  for await (const trecho of requisicao.iterator({ destroyOnReturn: false })) {
    if (corpo.length + trecho.length > 4096) {
      requisicao.resume();
      return null;
    }
    corpo += trecho;
  }

  try {
    return JSON.parse(corpo);
  } catch {
    return null;
  }
}

export function apiPostagem(caminhoBanco = arquivoBanco) {
  function instalar(servidor) {
    let banco;

    servidor.httpServer?.once('close', () => banco?.close());
    servidor.middlewares.use(async (requisicao, resposta, proximo) => {
      const url = new URL(requisicao.url, 'http://localhost');
      const leitura = url.pathname === rota && requisicao.method === 'GET';
      const entrada = url.pathname === `${rota}/entrada` && requisicao.method === 'POST';
      const curtida = url.pathname === `${rota}/curtida` && requisicao.method === 'PUT';
      const comentario = url.pathname === `${rota}/comentarios` && requisicao.method === 'POST';

      if (!leitura && !entrada && !curtida && !comentario) return proximo();

      try {
        const dados = leitura ? { nome: url.searchParams.get('nome') } : await lerJson(requisicao);
        const nome = typeof dados?.nome === 'string' ? dados.nome.trim().normalize('NFC') : '';
        if (!nome || nome.length > 40 || nome.includes('\0')) {
          return responder(resposta, 400, { erro: 'Informe um nome de até 40 caracteres.' });
        }

        const texto = typeof dados.texto === 'string' ? dados.texto.trim() : '';
        if (comentario && (!texto || texto.length > 280 || texto.includes('\0'))) {
          return responder(resposta, 400, { erro: 'Escreva um comentário de até 280 caracteres.' });
        }
        if (curtida && typeof dados.curtiu !== 'boolean') {
          return responder(resposta, 400, { erro: 'Informe se a foto foi curtida.' });
        }

        banco ??= abrirBanco(caminhoBanco);
        const usuario = nome.toLocaleLowerCase('pt-BR');
        if (usuario === autorDaFoto) {
          return responder(resposta, 409, { erro: 'GatoUser é o autor da postagem. Escolha outro nome.' });
        }

        if (entrada) cadastrarUsuario(banco, usuario, nome);
        const participante = buscarUsuario(banco, usuario);
        if (!participante) {
          return responder(resposta, 404, { erro: 'Entre com seu nome antes de interagir com a postagem.' });
        }

        if (curtida) salvarCurtida(banco, usuario, dados.curtiu);
        if (comentario) salvarComentario(banco, participante.nome, texto);

        responder(resposta, comentario ? 201 : 200, {
          nome: participante.nome,
          ...consultarPostagem(banco, usuario),
        });
      } catch (erro) {
        console.error(erro);
        if (!resposta.destroyed) responder(resposta, 500, { erro: 'Não foi possível atualizar a postagem.' });
      }
    });
  }

  return { name: 'api-postagem-exemplo07', configureServer: instalar, configurePreviewServer: instalar };
}
