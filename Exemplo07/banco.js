import { DatabaseSync } from 'node:sqlite';

export const autorDaFoto = 'gatouser';

export function abrirBanco(caminho) {
  const banco = new DatabaseSync(caminho);
  banco.exec(`
    PRAGMA busy_timeout = 3000;

    CREATE TABLE IF NOT EXISTS usuarios (
      usuario TEXT NOT NULL PRIMARY KEY,
      nome TEXT NOT NULL CHECK (length(nome) BETWEEN 1 AND 40)
    ) STRICT;

    CREATE TABLE IF NOT EXISTS postagem (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      autor TEXT NOT NULL REFERENCES usuarios(usuario),
      foto TEXT NOT NULL
    ) STRICT;

    CREATE TABLE IF NOT EXISTS curtidas (
      usuario TEXT NOT NULL PRIMARY KEY
    ) STRICT;

    CREATE TABLE IF NOT EXISTS comentarios (
      id INTEGER PRIMARY KEY,
      autor TEXT NOT NULL CHECK (length(autor) BETWEEN 1 AND 40),
      texto TEXT NOT NULL CHECK (length(texto) BETWEEN 1 AND 280)
    ) STRICT;
  `);

  cadastrarUsuario(banco, autorDaFoto, 'GatoUser');
  banco.prepare('INSERT INTO postagem (id, autor, foto) VALUES (1, ?, ?) ON CONFLICT DO NOTHING')
    .run(autorDaFoto, 'gato.png');

  return banco;
}

export function cadastrarUsuario(banco, usuario, nome) {
  banco.prepare('INSERT INTO usuarios (usuario, nome) VALUES (?, ?) ON CONFLICT DO NOTHING')
    .run(usuario, nome);
}

export function buscarUsuario(banco, usuario) {
  return banco.prepare('SELECT nome FROM usuarios WHERE usuario = ?').get(usuario);
}

export function consultarPostagem(banco, usuario) {
  const { autor, foto } = banco.prepare(`
    SELECT usuarios.nome AS autor, postagem.foto
    FROM postagem JOIN usuarios ON usuarios.usuario = postagem.autor
    WHERE postagem.id = 1
  `).get();
  const { total, curtiu } = banco.prepare(`
    SELECT 10 + COUNT(*) AS total,
      EXISTS (SELECT 1 FROM curtidas WHERE usuario = ?) AS curtiu
    FROM curtidas
  `).get(usuario);
  const comentarios = banco.prepare('SELECT id, autor, texto FROM comentarios ORDER BY id').all();

  return { autor, foto, total, curtiu: Boolean(curtiu), comentarios };
}

export function salvarCurtida(banco, usuario, curtiu) {
  if (curtiu) {
    banco.prepare('INSERT INTO curtidas (usuario) VALUES (?) ON CONFLICT DO NOTHING').run(usuario);
  } else {
    banco.prepare('DELETE FROM curtidas WHERE usuario = ?').run(usuario);
  }
}

export function salvarComentario(banco, autor, texto) {
  banco.prepare('INSERT INTO comentarios (autor, texto) VALUES (?, ?)').run(autor, texto);
}
