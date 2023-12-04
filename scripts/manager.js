function logoff(){
    window.location.href = 'index.html';
    localStorage.removeItem("user");
    alert("Boa noite!");
}

function makeTask(){
    const dataTask = {
        task: document.querySelector("#task").value,
        initialDate: document.querySelector("#initial-date").value,
        initialHour: document.querySelector("#initial-hour").value,
        finishDate: document.querySelector("#finish-date").value,
        finishHour: document.querySelector("#finish-hour").value,
        description: document.querySelector("#description").value,
    }

    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

    tasks.push(dataTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const headerTitle = document.querySelector('.header-title');
headerTitle.innerText = `Bem Vindo, ${JSON.parse(localStorage.getItem("user")).name}`;

if(localStorage.getItem("tasks")){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const tbody = document.querySelector("tbody");
    tasks.forEach(t => {
        const tr = document.createElement('tr');
        const tdtask = document.createElement('td');
        const tdinitial = document.createElement('td');
        const tdfinish = document.createElement('td');
        var tdstatus = document.createElement('td');
        const tdchange = document.createElement('td');
        const btnchange = document.createElement('button');
        
        tdinitial.innerText = `${formatData(t.initialDate)} às ${t.initialHour}`;
        tdfinish.innerText = `${formatData(t.finishDate)} às ${t.finishHour}`;
        tdtask.innerText = `${t.task}`;
        tdtask.setAttribute("data-bs-toggle", "modal");
        tdtask.setAttribute('data-bs-target', '#info-task-modal');
        tdtask.classList.add('td-task');
        tdtask.classList.add('p-2');
        tdstatus = taskStatus(tdstatus, t.initialDate, t.initialHour, t.finishDate, t.finishHour); 
        btnchange.innerText = 'Alterar';
        btnchange.classList.add('btn','btn-warning','p-1', 'rounded');
        btnchange.setAttribute("data-bs-toggle", "modal");
        btnchange.setAttribute('data-bs-target', '#change-task-modal');
        btnchange.addEventListener("click", changeModal(t));
        tdchange.appendChild(btnchange);
        tr.appendChild(tdtask);
        tr.appendChild(tdinitial);
        tr.appendChild(tdfinish);
        tr.appendChild(tdstatus);
        tr.appendChild(tdchange);

        tbody.appendChild(tr);
    });
}

function changeModal(task){
    let name = document.querySelector('#nametask');
    let di = document.querySelector('#di');
    let hi = document.querySelector('#hi');
    let dt = document.querySelector('#dt');
    let ht = document.querySelector('#ht');

    // Limpar conteúdo anterior
    name.textContent = "";
    di.textContent = "";
    hi.textContent = "";
    dt.textContent = "";
    ht.textContent = "";

    // Configurar novos valores
    name.textContent = task.task;
    di.textContent = formatData(task.initialDate);
    hi.textContent = task.initialHour;
    dt.textContent = formatData(task.finishDate);
    ht.textContent = task.finishHour;
}

function formatData(date){
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    var formatoData = new Intl.DateTimeFormat('pt-BR', options);

    var dataFormatada = formatoData.format(new Date(date));
    return dataFormatada;
}

function taskStatus(tdstatus, initialDate, initialHour, finishDate, finishHour){
    const status = {
        ATRASO: 'Em atraso',
        PENDENTE: 'Pendente',
        ANDAMENTO: 'Em andamento',
        REALIZADA: 'Realizada'
    }
    const start = new Date(`${initialDate}T${initialHour}:00`).getTime();
    const finish = new Date(`${finishDate}T${finishHour}:00`).getTime();
    const now = new Date().getTime();

    if(finish < now) {
        tdstatus.innerText = status.ATRASO;
        tdstatus.setAttribute("style", "color: red");
    } 
    else if(start < now && now < finish) {
        tdstatus.innerText = status.ANDAMENTO;
        tdstatus.setAttribute("style", "color: blue");
    } 
    else if(now < start) {
        tdstatus.innerText = status.PENDENTE;
        tdstatus.setAttribute("style", "color: yellow");
    } 

    return tdstatus;
}