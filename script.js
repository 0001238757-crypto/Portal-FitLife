const formLogin =
    document.getElementById("form-login");
const mensagemErro =
    document.getElementById("mensagem-erro");
if (formLogin) {
    formLogin.addEventListener("submit", function(event) {
        event.preventDefault();
        const email =
            document.getElementById("email").value;
        const senha =
            document.getElementById("senha").value;
        if (
            email === "teste@gmail.com" &&
            senha === "1234"
        ) {
            window.location.href = "dashboard.html";
        } else {
            mensagemErro.textContent =
                "E-mail ou Senha incorretos!";
        }
    });
}
const exercicios =
    document.querySelectorAll(".exercicio-check");
const numeroConcluidos =
    document.getElementById("exercicios-concluidos");
const totalExercicios =
    document.getElementById("total-exercicios");
const barraProgresso =
    document.getElementById("progresso-treino");
if (exercicios.length > 0) {
    totalExercicios.textContent =
        exercicios.length;
    exercicios.forEach(function(exercicio) {
        exercicio.addEventListener(
            "change",
            atualizarTreino
        );
    });
    function atualizarTreino() {
        const concluidos =
            document.querySelectorAll(
                ".exercicio-check:checked"
            );
        numeroConcluidos.textContent =
            concluidos.length;
        const porcentagem =
            (concluidos.length / exercicios.length) * 100;
        barraProgresso.style.width =
            porcentagem + "%";
        exercicios.forEach(function(exercicio) {
            const card =
                exercicio.closest(".card-exercicio");
            if (exercicio.checked) {
                card.classList.add("concluido");
            } else {
                card.classList.remove("concluido");
            }
        });
    }
}
const botaoImc =
    document.getElementById("calcular-imc");
if (botaoImc) {
    botaoImc.addEventListener("click", function() {
        const peso =
            Number(
                document.getElementById("peso").value
            );
        const altura =
            Number(
                document.getElementById("altura").value
            );
        const resultadoImc =
            document.getElementById("resultado-imc");
        const classificacaoImc =
            document.getElementById("classificacao-imc");
        if (peso <= 0 || altura <= 0) {
            resultadoImc.textContent = "--";
            classificacaoImc.textContent =
                "Digite valores válidos";
            return;
        }
        const imc =
            peso / (altura * altura);
        resultadoImc.textContent =
            imc.toFixed(1);
        if (imc < 18.5) {
            classificacaoImc.textContent =
                "Abaixo do peso";
        } else if (imc < 25) {
            classificacaoImc.textContent =
                "Peso normal";
        } else if (imc < 30) {
            classificacaoImc.textContent =
                "Sobrepeso";
        } else {
            classificacaoImc.textContent =
                "Obesidade";
        }
    });
}
const botaoAgua =
    document.getElementById("calcular-agua");
if (botaoAgua) {
    botaoAgua.addEventListener("click", function() {
        const pesoAgua =
            Number(
                document.getElementById("peso-agua").value
            );
        const tempoTreino =
            Number(
                document.getElementById("tempo-treino").value
            );
        const resultadoAgua =
            document.getElementById("resultado-agua");
        if (pesoAgua <= 0 || tempoTreino < 0) {
            resultadoAgua.textContent = "--";
            return;
        }
        const aguaBase =
            pesoAgua * 35;
        const aguaTreino =
            (tempoTreino / 60) * 500;
        const aguaTotal =
            aguaBase + aguaTreino;
        const litros =
            aguaTotal / 1000;
        resultadoAgua.textContent =
            litros.toFixed(2);
    });
}
let segundosTreino = 0;
let intervaloTreino = null;
const cronometro =
    document.getElementById("cronometro");
const iniciarCronometro =
    document.getElementById("iniciar-cronometro");
const pausarCronometro =
    document.getElementById("pausar-cronometro");
const zerarCronometro =
    document.getElementById("zerar-cronometro");
const usarTempoCronometro =
    document.getElementById("usar-tempo-cronometro");
function atualizarCronometro() {
    const horas =
        Math.floor(segundosTreino / 3600);
    const minutos =
        Math.floor(
            (segundosTreino % 3600) / 60
        );
    const segundos =
        segundosTreino % 60;
    cronometro.textContent =
        String(horas).padStart(2, "0")
        + ":" +
        String(minutos).padStart(2, "0")
        + ":" +
        String(segundos).padStart(2, "0");
}
if (iniciarCronometro) {
    iniciarCronometro.addEventListener(
        "click",
        function() {
            if (intervaloTreino === null) {
                intervaloTreino =
                    setInterval(function() {
                        segundosTreino++;
                        atualizarCronometro();
                    }, 1000);
            }
        }
    );
}
if (pausarCronometro) {
    pausarCronometro.addEventListener(
        "click",
        function() {
            clearInterval(intervaloTreino);
            intervaloTreino = null;
        }
    );
}
if (zerarCronometro) {
    zerarCronometro.addEventListener(
        "click",
        function() {
            clearInterval(intervaloTreino);
            intervaloTreino = null;
            segundosTreino = 0;
            atualizarCronometro();
        }
    );
}
if (usarTempoCronometro) {
    usarTempoCronometro.addEventListener(
        "click",
        function() {
            const minutosTreino =
                Math.ceil(segundosTreino / 60);
            const campoTempo =
                document.getElementById("tempo-treino");
            campoTempo.value =
                minutosTreino;
        }
    );
}
const botoesAgendar =
    document.querySelectorAll(".botao-agendar");

const listaAulas =
    document.getElementById("lista-aulas-agendadas");

const mensagemAulas =
    document.getElementById("mensagem-aulas");

if (botoesAgendar.length > 0) {

    botoesAgendar.forEach(function(botao) {

        botao.addEventListener("click", function() {

            const nomeAula =
                botao.getAttribute("data-aula");

            const aulaExistente =
                document.querySelector(
                    '.aula-agendada[data-aula="' + nomeAula + '"]'
                );

            if (aulaExistente) {

                aulaExistente.remove();

                botao.textContent = "Agendar";
                botao.classList.remove("agendado");

            } else {

                const card =
                    botao.closest(".card-aula");

                const horario =
                    card.querySelector(".dados-aula").textContent
                        .replace(/\s+/g, " ")
                        .trim();

                const novaAula =
                    document.createElement("div");

                novaAula.classList.add("aula-agendada");
                novaAula.setAttribute("data-aula", nomeAula);

                novaAula.innerHTML =
                    "<strong>" + nomeAula + "</strong>" +
                    "<span>" + horario + "</span>";

                listaAulas.appendChild(novaAula);

                botao.textContent = "Cancelar";
                botao.classList.add("agendado");

            }

            if (listaAulas.children.length > 0) {
                mensagemAulas.style.display = "none";
            } else {
                mensagemAulas.style.display = "block";
            }

        });

    });

}