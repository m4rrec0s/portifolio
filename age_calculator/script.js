function validarNumeros(input, maxLength) {
    // Remove caracteres não numéricos
    let valorDigitado = input.value.replace(/\D/g, '');

    // Limita o comprimento conforme necessário
    valorDigitado = valorDigitado.slice(0, maxLength);

    // Atualiza o valor do input
    input.value = valorDigitado;
}

document.addEventListener("DOMContentLoaded", function () {
    var dia = document.getElementById('dia');
    var mes = document.getElementById('mes');
    var ano = document.getElementById('ano');
    var idadeYears = document.getElementById('anoYears');
    var idadeMonths = document.getElementById('anoMonths');
    var idadeDays = document.getElementById('anoDays');

    function mostrarErro(input, mensagem) {
        // Remove mensagens de erro existentes
        var mensagensErroAntigas = input.parentNode.querySelectorAll('.mensagem-erro');
        mensagensErroAntigas.forEach(function (element) {
            element.parentNode.removeChild(element);
        });
        // Adiciona mensagem de erro abaixo do input
        var mensagemErro = document.createElement('div');
        mensagemErro.className = 'mensagem-erro';
        mensagemErro.innerText = mensagem;
        input.parentNode.appendChild(mensagemErro);

        // Adiciona classe de erro ao label
        var label = input.labels[0]; // Seleciona o primeiro label associado ao input
        if (label) {
            label.classList.add('erro-label');
        }
    
        // Adiciona classe de erro ao input
        input.classList.add('erro-input');
    }

    function limparErros() {
        // Remove todas as mensagens de erro
        var mensagensErro = document.querySelectorAll('.mensagem-erro');
        mensagensErro.forEach(function (mensagem) {
            mensagem.parentNode.removeChild(mensagem);
        });

        // Remove classe de erro do label
        var labelsErro = document.querySelectorAll('.erro-label');
        labelsErro.forEach(function (label) {
            label.classList.remove('erro-label');
        });

        // Remove classe de erro do input
        var inputsErro = document.querySelectorAll('.erro-input');
        inputsErro.forEach(function (input) {
            input.classList.remove('erro-input');
        });
    }

    function mostrarNumeros() {
        // Obtém os valores dos campos
        var diaValor = parseInt(dia.value, 10) || 0;
        var mesValor = parseInt(mes.value, 10) || 0;
        var anoValor = parseInt(ano.value, 10) || 0;
        // Verifica se o dia é válido para o mês
        var ultimoDiaDoMes = new Date(anoValor, mesValor, 0).getDate(); 

        // Limpa todos os erros antes de verificar novamente
        limparErros();
        // Verificações adicionais

        //Caso o usuário não colocar nenhum valor
        if (diaValor == 0) {
            mostrarErro(dia, 'Insira algum valor.');
        }

        if (mesValor == 0) {
            mostrarErro(mes, 'Insira algum valor.');
        }
        
        if (anoValor == 0) {
            mostrarErro(ano, 'Insira algum valor.');
        }

        if (diaValor < 1 || diaValor > 31) {
            mostrarErro(dia, 'O dia deve estar entre 1 e 31.');
        }

        if (mesValor < 1 || mesValor > 12) {
            mostrarErro(mes, 'O mês deve estar entre 1 e 12.');
        }

        if (anoValor >= new Date().getFullYear()) {
            mostrarErro(ano, 'O ano deve ser menor que o ano atual.');
        }
        
        if (diaValor < 1 || diaValor > ultimoDiaDoMes) {
            mostrarErro(dia, 'O dia não é válido para este mês.');
        }

        // Verifica se houve algum erro antes de mostrar o resultado
        var houveErros = document.querySelectorAll('.erro-input').length > 0;

        if (!houveErros) {
            var hoje = new Date();

            // Define a data de nascimento com base nos valores dos campos

            var dataNascimento = new Date(anoValor, mesValor - 1, diaValor);
        
            // Calcula a diferença em anos, meses e dias
            var diferencaEmAnos = hoje.getFullYear() - dataNascimento.getFullYear();
            var mesAtual = hoje.getMonth();
            var mesNascimento = dataNascimento.getMonth();
        
            // Verifica se já fez aniversário este ano
            if (mesNascimento > mesAtual || (mesNascimento === mesAtual && hoje.getDate() < dataNascimento.getDate())) {
                diferencaEmAnos--;
            }

            var diferencaEmMeses = mesAtual - mesNascimento;

            // Ajuste para evitar meses negativos
            if (diferencaEmMeses < 0) {
                diferencaEmMeses = 12 + diferencaEmMeses;
            }

            // Ajuste para garantir que os meses estejam no intervalo de 0 a 11
            diferencaEmMeses = diferencaEmMeses >= 0 ? diferencaEmMeses : 0;

            var diferencaEmDias;
            
            if (hoje.getDate() >= dataNascimento.getDate()) {
                diferencaEmDias = hoje.getDate() - dataNascimento.getDate();
            } else {
                var ultimoDiaDoMesNascimento = new Date(anoValor, mesValor, 0).getDate();
                diferencaEmDias = ultimoDiaDoMesNascimento - dataNascimento.getDate() + hoje.getDate();
            }
        
            var ultimoDiaDoMesNascimento = new Date(anoValor, mesValor, 0).getDate();
            var ultimoDiaDoMesAtual = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).getDate();
        
            var diferencaEmDias;
        
            if (hoje.getDate() >= dataNascimento.getDate()) {
                diferencaEmDias = hoje.getDate() - dataNascimento.getDate();
            } else {
                diferencaEmDias = ultimoDiaDoMesNascimento - dataNascimento.getDate() + hoje.getDate();
            }
        
            updateElementWithAnimation(idadeYears, diferencaEmAnos);
            updateElementWithAnimation(idadeMonths, diferencaEmMeses);
            updateElementWithAnimation(idadeDays, diferencaEmDias);

            // Chama a função de verificação e celebração ao carregar a página
            verificarEcelebrarAniversario();
        
            // Adiciona a classe .purple-text apenas aos '--' dentro dos elementos <p>
            idadeYears.querySelector('p').classList.add('purple-text');
            idadeMonths.querySelector('p').classList.add('purple-text');
            idadeDays.querySelector('p').classList.add('purple-text');
        }

        function celebrarAniversario() {
            // Adicione a classe de animação de confete à div principal
            var confettiElement = document.getElementById('my-canvas');
            var confettiSettings = { target: confettiElement };
            var confetti = new ConfettiGenerator(confettiSettings);

            // Adicione um identificador ao confetti gerado
            confetti.identifier = 'celebration-confetti';

            confetti.render();
        }

        // Função para parar a celebração
        function pararCelebracao() {
            var confettiElement = document.getElementById('my-canvas');
            var confetti = confettiElement.querySelector('.confetti-wrapper');

            // Remove o confete se estiver em execução
            if (confetti) {
                confettiElement.innerHTML = ''; // Remove todos os elementos filhos do elemento do confete
            }
        }
    
    
        // Função para verificar e celebrar o aniversário
        function verificarEcelebrarAniversario() {
            var hoje = new Date();
            var aniversario = new Date(hoje.getFullYear(), mesValor - 1, diaValor);
        
            // Verifica se hoje é o aniversário
            if (
                hoje.getDate() === aniversario.getDate() &&
                hoje.getMonth() === aniversario.getMonth()
            ) {
                celebrarAniversario();
            } else {
                pararCelebracao();
            }
        }
    

        function updateElementWithAnimation(element, endValue) {
            var start = 0;
            var duration = 1500; // Tempo da animação em milissegundos
            var range = endValue - start;
            var current = start;
            var increment = endValue > start ? 1 : -1;
            var stepTime = Math.abs(Math.floor(duration / range));

            function updateNumber() {
                current += increment;

                // Ajuste para lidar com valores negativos
                var displayValue = current < 0 ? 0 : current;

                element.querySelector('p').innerText = displayValue;

                if ((increment > 0 && current < endValue) || (increment < 0 && current > endValue)) {
                    setTimeout(updateNumber, stepTime);
                }
            }

            updateNumber();

        }}

    var botao = document.getElementById('botao');
    botao.addEventListener('click', function () {
        limparErros();  // Chama limparErros antes de mostrarNumeros
        mostrarNumeros();
    });
});