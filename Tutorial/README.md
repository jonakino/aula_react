# Tutorial de React — Estado, Hooks e ciclo de vida

## Roteiro de Hooks e ciclo de vida

1. Abra `/Exemplo00/` e procure no [JavaScript puro](../Exemplo00/main.js) a variável que guarda o valor e a instrução que escreve no DOM.
2. Em `/Exemplo01History/`, mostre primeiro o [contador em classe](../Exemplo01History/ContadorClasse.jsx). Siga o clique até `this.setState` e localize o valor em `render`.
3. Abra `/Exemplo01/` e compare com o [contador em função](../Exemplo01/example_usestate.jsx). Os Hooks chegaram no React 16.8, em 2019. Nesse código, `useState` guarda o valor entre renderizações e o clique solicita a atualização com `setContador`. Chame Hooks no topo de componentes de função ou de Hooks customizados. [React 16.8](https://legacy.reactjs.org/blog/2019/02/06/react-v16.8.0.html) · [Regras dos Hooks](https://react.dev/reference/rules/rules-of-hooks)
4. Abra `/Exemplo02/` para a demonstração abaixo.
5. Volte a `/Exemplo01History/`, clique apenas em **Com Hook A** e compare os valores com **Com Hook B**. Abra [`useContador`](../Exemplo01History/useContador.js) para mostrar como cada chamada reaproveita a mesma lógica com estado próprio.

### O temporizador com `useEffect`

No [código do temporizador](../Exemplo02/example_useeffect.jsx), acompanhe o valor de `ativo`.

1. Ao montar, `ativo` começa como `false` e o efeito retorna sem criar um intervalo.
2. Clique em **Iniciar**. A mudança em `ativo` dispara o efeito, que cria um intervalo de um segundo.
3. Clique em **Incrementar** durante a contagem. O contador muda e o intervalo segue em andamento porque `ativo` continua igual.
4. Clique em **Pausar**. O React executa a limpeza do intervalo antes de rodar o efeito com `ativo` falso.

O componente passa por montagem, atualizações e desmontagem. O efeito sincroniza o componente com um recurso externo, o intervalo do navegador neste exemplo. O React reinicia essa sincronização quando `ativo` muda e encerra a sincronização ao desmontar. Dentro do intervalo, `setContador(c => c + 1)` usa o valor anterior entregue pelo React, por isso o efeito só precisa ler `ativo` do componente. [Ciclo de vida dos efeitos](https://react.dev/learn/lifecycle-of-reactive-effects) · [Métodos de classe](https://react.dev/reference/react/Component)

## Como executar pelo terminal do Visual Studio

1. Abra a pasta `aula_react` no Visual Studio e abra o terminal integrado com PowerShell. Execute os comandos na raiz do projeto, onde está o `package.json`.
2. Confira se o Node.js e o npm estão disponíveis.

   ```powershell
   node --version
   npm.cmd --version
   ```

   Se os comandos não forem reconhecidos e o Node.js estiver instalado na pasta padrão do Windows, execute a linha abaixo e tente novamente. Essa alteração no `PATH` vale para o terminal atual.

   ```powershell
   $env:Path = 'C:\Program Files\nodejs;' + $env:Path
   ```

3. Instale as dependências na primeira vez que abrir o projeto.

   ```powershell
   npm.cmd install
   ```

4. Inicie o servidor de desenvolvimento do Vite.

   ```powershell
   npm.cmd run dev -- --host 127.0.0.1
   ```

5. O Vite abre o exemplo no navegador. Se precisar abrir manualmente, acrescente `Exemplo01/` ao endereço da linha `Local`, como em [http://127.0.0.1:5173/Exemplo01/](http://127.0.0.1:5173/Exemplo01/). Clique em **Incrementar** e observe o contador passar de `0` para `1`.

Mantenha o terminal rodando enquanto usa a página. Para parar o servidor, pressione `Ctrl+C` no terminal.

## Comandos usados na preparação

O exemplo já existia em `Exemplo01/example_usestate.js`. O arquivo foi renomeado para `.jsx` porque contém JSX, a sintaxe usada para escrever a interface do componente. A estrutura do projeto foi montada manualmente com `package.json`, `index.html`, `main.jsx` e `.gitignore`.

| Comando | O que fez |
| --- | --- |
| `node --version` e `npm.cmd --version` | Conferiram a instalação do Node.js e do npm. Inicialmente, foi preciso chamá-los pelo caminho completo. |
| `$env:Path = 'C:\Program Files\nodejs;' + $env:Path` | Disponibilizou o Node.js e o npm no PowerShell usado para preparar o projeto. |
| `npm.cmd install --no-audit --no-fund` | Instalou as dependências e gerou o `package-lock.json`. As opções omitiram a auditoria e a mensagem de financiamento durante a instalação. Para uso em aula, `npm.cmd install` é suficiente. |
| `npm.cmd run build` | Executou `vite build` para verificar a compilação e gerar os arquivos de produção em `dist/`. |
| `npm.cmd run dev -- --host 127.0.0.1` | Inicia o Vite e usa a página configurada em `vite.config.js`. O `--` repassa as opções seguintes ao Vite. Se usar `--open`, indique `--open /Exemplo01/` para abrir o exemplo. |

O `package.json` também oferece `npm.cmd run preview` para visualizar localmente os arquivos de produção depois de rodar o build. Acrescente `Exemplo01/` ao endereço exibido no terminal.

## Estrutura e origem dos arquivos

Cada exemplo pode reunir seu próprio HTML e código React em uma pasta. O npm e o Vite são configurados na raiz, de onde você inicia o servidor para todos os exemplos. Os próximos exemplos podem seguir o mesmo padrão em `Exemplo02/`, `Exemplo03/` e assim por diante. Para incluí-los no build de produção, adicione os respectivos arquivos HTML à configuração do Vite.

| Arquivo ou pasta | Para que serve | Como surgiu |
| --- | --- | --- |
| [`Exemplo01/index.html`](../Exemplo01/index.html) | Página do exemplo. Contém o `<div id="root">` e referencia `main.jsx`. | Escrito durante a preparação e movido para a pasta do exemplo. |
| [`Exemplo01/main.jsx`](../Exemplo01/main.jsx) | Ponto de entrada do React. Usa `createRoot` do `react-dom` para exibir o componente `Contador` dentro do elemento `root`. | Escrito durante a preparação e movido para a pasta do exemplo. |
| [`Exemplo01/example_usestate.jsx`](../Exemplo01/example_usestate.jsx) | Componente da aula. Define o número exibido e o botão **Incrementar**. | Código da aula já existente, adaptado de `.js` para `.jsx`. |
| [`package.json`](../package.json) | Declara as dependências (`react`, `react-dom` e `vite`) e os scripts `dev`, `build` e `preview`. | Escrito durante a preparação. |
| [`vite.config.js`](../vite.config.js) | Configura o Vite para abrir `/Exemplo01/`, compilar as páginas dos exemplos e transformar o JSX automaticamente. Assim, os componentes importam apenas os Hooks que usam. | Escrito ao organizar os exemplos em suas próprias pastas. |
| [`package-lock.json`](../package-lock.json) | Registra as versões resolvidas das dependências diretas e indiretas para reproduzir a instalação. | Gerado automaticamente pelo npm durante a instalação. |
| `node_modules/` | Guarda os pacotes instalados pelo npm. | Gerado por `npm.cmd install`. |
| `dist/` | Guarda a página e os arquivos compilados para produção. | Gerado por `npm.cmd run build`, via Vite. |
| [`.gitignore`](../.gitignore) | Faz o Git ignorar `node_modules/` e `dist/`, que podem ser recriados pelos comandos acima. | Escrito durante a preparação. |
| `.git/` | Guarda o histórico e os metadados do repositório. | Já existia e é mantido pelo Git. |
| [`README.md`](../README.md) | Guia rápido para executar o exemplo. | Escrito para documentar o projeto. |
| `Tutorial/README.md` | Guia detalhado da preparação e do primeiro exemplo. | Escrito para este tutorial. |

O React fornece os componentes e o estado da interface. O npm instala as dependências e o Vite executa o servidor e gera a compilação. A estrutura inicial deste projeto foi escrita à mão, sem executar `npm create vite` ou outro gerador de projeto.

## Como o contador funciona

`index.html` carrega `main.jsx`, que importa e renderiza `Contador`. No componente, `useState(0)` cria o estado `contador` com valor inicial `0`. Ao clicar em **Incrementar**, `setContador(c => c + 1)` calcula o próximo valor a partir do anterior, e o React atualiza o número mostrado na página.

Para continuar a demonstração, abra `/Exemplo02/` no mesmo servidor. O [segundo componente](../Exemplo02/example_useeffect.jsx) acrescenta `useEffect` para iniciar o temporizador quando `ativo` muda para `true` e limpar o intervalo ao pausar ou desmontar o componente.

## Exercício de curtida

Abra `/Exemplo03/` no mesmo servidor. O [componente `Curtida`](../Exemplo03/example_curtida.jsx) guarda apenas `curtiu` com `useState(false)`. O total é calculado a partir desse estado. Vale `1` quando a pessoa curtiu e `0` quando descurtiu. Peça à turma para prever o número e o texto do botão depois de dois cliques.

## Composição no Exemplo 05

Abra `/Exemplo05/` para ver [`Postagem`](../Exemplo05/Postagem.jsx) renderizar `<Curtida />` e `<Comentarios />`. A curtida guarda se o coração foi marcado. Os comentários guardam o texto digitado e a lista publicada. Peça à turma para publicar um comentário e clicar no coração, observando que o comentário continua na lista. Ao recarregar a página, o total volta a `10` e a lista começa vazia.

## `useReducer` no Exemplo 06

Abra `/Exemplo06Reducer/` e compare os comentários do [Exemplo 05](../Exemplo05/Comentarios.jsx) com os do [Exemplo 06](../Exemplo06Reducer/Comentarios.jsx). No Exemplo 06, `useReducer` guarda o texto e a lista de comentários no mesmo objeto de estado. `dispatch` envia uma ação, e `reducer(estado, acao)` devolve o próximo estado.

- `digitar` altera o texto do campo e mostra “Um usuário está comentando...” no fim da lista. Ao publicar, o comentário ocupa o lugar da mensagem. Se o texto for apagado, a mensagem desaparece.
- `publicar` acrescenta o comentário à lista e limpa o campo na mesma atualização. Se o texto só tiver espaços, o reducer devolve o estado atual.

Peça à turma para apontar qual ação acontece ao digitar e qual acontece ao clicar em **Publicar**. A curtida continua usando `useState` para o booleano `curtiu`.

## Persistência com SQLite no Exemplo 07

Rode `npm.cmd run dev` na raiz e abra `/Exemplo07/`. Use Node.js 22.13+ na linha 22, ou Node.js 24 ou superior, para ter acesso a `node:sqlite`. A API roda dentro do servidor Vite e cria `aula-instagram.sqlite` na raiz no primeiro acesso válido. O arquivo fica fora do Git e guarda os dados entre reinícios. Para abrir a versão compilada, use `npm.cmd run preview` após o build. [Documentação de `node:sqlite`](https://nodejs.org/api/sqlite.html)

1. Entre como **Ana**, curta a foto e publique um comentário.
2. Clique em **Trocar nome**, entre como **Bruno** e publique outro comentário. Os dois aparecem com seus autores. Bruno pode curtir a mesma foto com seu próprio nome.
3. Abra duas abas com nomes diferentes. Publique ou curta em uma e observe a mudança na outra na próxima consulta automática. Recarregue a página e entre novamente para conferir a persistência.

| Arquivo | Responsabilidade |
| --- | --- |
| [`Postagem.jsx`](../Exemplo07/Postagem.jsx) | Pede o nome e apresenta a postagem com os dados retornados pela API. |
| [`Curtida.jsx`](../Exemplo07/Curtida.jsx) | Mostra o coração e o total calculado pelo servidor. |
| [`Comentarios.jsx`](../Exemplo07/Comentarios.jsx) | Usa `useReducer` para editar o rascunho e limpar o campo após a confirmação da publicação. |
| [`api-cliente.js`](../Exemplo07/api-cliente.js) | Usa `fetch` para consultar a postagem e enviar curtidas e comentários. |
| [`api-servidor.js`](../Exemplo07/api-servidor.js) | Recebe as requisições, valida os dados e chama o banco. |
| [`banco.js`](../Exemplo07/banco.js) | Cria as tabelas, registra `GatoUser` e sua postagem inicial e executa o SQL com parâmetros. |

O SQLite guarda `GatoUser` como autor da postagem e `gato.png` como referência à imagem. A foto fica na pasta do exemplo. Os participantes são cadastrados somente pelo nome, sem senha e sem foto de perfil. `GatoUser` é reservado à postagem. Maiúsculas e espaços nas pontas são desconsiderados ao identificar o participante. A chave da tabela `curtidas` garante uma curtida por nome, e o total é calculado como as `10` curtidas iniciais mais a quantidade de linhas da tabela. Cada comentário tem seu próprio ID e guarda o nome que aparece como autor.

### Hooks usados no Exemplo 07

- `useState` guarda o nome e a postagem recebida da API, além do estado de carregamento e da mensagem de erro.
- `useReducer` recebe as ações `digitar` e `publicado`. Ele guarda o rascunho e só limpa o campo após a confirmação da publicação.
- `useEffect` agenda a próxima consulta à API três segundos depois da anterior. Ao trocar de usuário, desmontar a página ou iniciar uma ação manual, a limpeza cancela o próximo agendamento e interrompe a consulta em andamento. A consulta atualiza a postagem, e o rascunho continua no componente de comentários.

## React antes e depois dos Hooks no Exemplo01History

Abra `/Exemplo01History/` no mesmo servidor. Clique duas vezes em **Com Hook A**. Ele chega a `2`, enquanto **Com Hook B** e **Com classe** continuam em `0`.

| Código | Como o estado é atualizado |
| --- | --- |
| [`ContadorClasse.jsx`](../Exemplo01History/ContadorClasse.jsx) | O valor fica em `this.state` na instância da classe, e o método `incrementar` chama `this.setState`. |
| [`ContadorHook.jsx`](../Exemplo01History/ContadorHook.jsx) | O componente recebe `valor` e `incrementar` do Hook `useContador`. |
| [`useContador.js`](../Exemplo01History/useContador.js) | O Hook chama `useState` e expõe a operação `incrementar`. Cada contador tem seu próprio valor, embora ambos reutilizem a mesma lógica. |

### A relação com Orientação a Objetos

A analogia com encapsulamento é útil. Assim como um objeto pode oferecer um método para alterar seus dados, `useContador` oferece `incrementar` e mantém `setValor` dentro da função. Em JavaScript, a função `incrementar` consegue acessar `setValor` do escopo onde foi criada. Isso é uma *closure*. O React é quem preserva o estado entre renderizações e o associa à posição do componente na árvore. Em JavaScript, a privacidade de um campo de classe é declarada com `#`, uma regra própria da linguagem. [React — Preservando e reiniciando o estado](https://react.dev/learn/preserving-and-resetting-state)

### Por que os Hooks foram adicionados?

O **React** é a biblioteca que estamos estudando. **REST** é um estilo de arquitetura que pode ser usado em APIs. Os Hooks chegaram ao React 16.8, em 2019, para dar aos componentes de função acesso a estado e outros recursos do React e facilitar o reaproveitamento da lógica com estado. Antes, padrões como *render props* e *higher-order components* já permitiam reaproveitar comportamento, mas podiam exigir camadas adicionais de componentes. [React — Introdução aos Hooks](https://legacy.reactjs.org/docs/hooks-intro.html) · [React — Lançamento do 16.8](https://legacy.reactjs.org/blog/2019/02/06/react-v16.8.0.html)

Para conectar com ciclo de vida, volte ao [temporizador do Exemplo 02](../Exemplo02/example_useeffect.jsx). O mesmo `useEffect` agrupa o início do intervalo e sua limpeza. Em uma classe, a lógica equivalente pode passar por métodos diferentes para montagem, atualização e desmontagem. A mesma ideia de reutilização pode ser aplicada a um Hook como `useBuscarUsuarios`, que agruparia a lógica de consultar uma API. [React — Reutilizando lógica com Hooks customizados](https://react.dev/learn/reusing-logic-with-custom-hooks)

## Contador com JavaScript puro no Exemplo 00

Abra `/Exemplo00/` no mesmo servidor. O [`index.html`](../Exemplo00/index.html) contém o botão e o valor inicial. O [`main.js`](../Exemplo00/main.js) guarda o contador em uma variável `let`, usa `addEventListener` para reagir ao clique e escreve o novo valor na página com `textContent`.

Compare com `/Exemplo01History/`. No Exemplo 00, o próprio código escreve o valor no DOM. No Exemplo01History, o código atualiza o estado e o React atualiza a interface a partir do JSX.
