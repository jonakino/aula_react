# Aula de React

## Ordem da aula

Siga a ordem abaixo no mesmo servidor Vite. Os endereços usam a porta padrão 5173. O [roteiro do professor](Tutorial/README.md#roteiro-de-hooks-e-ciclo-de-vida) inclui perguntas e uma demonstração de montagem, atualização e desmontagem.

| Etapa | Exemplo | O que observar |
| --- | --- | --- |
| 1 | [JavaScript e DOM](http://127.0.0.1:5173/Exemplo00/) | A variável muda e o código escreve o valor no DOM. |
| 2 | [React com classe](http://127.0.0.1:5173/Exemplo01History/) | Comece pelo cartão da classe. `this.state` guarda o valor, `this.setState` solicita a atualização e `render` descreve a interface. |
| 3 | [React com `useState`](http://127.0.0.1:5173/Exemplo01/) | Repita o contador em um componente de função. |
| 4 | [Ciclo de vida e `useEffect`](http://127.0.0.1:5173/Exemplo02/) | Inicie e pause o temporizador para acompanhar a criação e a limpeza do intervalo. |
| 5 | [Hook customizado](http://127.0.0.1:5173/Exemplo01History/) | Volte aos cartões A e B. Ambos usam `useContador` e cada um mantém seu próprio valor. |
| 6 | [Curtida](http://127.0.0.1:5173/Exemplo03/), [postagem](http://127.0.0.1:5173/Exemplo04/) e [composição](http://127.0.0.1:5173/Exemplo05/) | Pratique estado booleano, valores calculados e estado local em componentes filhos. |
| 7 | [`useReducer`](http://127.0.0.1:5173/Exemplo06Reducer/) e [API com SQLite](http://127.0.0.1:5173/Exemplo07/) | Organize atualizações por ações e observe um efeito que consulta a API periodicamente. |

## Exemplo 01 — Contador com `useState`

O contador começa em `0`. A cada clique no botão **Incrementar**, o valor aumenta em `1`.

### Como executar no Windows

1. Com o Node.js instalado, abra a pasta `aula_react` no Visual Studio e use o terminal integrado com PowerShell. Execute os comandos na pasta que contém o `package.json`.
2. Instale as dependências na primeira vez que usar o projeto.

   ```powershell
   npm.cmd install
   ```

### Como rodar o servidor

No mesmo terminal, execute:

```powershell
npm.cmd run dev -- --host 127.0.0.1
```

O Vite abre o Exemplo 01 no navegador. Se precisar abrir manualmente, acrescente `Exemplo01/` ao endereço da linha `Local`, como em [http://127.0.0.1:5173/Exemplo01/](http://127.0.0.1:5173/Exemplo01/). Clique em **Incrementar** e confira se o valor muda de `0` para `1`.

Se quiser usar `--open` no comando, passe o caminho junto, como em `npm.cmd run dev -- --host 127.0.0.1 --open /Exemplo01/`. Sem um caminho, essa opção abre a raiz `/`.

Mantenha o terminal aberto enquanto usar o exemplo. Para encerrar o servidor, pressione `Ctrl+C`.

Para passar à etapa com `useEffect`, abra [http://127.0.0.1:5173/Exemplo02/](http://127.0.0.1:5173/Exemplo02/) no mesmo servidor. O botão **Iniciar** ativa o temporizador, e **Pausar** interrompe a contagem automática. Os componentes das duas etapas estão em [`Exemplo01/example_usestate.jsx`](Exemplo01/example_usestate.jsx) e [`Exemplo02/example_useeffect.jsx`](Exemplo02/example_useeffect.jsx).

Para praticar `useState` com um estado booleano, abra [http://127.0.0.1:5173/Exemplo03/](http://127.0.0.1:5173/Exemplo03/). **Curtir** muda a quantidade de `0` para `1`, e **Descurtir** volta para `0`. O código está em [`Exemplo03/example_curtida.jsx`](Exemplo03/example_curtida.jsx).

Em [Meu Instagram](http://127.0.0.1:5173/Exemplo04/), o quarto exemplo aplica a mesma ideia a uma foto de gato. O coração alterna entre vazio e preenchido, e o total vai de `10` para `11` e volta para `10`. A lógica está em [`Exemplo04/example_postagem.jsx`](Exemplo04/example_postagem.jsx).

No [Exemplo 05](http://127.0.0.1:5173/Exemplo05/), [`Postagem`](Exemplo05/Postagem.jsx) reúne os componentes [`Curtida`](Exemplo05/Curtida.jsx) e [`Comentarios`](Exemplo05/Comentarios.jsx). Cada componente guarda seu próprio estado com `useState`. Clique no coração e publique um comentário para observar as duas interações.

No [Exemplo 06 — `useReducer`](http://127.0.0.1:5173/Exemplo06Reducer/), a mesma postagem usa [`useReducer` nos comentários](Exemplo06Reducer/Comentarios.jsx). O formulário envia as ações `digitar` e `publicar`, e o reducer calcula o próximo estado. O coração continua usando `useState`.

No [Exemplo 07 — Persistência com SQLite](http://127.0.0.1:5173/Exemplo07/), entre com um nome para curtir ou comentar a foto publicada por **GatoUser**. O cadastro do participante guarda só o nome. Abra o exemplo em duas abas com nomes diferentes para ver o total e os comentários se atualizarem automaticamente a cada três segundos. O mesmo comando do Vite inicia a página e a API. Este exemplo usa Node.js 22.13+ na linha 22, ou Node.js 24 ou superior.

No [Exemplo 01 — React antes e depois dos Hooks](http://127.0.0.1:5173/Exemplo01History/), compare um contador em classe com dois contadores que usam o mesmo Hook customizado. O [tutorial explica a relação com Orientação a Objetos](Tutorial/README.md#react-antes-e-depois-dos-hooks-no-exemplo01history).

No [Exemplo 00 — JavaScript puro](http://127.0.0.1:5173/Exemplo00/), o clique incrementa uma variável e atualiza o texto da página diretamente pelo DOM. O código está em [`Exemplo00/main.js`](Exemplo00/main.js).

Se o PowerShell não reconhecer `npm.cmd` e o Node.js estiver instalado na pasta padrão do Windows, atualize o `PATH` do terminal atual e repita o comando.

```powershell
$env:Path = 'C:\Program Files\nodejs;' + $env:Path
```

### Como o código funciona

O componente [`Contador`](Exemplo01/example_usestate.jsx) usa `useState(0)` para guardar o valor inicial. Ao clicar no botão, `setContador(c => c + 1)` calcula o próximo valor a partir do anterior. O React atualiza o número exibido. A pasta `Exemplo01/` reúne o componente, o [`index.html`](Exemplo01/index.html) e o [`main.jsx`](Exemplo01/main.jsx) que o renderiza. As dependências ficam na raiz e são compartilhadas entre os exemplos.
