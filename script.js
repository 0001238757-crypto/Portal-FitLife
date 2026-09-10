/* =========================
LOGIN
========================= */

const formLogin =
    document.getElementById("form-login");

const mensagemErro =
    document.getElementById("mensagem-erro");


if (formLogin) {

    formLogin.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById("email").value;

            const senha =
                document.getElementById("senha").value;


            if (
                email === "teste@gmail.com" &&
                senha === "1234"
            ) {

                window.location.href =
                    "dashboard.html";

            } else {

                mensagemErro.textContent =
                    "E-mail ou senha incorretos!";

            }

        }
    );

}


/* =========================
TREINOS
========================= */

const exercicios =
    document.querySelectorAll(".exercicio-check");

const numeroConcluidos =
    document.getElementById("exercicios-concluidos");

const totalExercicios =
    document.getElementById("total-exercicios");

const barraProgresso =
    document.getElementById("progresso-treino");


if (exercicios.length > 0) {

    const treinosSalvos =
        JSON.parse(
            localStorage.getItem("treinosSalvos")
        ) || [];


    exercicios.forEach(
        function(exercicio, indice) {

            exercicio.checked =
                treinosSalvos[indice] || false;


            exercicio.addEventListener(
                "change",
                atualizarTreino
            );

        }
    );


    totalExercicios.textContent =
        exercicios.length;


    atualizarTreino();


    function atualizarTreino() {

        const concluidos =
            document.querySelectorAll(
                ".exercicio-check:checked"
            );


        numeroConcluidos.textContent =
            concluidos.length;


        const porcentagem =
            (
                concluidos.length /
                exercicios.length
            ) * 100;


        barraProgresso.style.width =
            porcentagem + "%";


        exercicios.forEach(
            function(exercicio) {

                const card =
                    exercicio.closest(
                        ".card-exercicio"
                    );


                if (exercicio.checked) {

                    card.classList.add(
                        "concluido"
                    );

                } else {

                    card.classList.remove(
                        "concluido"
                    );

                }

            }
        );


        const estadoTreinos =
            Array.from(exercicios).map(
                function(exercicio) {

                    return exercicio.checked;

                }
            );


        localStorage.setItem(
            "treinosSalvos",
            JSON.stringify(estadoTreinos)
        );


        localStorage.setItem(
            "totalExercicios",
            exercicios.length
        );

    }

}


/* =========================
IMC
========================= */

const botaoImc =
    document.getElementById("calcular-imc");


if (botaoImc) {

    botaoImc.addEventListener(
        "click",
        function() {

            const peso =
                Number(
                    document.getElementById(
                        "peso"
                    ).value
                );


            const altura =
                Number(
                    document.getElementById(
                        "altura"
                    ).value
                );


            const resultadoImc =
                document.getElementById(
                    "resultado-imc"
                );


            const classificacaoImc =
                document.getElementById(
                    "classificacao-imc"
                );


            if (
                peso <= 0 ||
                altura <= 0
            ) {

                resultadoImc.textContent =
                    "--";

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


            localStorage.setItem(
                "ultimoImc",
                imc.toFixed(1)
            );


            localStorage.setItem(
                "classificacaoImc",
                classificacaoImc.textContent
            );

            const historicoImc =
    JSON.parse(
        localStorage.getItem("historicoImc")
    ) || [];


const hoje =
    new Date();


const dataFormatada =
    hoje.toLocaleDateString("pt-BR");


historicoImc.unshift({

    data: dataFormatada,

    peso: peso,

    altura: altura,

    imc: imc.toFixed(1),

    classificacao:
        classificacaoImc.textContent

});


localStorage.setItem(
    "historicoImc",
    JSON.stringify(historicoImc)
);

        }
    );

}


/* =========================
ÁGUA
========================= */

const botaoAgua =
    document.getElementById("calcular-agua");


if (botaoAgua) {

    botaoAgua.addEventListener(
        "click",
        function() {

            const pesoAgua =
                Number(
                    document.getElementById(
                        "peso-agua"
                    ).value
                );


            const tempoTreino =
                Number(
                    document.getElementById(
                        "tempo-treino"
                    ).value
                );


            const resultadoAgua =
                document.getElementById(
                    "resultado-agua"
                );


            if (
                pesoAgua <= 0 ||
                tempoTreino < 0
            ) {

                resultadoAgua.textContent =
                    "--";

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


            localStorage.setItem(
                "aguaRecomendada",
                litros.toFixed(2)
            );

        }
    );

}


/* =========================
CRONÔMETRO
========================= */

let segundosTreino = 0;

let intervaloTreino = null;


const cronometro =
    document.getElementById("cronometro");

const iniciarCronometro =
    document.getElementById(
        "iniciar-cronometro"
    );

const pausarCronometro =
    document.getElementById(
        "pausar-cronometro"
    );

const zerarCronometro =
    document.getElementById(
        "zerar-cronometro"
    );

const usarTempoCronometro =
    document.getElementById(
        "usar-tempo-cronometro"
    );


function atualizarCronometro() {

    if (!cronometro) {
        return;
    }


    const horas =
        Math.floor(
            segundosTreino / 3600
        );


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
                    setInterval(
                        function() {

                            segundosTreino++;

                            atualizarCronometro();

                        },
                        1000
                    );

            }

        }
    );

}


