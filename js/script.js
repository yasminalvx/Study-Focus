//Data e hora atual
function time_now() { 
    let time = new Date();

    let day = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();

    let hour = time.getHours();
    let min = time.getMinutes();

    let str_month = "";
    let str_min = "";

    if (month < 10) {
        str_month += '0' + month;
    } else {
        str_month += month;
    }

    if (min < 10) {
        str_min += '0' + min;
    } else {
        str_min += min;
    }

    str_time = day + "/" + str_month + "/" + year + "\t" + hour + ":" + str_min;

    document.getElementsByTagName("h3")[0].innerHTML = str_time;
}

//Atualizar data e hora em tempo real
setInterval(time_now, 1000); 

//Selecionar tempo inicial do temporizador
function time_start_change(time_start) {
    document.getElementById("timer").innerHTML = time_start + ":00";
}

//Funcionamento do temporizador pomodoro
function timer() {
    let time_initial = document.getElementById("timer").innerText;
    var time_total = time_initial.split(':')[0] * 60;

    let second = setInterval(() => {
        let min = Math.floor(time_total / 60);
        let seg = time_total % 60;

        str_seg = "";

        if (seg < 10) {
            str_seg += '0' + seg;
        } else {
            str_seg += seg;
        }

        time_total -= 1;

        if (min == 0 && seg == 0) {
            stop();
        }

        document.getElementById("timer").innerText = min + ":" + str_seg;
        
    }, 1000);

    function stop(){
        clearInterval(second);
    }
}

//Adicionar Nova Tarefa
function add_task() {
    let li = document.createElement("li");
    let input_value = document.getElementById("task").value;
    let t = document.createTextNode(input_value);
    li.appendChild(t);

    let del = document.createElement("button");
    del.innerHTML = "x";
    del.onclick = delete_task;
    li.appendChild(del);


    if (input_value === '') {
        alert("Tarefa vazia");
    } else {
        document.getElementById("tasks").appendChild(li);
        add_localStorage(input_value);
    }
    document.getElementById("task").value = "";
}

//Adicionar Tarefa no localStorage
function add_localStorage(text){
    let key = document.getElementById("tasks").children.length;
    localStorage.setItem(key, text);
}

//Deletar Tarefa
function delete_task(){
    this.parentElement.remove();

    //Deletar do localStorage

    let task = this.parentElement.innerText;

    //remover x do botão
    let str_task = "";
    for (i = 0; i < task.length-1; i++) { 
        str_task += task[i];
    }

    let key = find_key(str_task);
    let size = localStorage.length; 

    localStorage.removeItem(key);

    //reposicionar tarefas
    for (let i = key; i < size; i++) {
        let next = localStorage.getItem(i+1);
        localStorage.setItem(i, next);
    }
    localStorage.removeItem(size);
}

//Achar chave da tarefa
function find_key(key_value) {
    let size = localStorage.length;

    for (let i = 1; i <= size; i++) {
        if(key_value == localStorage.getItem(i)) {
            return i;
        }
    }
}

//Atualizar lista de tarefas recuperando do localStorage
function list_update(){
    let size = localStorage.length;

    for (let i = 1; i <= size; i++) {
        let li = document.createElement("li");
        let input_value = localStorage.getItem(i);
        let t = document.createTextNode(input_value);
        li.appendChild(t);

        let del = document.createElement("button");
        
        del.innerHTML = "x";
        del.onclick = delete_task;
        li.appendChild(del);
        
        document.getElementById("tasks").appendChild(li);
    }  
}