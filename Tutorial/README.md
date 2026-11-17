# Tutorial do Exemplo 01 — Contador com React

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
| `npm.cmd run dev -- --host 127.0.0.1 --open` | Iniciou o Vite na configuração inicial. Com a estrutura atual, `vite.config.js` define a página a abrir. O `--` repassa as opções seguintes ao Vite. |

O `package.json` também oferece `npm.cmd run preview` para visualizar localmente os arquivos de produção depois de rodar o build. Acrescente `Exemplo01/` ao endereço exibido no terminal.

## Estrutura e origem dos arquivos

Cada exemplo pode reunir seu próprio HTML e código React em uma pasta. O npm e o Vite são configurados na raiz, de onde você inicia o servidor para todos os exemplos. Os próximos exemplos podem seguir o mesmo padrão em `Exemplo02/`, `Exemplo03/` e assim por diante. Para incluí-los no build de produção, adicione os respectivos arquivos HTML à configuração do Vite.

| Arquivo ou pasta | Para que serve | Como surgiu |
| --- | --- | --- |
| [`Exemplo01/index.html`](../Exemplo01/index.html) | Página do exemplo. Contém o `<div id="root">` e referencia `main.jsx`. | Escrito durante a preparação e movido para a pasta do exemplo. |
| [`Exemplo01/main.jsx`](../Exemplo01/main.jsx) | Ponto de entrada do React. Usa `createRoot` do `react-dom` para exibir o componente `Contador` dentro do elemento `root`. | Escrito durante a preparação e movido para a pasta do exemplo. |
| [`Exemplo01/example_usestate.jsx`](../Exemplo01/example_usestate.jsx) | Componente da aula. Define o número exibido e o botão **Incrementar**. | Código da aula já existente, adaptado de `.js` para `.jsx`. |
| [`package.json`](../package.json) | Declara as dependências (`react`, `react-dom` e `vite`) e os scripts `dev`, `build` e `preview`. | Escrito durante a preparação. |
| [`vite.config.js`](../vite.config.js) | Configura o Vite para abrir `/Exemplo01/`, compilar as duas páginas e transformar o JSX automaticamente. Assim, os componentes importam apenas os Hooks que usam. | Escrito ao organizar os exemplos em suas próprias pastas. |
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
