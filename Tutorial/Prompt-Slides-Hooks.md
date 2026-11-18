# Prompt para o chat que cria slides

Acrescente à apresentação existente uma sequência de **8 slides em português do Brasil** sobre **React Hooks, estado e ciclo de vida**, para uma aula-teste de até **20 minutos**. Preserve o estilo visual da apresentação. O público conhece funções JavaScript e JSX básicos. Use o projeto de aula descrito abaixo como fio condutor. Mostre blocos curtos de código com fonte monoespaçada e destaque só a linha comentada na fala. Coloque detalhes adicionais nas notas do apresentador.

Para cada slide, entregue **título, conteúdo visível, trecho essencial de código, notas de fala, ação de demonstração e frase de transição**. Inclua todos os exemplos. Reserve a execução ao vivo para o contador, o temporizador e a postagem em duas abas. Apresente os outros exemplos como comparações rápidas. Os tempos abaixo já somam 20 minutos. Use os nomes de arquivos e rotas indicados para a demonstração.

## Slide 1 · Do DOM ao estado do React · 0–2 min

**Aplicações:** `/Exemplo00/` e `/Exemplo01History/`. Mostre um contador em JavaScript puro, um contador React em classe e dois contadores React que chamam o mesmo Hook customizado `useContador`. O servidor local pode estar previamente aberto. Use o endereço mostrado pelo Vite.

```js
// Exemplo00/main.js · dentro do evento de clique
contador += 1;
valorExibido.textContent = contador;

// Exemplo01History/ContadorClasse.jsx · dentro do método incrementar
this.setState(estado => ({ valor: estado.valor + 1 }));

// Exemplo01History/useContador.js · dentro do Hook customizado
const [valor, setValor] = useState(0);
setValor(anterior => anterior + 1); // dentro de incrementar()
```

**Fala e demonstração.** “No JavaScript puro, o evento muda uma variável e escreve no DOM. A classe também usa React e mostra como o estado era tratado antes dos Hooks. Com Hooks, um componente de função acessa estado, e um Hook customizado concentra o comportamento reutilizável.” Mostre que a classe inicializa `state = { valor: 0 }`, monta com esse valor e atualiza a interface via `setState`. O JavaScript puro registra um listener ao carregar a página e escreve no DOM em cada clique. Nos contadores com Hook, cada instância monta com `0`, e só a instância clicada muda. Relacione com encapsulamento em Orientação a Objetos: `useContador` oferece `incrementar` e mantém `setValor` no seu escopo. O React preserva o valor entre renderizações. Na desmontagem, o estado local daquela instância é descartado. A classe e esses contadores não agendam efeitos.

**Transição.** “Vamos abrir o Hook que guarda o valor e separar o que acontece no clique do que aparece na tela.”

## Slide 2 · `useState`, do número ao booleano · 2–5 min

**Aplicações:** `/Exemplo01/` e `/Exemplo03/`. Use a primeira para mostrar o contador e a segunda para transferir o conceito a uma curtida.

```jsx
// Exemplo01/example_usestate.jsx
const [contador, setContador] = useState(0);
<button onClick={() => setContador(c => c + 1)}>Incrementar</button>

// Exemplo03/example_curtida.jsx
const [curtiu, setCurtiu] = useState(false);
const curtidas = curtiu ? 1 : 0;
```

**Fala e demonstração.** “Na montagem, o contador começa em `0`. O `useState` devolve o valor da renderização e uma função fornecida pelo React. Eu escolho os nomes pela posição no array. Ao clicar, `onClick` chama o setter, e o React renderiza novamente com o valor atualizado.” Explique que `const` vale para aquela execução do componente. A função `c => c + 1` calcula o próximo valor a partir do anterior. Mostre uma curtida de `0` para `1` e de volta para `0`. O total é calculado a partir do booleano em cada renderização. Ao desmontar, o estado local é descartado. Estes exemplos não precisam de `useEffect`.

**Transição.** “Podemos reaproveitar a mesma ideia em uma postagem e separar a interface em componentes.”

## Slide 3 · Curtida e comentários como componentes · 5–7 min

