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
        const tdstatus = document.createElement('td');
        const tdchange = document.createElement('td');
    
        tdinitial.innerText = `${t.initialDate} ${t.initialHour}`;
        tdfinish.innerText = `${t.finishDate} ${t.finishHour}`;
        tdtask.innerText = `${t.task}`;
        tr.appendChild(tdtask);
        tr.appendChild(tdinitial);
        tr.appendChild(tdfinish);
        tbody.appendChild(tr);
    });
}
