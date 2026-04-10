window.onload = () => {
  // Seleciona os elementos do DOM necessários
  const inputMin = document.getElementById('inputMin'); // Input do valor mínimo
  const inputMax = document.getElementById('inputMax'); // Input do valor máximo
  const botao = document.getElementById('botaoGerar'); // Botão para sortear
  const modal = document.getElementById('modalResultado'); // Modal que mostra o resultado
  const numeroSorteadoDiv = document.getElementById('numeroSorteado'); // Div que exibe o número sorteado
  const fecharModal = document.getElementById('fecharModal'); // Botão para fechar o modal
  const form = document.getElementById('formSorteio'); // Formulário que engloba os inputs e botão

  // Função para gerar um número inteiro aleatório entre min e max (inclusive)
  const gerarNumeroAleatorio = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Função para validar os inputs e mostrar mensagens de erro inline
  const validarInputs = () => {
    let valid = true; // Flag para indicar se os inputs são válidos

    // Obtém os valores dos inputs e converte para número
    const minVal = inputMin.value.trim();
    const maxVal = inputMax.value.trim();
    const min = Number(minVal);
    const max = Number(maxVal);

    // Limpa as mensagens de erro anteriores
    document.getElementById('errorMin').textContent = '';
    document.getElementById('errorMax').textContent = '';

    // Validação do input mínimo
    if (minVal === '') {
      inputMin.classList.add('invalid');
      inputMin.classList.remove('valid');
      document.getElementById('errorMin').textContent = 'Campo obrigatório';
      valid = false;
    } else if (Number.isNaN(min)) {
      inputMin.classList.add('invalid');
      inputMin.classList.remove('valid');
      document.getElementById('errorMin').textContent = 'Digite um número válido';
      valid = false;
    } else {
      inputMin.classList.remove('invalid');
      inputMin.classList.add('valid');
    }

    // Validação do input máximo
    if (maxVal === '') {
      inputMax.classList.add('invalid');
      inputMax.classList.remove('valid');
      document.getElementById('errorMax').textContent = 'Campo obrigatório';
      valid = false;
    } else if (Number.isNaN(max)) {
      inputMax.classList.add('invalid');
      inputMax.classList.remove('valid');
      document.getElementById('errorMax').textContent = 'Digite um número válido';
      valid = false;
    } else {
      inputMax.classList.remove('invalid');
      inputMax.classList.add('valid');
    }

    // Validação da relação entre mínimo e máximo
    if (valid && min > max) {
      inputMin.classList.add('invalid');
      inputMax.classList.add('invalid');
      document.getElementById('errorMin').textContent = 'Mínimo deve ser ≤ máximo';
      document.getElementById('errorMax').textContent = 'Máximo deve ser ≥ mínimo';
      valid = false;
    }

    return valid; // Retorna se os inputs são válidos ou não
  };

  // Função para animar o número sorteado antes de mostrar o resultado final
  const animarNumero = (min, max, duracao = 2000, intervalo = 50) => {
    return new Promise((resolve) => {
      const fim = Date.now() + duracao; // Define o tempo final da animação
      const animar = () => {
        if (Date.now() < fim) {
          const numero = gerarNumeroAleatorio(min, max); // Gera número aleatório rápido
          numeroSorteadoDiv.textContent = numero; // Atualiza o número na tela
          setTimeout(animar, intervalo); // Chama a função novamente após o intervalo
        } else {
          const numeroFinal = gerarNumeroAleatorio(min, max); // Número final sorteado
          numeroSorteadoDiv.textContent = numeroFinal; // Exibe o número final
          resolve(numeroFinal); // Resolve a Promise para indicar fim da animação
        }
      };
      animar(); // Inicia a animação
    });
  };

  // Função para mudar a cor do texto do input conforme o usuário digita (destacar números)
  const mudarCorInput = (input) => {
    if (input.value.trim() !== '') {
      input.style.color = '#aec346'; // Verde claro para valor preenchido
    } else {
      input.style.color = '#555555'; // Cinza padrão para campo vazio
    }
  };

  // Função que executa o sorteio quando o formulário é submetido
  const gerarNumero = async (event) => {
    event.preventDefault(); // Previne o envio tradicional do form

    if (!validarInputs()) { // Se inputs inválidos, não prossegue
      return;
    }

    botao.disabled = true; // Desabilita o botão enquanto sorteio ocorre
    const min = Number(inputMin.value);
    const max = Number(inputMax.value);

    await animarNumero(min, max); // Executa a animação do número

    modal.classList.remove('hidden'); // Mostra o modal com o resultado final
    botao.disabled = false; // Reabilita o botão
  };

  // Event listeners para validar e mudar cor dos inputs enquanto o usuário digita
  inputMin.addEventListener('input', () => {
    validarInputs();
    mudarCorInput(inputMin);
  });

  inputMax.addEventListener('input', () => {
    validarInputs();
    mudarCorInput(inputMax);
  });

  // Evento para capturar o submit do formulário e chamar a função de gerar número
  form.addEventListener('submit', gerarNumero);

  // Evento para fechar o modal ao clicar no botão de fechar
  fecharModal.addEventListener('click', () => {
    modal.classList.add('hidden'); // Esconde o modal
    inputMin.focus(); // Retorna o foco para o input mínimo
  });

  // Evento para fechar o modal ao clicar fora da caixa de conteúdo
  modal.addEventListener('click', (event) => {
    if (event.target === modal) { // Se clicou no fundo do modal
      modal.classList.add('hidden'); // Esconde o modal
      inputMin.focus(); // Retorna o foco para o input mínimo
    }
  });

  // Inicializa estado visual de validação e cor dos inputs ao carregar a página
  validarInputs();
  mudarCorInput(inputMin);
  mudarCorInput(inputMax);
};