if (pausarCronometro) {

    pausarCronometro.addEventListener(
        "click",
        function() {

            clearInterval(
                intervaloTreino
            );

            intervaloTreino = null;

        }
    );

}


if (zerarCronometro) {

    zerarCronometro.addEventListener(
        "click",
        function() {

            clearInterval(
                intervaloTreino
            );

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
                Math.ceil(
                    segundosTreino / 60
                );


            const campoTempo =
                document.getElementById(
                    "tempo-treino"
                );


            campoTempo.value =
                minutosTreino;

        }
    );

}


/* =========================
AULAS
========================= */

const botoesAgendar =
    document.querySelectorAll(
        ".botao-agendar"
    );


const listaAulas =
    document.getElementById(
        "lista-aulas-agendadas"
    );


const mensagemAulas =
    document.getElementById(
        "mensagem-aulas"
    );


let aulasAgendadas =
    JSON.parse(
        localStorage.getItem(
            "aulasAgendadas"
        )
    ) || [];


if (botoesAgendar.length > 0) {

    botoesAgendar.forEach(
        function(botao) {

            botao.addEventListener(
                "click",
                function() {

                    const nomeAula =
                        botao.getAttribute(
                            "data-aula"
                        );


                    const card =
                        botao.closest(
                            ".card-aula"
                        );


                    const horario =
                        card
                            .querySelector(
                                ".dados-aula"
                            )
                            .textContent
                            .replace(
                                /\s+/g,
                                " "
                            )
                            .trim();


                    const indiceAula =
                        aulasAgendadas.findIndex(
                            function(aula) {

                                return (
                                    aula.nome ===
                                    nomeAula
                                );

                            }
                        );


                    if (indiceAula >= 0) {

                        aulasAgendadas.splice(
                            indiceAula,
                            1
                        );

                    } else {

                        aulasAgendadas.push({

                            nome: nomeAula,

                            horario: horario

                        });

                    }


                    localStorage.setItem(
                        "aulasAgendadas",
                        JSON.stringify(
                            aulasAgendadas
                        )
                    );


                    atualizarAulas();

                }
            );

        }
    );


    atualizarAulas();


    function atualizarAulas() {

        listaAulas.innerHTML = "";


        botoesAgendar.forEach(
            function(botao) {

                const nome =
                    botao.getAttribute(
                        "data-aula"
                    );


                const estaAgendada =
                    aulasAgendadas.some(
                        function(aula) {

                            return (
                                aula.nome === nome
                            );

                        }
                    );


                if (estaAgendada) {

                    botao.textContent =
                        "Cancelar";

                    botao.classList.add(
                        "agendado"
                    );

                } else {

                    botao.textContent =
                        "Agendar";

                    botao.classList.remove(
                        "agendado"
                    );

                }

            }
        );


        aulasAgendadas.forEach(
            function(aula) {

                const novaAula =
                    document.createElement(
                        "div"
                    );


                novaAula.classList.add(
                    "aula-agendada"
                );


                novaAula.innerHTML =
                    "<strong>" +
                    aula.nome +
                    "</strong>" +

                    "<span>" +
                    aula.horario +
                    "</span>";


                listaAulas.appendChild(
                    novaAula
                );

            }
        );


        if (aulasAgendadas.length > 0) {

            mensagemAulas.style.display =
                "none";

        } else {

            mensagemAulas.style.display =
                "block";

        }

    }

}