**Aplicações:** `/Exemplo04/` e `/Exemplo05/`. Use uma imagem da postagem “Meu Instagram” com o gato. No 04, a simulação começa com 10 curtidas e alterna entre 10 e 11. No 05, a mesma postagem compõe `Curtida` e `Comentarios`.

```jsx
// Exemplo04/example_postagem.jsx · comportamento do botão
const curtidas = 10 + (curtiu ? 1 : 0);
// No botão, aria-pressed={curtiu} e onClick={() => setCurtiu(v => !v)}

// Exemplo05/Postagem.jsx · composição
<Curtida />
<Comentarios />
```

**Fala e demonstração.** “O `onClick` reage ao evento. `aria-pressed` comunica o estado atual para tecnologias assistivas. No 05, o coração guarda um booleano e os comentários guardam o texto e a lista com `useState`.” Mostre nas notas as duas linhas da publicação local: `setComentarios(anteriores => [...anteriores, comentario]);` e `setTexto('');`. Na montagem, o coração está desmarcado e a lista está vazia. Digitar, publicar ou curtir atualiza o estado correspondente. Ao desmontar ou recarregar, o estado local é perdido. Mostre que a curtida não altera a lista.

**Transição.** “Quando uma ação altera mais de um campo, podemos dar um nome à ação e concentrar a regra.”

## Slide 4 · `useReducer`, ação e próximo estado · 7–9 min

**Aplicação:** `/Exemplo06Reducer/`. Mostre o formulário, a mensagem temporária “Um usuário está comentando...” no fim da lista e sua substituição pelo comentário ao publicar.

```jsx
// Exemplo06Reducer/Comentarios.jsx · recortes
const [{ texto, comentarios }, dispatch] = useReducer(reducer, estadoInicial);
dispatch({ tipo: 'digitar', texto: evento.target.value });
dispatch({ tipo: 'publicar' });

// No reducer, caso 'digitar'
return { ...estado, texto: acao.texto };
// No reducer, caso 'publicar', após validar o texto
return { texto: '', comentarios: [...estado.comentarios, comentario] };
```

**Fala e demonstração.** “`dispatch` informa o que aconteceu. O reducer recebe o estado e a ação e devolve um novo estado. Os três pontos copiam as propriedades do objeto ou os itens do array. Publicar acrescenta à lista e limpa o campo na mesma transição.” Na montagem, o rascunho e a lista estão vazios. Na atualização, `digitar` muda o rascunho e `publicar` muda os dois campos. A mensagem é derivada do rascunho. O reducer é uma função pura e a lista é local. Na desmontagem, esse estado é descartado.

**Transição.** “Até aqui, os valores vieram de eventos. Agora vamos sincronizar o componente com algo que existe fora dele.”

## Slide 5 · `useEffect` e o temporizador · 9–13 min

**Aplicação:** `/Exemplo02/`. Demonstre **Iniciar**, deixe contar e clique em **Pausar**. Em seguida, relacione o clique manual com a dependência `[ativo]`.

```jsx
// Exemplo02/example_useeffect.jsx
useEffect(() => {
  if (!ativo) return;

  const timer = setInterval(() => {
    setContador(c => c + 1);
  }, 1000);

  return () => clearInterval(timer);
}, [ativo]);
```

**Fala e demonstração.** “Na montagem, `ativo` vale `false`, então o efeito roda sem criar intervalo. Ao iniciar, `ativo` muda, o efeito é configurado e o relógio atualiza o contador a cada segundo. Cada incremento renderiza a interface. Como `[ativo]` não muda nesses incrementos, o efeito continua com o mesmo intervalo. Ao pausar, o React executa a limpeza anterior e a nova execução com `false` não configura intervalo. Ao desmontar com o temporizador ativo, o React também executa a limpeza.” Explique que a montagem, a atualização e a desmontagem são do **componente**. Configurar e limpar são etapas do **efeito**. O efeito é executado depois que a interface é aplicada pelo React. Nas notas, contraste `[ativo]` com `[]` e, se houver tempo, cite o ciclo adicional de configuração e limpeza no desenvolvimento com `StrictMode`.

**Transição.** “O mesmo princípio pode manter uma tela sincronizada com dados que outros usuários alteram.”

