function registerAccount() {
    const dataAccount = {
        name: document.querySelector("#up-name").value,
        email: document.querySelector("#up-email").value,
        password: document.querySelector("#up-password").value
    };

    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
    if(!checkEmail(accounts, dataAccount.email)) {
        accounts.push(dataAccount);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        alert("Conta Cadastrada com Sucesso!");
    } else alert("Já existe conta com esse e-mail");

}
function login(){
    let accounts = localStorage.getItem("accounts") ? JSON.parse(localStorage.getItem("accounts")) : [];
    if(accounts.some(a => a.email === document.querySelector("#in-email").value && a.password === document.querySelector("#in-password").value)){
        let user = accounts.find(a => a.email === document.querySelector("#in-email").value);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = 'manager.html';
        alert("Logado com Sucesso!");
    }else alert("Erro de Autenticação");
}

function checkEmail(accounts, email){
    return accounts.some(a => a.email === email);
}
function checkPassword(accounts, password){
    return accounts.some(a => a.password === password);
}