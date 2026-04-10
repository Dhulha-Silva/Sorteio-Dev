window.onload = () => {
  const inputMin = document.getElementById('inputMin');
  const inputMax = document.getElementById('inputMax');
  const botao = document.getElementById('botaoGerar');
  const modal = document.getElementById('modalResultado');
  const numeroSorteadoDiv = document.getElementById('numeroSorteado');
  const fecharModal = document.getElementById('fecharModal');
  const form = document.getElementById('formSorteio');

  const gerarNumeroAleatorio = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Validação dos inputs com mensagens inline e estilos
  const validarInputs = () => {
    let valid = true;

    const minVal = inputMin.value.trim();
    const maxVal = inputMax.value.trim();
    const min = Number(minVal);
    const max = Number(maxVal);

    // Limpa mensagens
    document.getElementById('errorMin').textContent = '';
    document.getElementById('errorMax').textContent = '';

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

    if (valid && min > max) {
      inputMin.classList.add('invalid');
      inputMax.classList.add('invalid');
      document.getElementById('errorMin').textContent = 'Mínimo deve ser ≤ máximo';
      document.getElementById('errorMax').textContent = 'Máximo deve ser ≥ mínimo';
      valid = false;
    }

    return valid;
  };

  // Função para animar o número antes de mostrar o resultado
  const animarNumero = (min, max, duracao = 2000, intervalo = 50) => {
    return new Promise((resolve) => {
      const fim = Date.now() + duracao;
      const animar = () => {
        if (Date.now() < fim) {
          const numero = gerarNumeroAleatorio(min, max);
          numeroSorteadoDiv.textContent = numero;
          setTimeout(animar, intervalo);
        } else {
          const numeroFinal = gerarNumeroAleatorio(min, max);
          numeroSorteadoDiv.textContent = numeroFinal;
          resolve(numeroFinal);
        }
      };
      animar();
    });
  };

  // Função para mudar a cor do texto do input conforme digitação
  const mudarCorInput = (input) => {
    if (input.value.trim() !== '') {
      input.style.color = '#aec346'; // cor verde clara
    } else {
      input.style.color = '#555555'; // cor padrão
    }
  };

  // Função principal para gerar número e mostrar modal com animação
  const gerarNumero = async (event) => {
    event.preventDefault(); // previne submit do form

    if (!validarInputs()) {
      return;
    }

    botao.disabled = true;
    const min = Number(inputMin.value);
    const max = Number(inputMax.value);

    await animarNumero(min, max);

    modal.classList.remove('hidden');
    botao.disabled = false;
  };

  // Eventos
  inputMin.addEventListener('input', () => {
    validarInputs();
    mudarCorInput(inputMin);
  });

  inputMax.addEventListener('input', () => {
    validarInputs();
    mudarCorInput(inputMax);
  });

  form.addEventListener('submit', gerarNumero);

  fecharModal.addEventListener('click', () => {
    modal.classList.add('hidden');
    inputMin.focus();
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.add('hidden');
      inputMin.focus();
    }
  });

  // Inicializa validação e cor ao carregar a página
  validarInputs();
  mudarCorInput(inputMin);
  mudarCorInput(inputMax);
};