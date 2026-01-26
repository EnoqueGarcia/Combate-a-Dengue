let perguntas = []
let indiceAtual = 0
let pontuacao = 0

const perguntaEl = document.getElementById('pergunta')
const opcoesEl = document.getElementById('opcoes')
const feedbackEl = document.getElementById('feedback')
const btnProxima = document.getElementById('proxima')

// Carrega o JSON
fetch('perguntas.json')
  .then(res => res.json())
  .then(dados => {
    perguntas = dados
    mostrarPergunta()
  })

function mostrarPergunta() {
  feedbackEl.textContent = ''
  feedbackEl.className = 'text-center fw-bold'
  btnProxima.classList.add('d-none')
  opcoesEl.innerHTML = ''

  const atual = perguntas[indiceAtual]
  perguntaEl.textContent = atual.pergunta

  atual.opcoes.forEach((opcao, index) => {
    const botao = document.createElement('button')
    botao.className = 'btn btn-outline-success w-100 mb-2'
    botao.textContent = opcao
    botao.onclick = () => verificarResposta(index)
    opcoesEl.appendChild(botao)
  })
}

function verificarResposta(respostaSelecionada) {
  const correta = perguntas[indiceAtual].respostaCorreta

  // Desabilita todos os botões após a resposta
  const botoes = opcoesEl.querySelectorAll('button')
  botoes.forEach(botao => botao.disabled = true)

  if (respostaSelecionada === correta) {
    feedbackEl.textContent = '✅ Resposta correta!'
    feedbackEl.className = 'text-success fw-bold text-center'
    pontuacao++
  } else {
    feedbackEl.textContent = '❌ Resposta incorreta.'
    feedbackEl.className = 'text-danger fw-bold text-center'
  }

  btnProxima.classList.remove('d-none')
}


btnProxima.onclick = () => {
  indiceAtual++

  if (indiceAtual < perguntas.length) {
    mostrarPergunta()
  } else {
    finalizarQuiz()
  }
}

function finalizarQuiz() {
  perguntaEl.textContent = '🎉 Quiz finalizado!'
  opcoesEl.innerHTML = ''
  feedbackEl.innerHTML = `
    Você acertou <strong>${pontuacao}</strong> de <strong>${perguntas.length}</strong> perguntas.
    <br>
    Obrigado por participar e ajudar no combate à dengue!
  `
  btnProxima.classList.add('d-none')
}
