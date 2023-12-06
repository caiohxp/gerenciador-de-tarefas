function logoff() {
    window.location.href = 'index.html';
    localStorage.removeItem("user");
    alert("Boa noite!");
}

function makeTask() {
    const dataTask = {
        id: 0,
        task: document.querySelector("#task").value,
        initialDate: document.querySelector("#initial-date").value,
        initialHour: document.querySelector("#initial-hour").value,
        finishDate: document.querySelector("#finish-date").value,
        finishHour: document.querySelector("#finish-hour").value,
        description: document.querySelector("#description").value,
        status: false
    }

    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    dataTask.id = tasks.length;

    if (checkDate(dataTask)) {
        tasks.push(dataTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } else alert('Data Inválida');
}

function changeTask() {
    const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    const changedTask = {
        id: parseInt(document.querySelector('#label-task').innerHTML.split(' ')[1][0]),
        task: document.querySelector('#nametask').value,
        initialDate: document.querySelector('#di').value,
        initialHour: document.querySelector('#hi').value,
        finishDate: document.querySelector('#dt').value,
        finishHour: document.querySelector('#ht').value
    }

    tasks.forEach(t => {
        if (checkDate(changedTask)) {
            if (t.id == changedTask.id) {
                t.task = changedTask.task;
                t.initialDate = changedTask.initialDate;
                t.initialHour = changedTask.initialHour;
                t.finishDate = changedTask.finishDate;
                t.finishHour = changedTask.finishHour;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                alert("Tarefa alterada com sucesso!");
                location.reload();
            }
        } else alert('Data Inválida!');
    })
}

function removeTask() {
    const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    const taskID = document.querySelector('#label-task').innerHTML.split(' ')[1][0];
    const filteredTasks = tasks.filter(t => t.id != taskID);

    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    alert("Tarefa removida!");
    location.reload();
}

function changeStatus(){
    const tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    const taskID = document.querySelector('#label-task').innerHTML.split(' ')[1][0];

    tasks.forEach(t => { if(t.id == taskID) t.status = !t.status; });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    location.reload();
}

const headerTitle = document.querySelector('.header-title');
headerTitle.innerText = `Bem Vindo, ${JSON.parse(localStorage.getItem("user")).name}`;

if (localStorage.getItem("tasks")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const tbody = document.querySelector("tbody");

    tasks.forEach((t) => {
        const tr = document.createElement('tr');
        const tdtask = document.createElement('td');
        const tdinitial = document.createElement('td');
        const tdfinish = document.createElement('td');
        var tdstatus = document.createElement('td');
        const tdchange = document.createElement('td');

        tr.classList.add('tr-tasks');
        tdinitial.innerText = `${formatData(t.initialDate)} às ${t.initialHour}`;
        tdfinish.innerText = `${formatData(t.finishDate)} às ${t.finishHour}`;
        tdtask.innerText = `${t.task}`;
        tdtask.setAttribute("data-bs-toggle", "modal");
        tdtask.setAttribute('data-bs-target', '#info-task-modal');
        tdtask.classList.add('td-task', 'p-2');
        tdtask.addEventListener('click', () => infoModal(t));
        tdstatus = taskStatus(t);

        const btnchange = document.createElement('button');
        btnchange.innerText = 'Alterar';
        btnchange.classList.add('btn', 'btn-warning', 'p-1', 'rounded');
        btnchange.setAttribute("data-bs-toggle", "modal");
        btnchange.setAttribute('data-bs-target', '#change-task-modal');
        btnchange.setAttribute('data-task', t.task);
        btnchange.id = `${t.task}`;
        btnchange.addEventListener('click', () => changeModal(t));

        tdchange.appendChild(btnchange);

        tr.appendChild(tdtask);
        tr.appendChild(tdinitial);
        tr.appendChild(tdfinish);
        tr.appendChild(tdstatus);
        tr.appendChild(tdchange);

        tbody.appendChild(tr);
    });
}

function infoModal(task) {
    document.querySelector('#title-modal').innerHTML = `${task.task}`;
    document.querySelector('#description-modal').innerHTML = `${task.description}`;
}

function changeModal(task) {
    document.querySelector('#nametask').value = task.task;
    document.querySelector('#di').value = task.initialDate;
    document.querySelector('#hi').value = task.initialHour;
    document.querySelector('#dt').value = task.finishDate;
    document.querySelector('#ht').value = task.finishHour;
    document.querySelector('#label-task').innerHTML = `Tarefa ${task.id}:`;
}

function formatData(date) {
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    var formatoData = new Intl.DateTimeFormat('pt-BR', options);

    var dataFormatada = formatoData.format(new Date(date));
    return dataFormatada;
}

function taskStatus(task) {
    const tdstatus = document.createElement('td');
    const status = {
        ATRASO: 'Em atraso',
        PENDENTE: 'Pendente',
        ANDAMENTO: 'Em andamento',
        REALIZADA: 'Realizada'
    }
    const start = new Date(`${task.initialDate}T${task.initialHour}:00`).getTime();
    const finish = new Date(`${task.finishDate}T${task.finishHour}:00`).getTime();
    const now = new Date().getTime();
    if (!task.status) {
        if (finish < now) {
            tdstatus.innerHTML = status.ATRASO;
            tdstatus.setAttribute("style", "color: red");
        }
        else if (start < now && now < finish) {
            tdstatus.innerHTML = status.ANDAMENTO;
            tdstatus.setAttribute("style", "color: blue");
        }
        else if (now < start) {
            tdstatus.innerHTML = status.PENDENTE;
            tdstatus.setAttribute("style", "color: yellow");
        }
    } else{
        tdstatus.innerHTML = status.REALIZADA;
        tdstatus.setAttribute("style", "color: green");
    }

    return tdstatus;
}

function checkDate(task) {
    const start = new Date(`${task.initialDate}T${task.initialHour}:00`).getTime();
    const finish = new Date(`${task.finishDate}T${task.finishHour}:00`).getTime();

    if (finish <= start) return false;
    else return true;
}

