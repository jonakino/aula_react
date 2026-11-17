# Aula de React

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

Mantenha o terminal aberto enquanto usar o exemplo. Para encerrar o servidor, pressione `Ctrl+C`.

Para passar à etapa com `useEffect`, abra [http://127.0.0.1:5173/Exemplo02/](http://127.0.0.1:5173/Exemplo02/) no mesmo servidor. O botão **Iniciar** ativa o temporizador, e **Pausar** interrompe a contagem automática. Os componentes das duas etapas estão em [`Exemplo01/example_usestate.jsx`](Exemplo01/example_usestate.jsx) e [`Exemplo02/example_useeffect.jsx`](Exemplo02/example_useeffect.jsx).

Se o PowerShell não reconhecer `npm.cmd` e o Node.js estiver instalado na pasta padrão do Windows, atualize o `PATH` do terminal atual e repita o comando.

```powershell
$env:Path = 'C:\Program Files\nodejs;' + $env:Path
```

### Como o código funciona

O componente [`Contador`](Exemplo01/example_usestate.jsx) usa `useState(0)` para guardar o valor inicial. Ao clicar no botão, `setContador(c => c + 1)` calcula o próximo valor a partir do anterior. O React atualiza o número exibido. A pasta `Exemplo01/` reúne o componente, o [`index.html`](Exemplo01/index.html) e o [`main.jsx`](Exemplo01/main.jsx) que o renderiza. As dependências ficam na raiz e são compartilhadas entre os exemplos.
