const formLogin = 
    document.getElementById("form-login");

const mensagemErro =
    document.getElementById("mensagem-erro");

formLogin.addEventListener("submit",function(event) {

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