/* =========================
DASHBOARD
========================= */

const metaTreinos =
    document.getElementById(
        "meta-treinos"
    );


const barraDashboardTreinos =
    document.getElementById(
        "barra-dashboard-treinos"
    );


const metaAgua =
    document.getElementById(
        "meta-agua"
    );


const metaAulas =
    document.getElementById(
        "meta-aulas"
    );


const proximasAulasDashboard =
    document.getElementById(
        "proximas-aulas-dashboard"
    );


const dashboardImc =
    document.getElementById(
        "dashboard-imc"
    );


const dashboardAgua =
    document.getElementById(
        "dashboard-agua"
    );


if (metaTreinos) {

    const treinos =
        JSON.parse(
            localStorage.getItem(
                "treinosSalvos"
            )
        ) || [];


    const total =
        Number(
            localStorage.getItem(
                "totalExercicios"
            )
        ) || 6;


    const concluidos =
        treinos.filter(
            function(treino) {

                return treino === true;

            }
        ).length;


    metaTreinos.textContent =
        concluidos +
        " de " +
        total +
        " concluídos";


    const porcentagem =
        total > 0
            ? (concluidos / total) * 100
            : 0;


    if (barraDashboardTreinos) {

        barraDashboardTreinos.style.width =
            porcentagem + "%";

    }

}


if (metaAulas) {

    const aulas =
        JSON.parse(
            localStorage.getItem(
                "aulasAgendadas"
            )
        ) || [];


    metaAulas.textContent =
        aulas.length +
        (
            aulas.length === 1
                ? " aula agendada"
                : " aulas agendadas"
        );

}


if (proximasAulasDashboard) {

    const aulas =
        JSON.parse(
            localStorage.getItem(
                "aulasAgendadas"
            )
        ) || [];


    proximasAulasDashboard.innerHTML =
        "";


    if (aulas.length === 0) {

        proximasAulasDashboard.innerHTML =
            "<p>Nenhuma aula agendada.</p>";

    } else {

        aulas.forEach(
            function(aula) {

                const elemento =
                    document.createElement(
                        "div"
                    );


                elemento.classList.add(
                    "aula"
                );


                elemento.innerHTML =
                    "<h3>" +
                    aula.nome +
                    "</h3>" +

                    "<p>" +
                    aula.horario +
                    "</p>";


                proximasAulasDashboard
                    .appendChild(elemento);

            }
        );

    }

}


const imcSalvo =
    localStorage.getItem(
        "ultimoImc"
    );


const classificacaoSalva =
    localStorage.getItem(
        "classificacaoImc"
    );


if (
    dashboardImc &&
    imcSalvo
) {

    dashboardImc.textContent =
        imcSalvo +
        " - " +
        classificacaoSalva;

}


const aguaSalva =
    localStorage.getItem(
        "aguaRecomendada"
    );


if (
    dashboardAgua &&
    aguaSalva
) {

    dashboardAgua.textContent =
        aguaSalva +
        " litros por dia";

}


if (
    metaAgua &&
    aguaSalva
) {

    metaAgua.textContent =
        aguaSalva +
        " L recomendados por dia";

}

/* =========================
RECUPERAÇÃO DE SENHA
========================= */

const abrirRecuperacao =
    document.getElementById(
        "abrir-recuperacao"
    );

const recuperacaoSenha =
    document.getElementById(
        "recuperacao-senha"
    );

const enviarRecuperacao =
    document.getElementById(
        "enviar-recuperacao"
    );


if (abrirRecuperacao) {

    abrirRecuperacao.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            recuperacaoSenha
                .classList
                .toggle("ativo");

        }
    );

}


if (enviarRecuperacao) {

    enviarRecuperacao.addEventListener(
        "click",
        function() {

            const email =
                document.getElementById(
                    "email-recuperacao"
                ).value;


            const mensagem =
                document.getElementById(
                    "mensagem-recuperacao"
                );


            if (email === "") {

                mensagem.textContent =
                    "Digite seu e-mail.";

                mensagem.style.color =
                    "#FF4D4D";

            } else {

                mensagem.textContent =
                    "Instruções de recuperação enviadas.";

                mensagem.style.color =
                    "#B6FF3B";

            }

        }
    );

}