## Slide 6 · Meu Instagram compartilhado · 13–15 min

**Aplicação:** `/Exemplo07/`. Mostre dois navegadores ou abas com **Ana** e **Bruno**. Cada pessoa entra só com o nome. A postagem de `GatoUser` já está cadastrada no SQLite. Separe no visual o rascunho local da lista de comentários e das curtidas compartilhadas.

```jsx
// Exemplo07/Postagem.jsx
const [postagem, setPostagem] = useState(null);

// Exemplo07/Comentarios.jsx · trechos do formulário
const [{ texto }, dispatch] = useReducer(reducer, { texto: '' });
if (texto.trim() && await salvar(texto)) dispatch({ tipo: 'publicado' });
```

**Fala e demonstração.** “O `useState` guarda a resposta da API. O `useReducer` controla só o texto em edição e o limpa depois que o servidor confirma a publicação. O SQLite persiste as curtidas e os comentários. Cada nome tem uma curtida, e o total parte de 10.” Mostre que o coração representa a curtida da pessoa atual. Na montagem, o formulário de entrada aparece. Após a confirmação da entrada, a postagem e o componente de comentários aparecem com os dados do servidor. Trocar de usuário descarta o rascunho local. Ao recarregar e entrar novamente, os registros do SQLite continuam disponíveis.

**Transição.** “Se Bruno está com a aba aberta, como ele vê o comentário que Ana acabou de publicar?”

## Slide 7 · Infográfico da atualização automática · 15–18 min

**Aplicação:** `/Exemplo07/`. Faça um infográfico de duas faixas: **Ana publica → API → SQLite** e **aba de Bruno → `useEffect` → API lê SQLite → `setPostagem` (`useState`) → lista e total na tela**. Na faixa de Ana, mostre que `useReducer` mantém o rascunho e o limpa após a confirmação do servidor. Na de Bruno, destaque “consulta a cada 3 segundos, aproximadamente”. Ao lado, inclua a saída “Trocar nome ou sair → cancelar temporizador e requisição”.

```jsx
// Exemplo07/Postagem.jsx · recorte do efeito. consultar é a função assíncrona.
useEffect(() => {
  if (!participante || ocupado) return;
  const controle = new AbortController();
  let temporizador = setTimeout(consultar, 3000);
  // consultar lê a API com controle.signal, chama setPostagem
  // e agenda o próximo setTimeout ao terminar, se o sinal estiver ativo.
  return () => {
    clearTimeout(temporizador);
    controle.abort();
  };
}, [participante, ocupado]);
```

**Fala e demonstração.** “Ana publica. Bruno vê o comentário na próxima consulta, enquanto o rascunho dele continua no campo. As consultas são encadeadas: o código espera o término da anterior para agendar a seguinte. Ao começar uma ação manual, `ocupado` pausa a consulta de fundo. Ao terminar, o efeito volta a agendar. A limpeza cancela o próximo agendamento e interrompe a requisição em andamento. Na montagem inicial, ainda sem participante, o efeito não agenda a consulta.” Na demonstração, escreva um rascunho na aba de Bruno, publique e curta na aba de Ana e mostre na aba de Bruno o novo comentário, o total atualizado e o coração pessoal dele.

**Transição.** “Agora identifiquem quem guarda o valor, quem aplica as regras e quem consulta o mundo externo.”

## Slide 8 · Verificação e síntese · 18–20 min

Mostre três perguntas. Revele as respostas só depois de ouvir a turma.

1. **Por que incrementar no Exemplo 02 não recria o intervalo?** A dependência é `ativo`, e o clique no contador muda `contador`.
2. **O que acontece com o rascunho de Bruno quando chega um comentário de Ana?** A consulta atualiza a postagem em `useState`; o rascunho continua no `useReducer` de Bruno.
3. **O que a limpeza faz quando Bruno troca de nome?** Cancela o temporizador e a consulta em andamento da sessão anterior. Os comentários já publicados continuam no SQLite.

**Fechamento para falar.** “`useState` guarda valores do componente. `useReducer` organiza mudanças por ação. `useEffect` sincroniza com um recurso externo e dá um lugar para limpar o que foi configurado.”
