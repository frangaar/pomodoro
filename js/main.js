document.addEventListener('DOMContentLoaded',function(){

    let cols = document.querySelectorAll('.tablero .col');
    let colsTasks = document.querySelectorAll('.tablero .col .tasksList');
    
    let taskData = new Array();

    // let columnsHeight = document.querySelectorAll('.tablero .col')[0];

    cols.forEach((item)=>{
        item.style.height = window.innerHeight + 'px';
    });
    
    colsTasks.forEach((item)=>{
        item.style.height = (window.innerHeight - 120) + 'px';
    });

    let pendientes = document.getElementById('save');
    // let curso = document.getElementById('curso');
    // let completados = document.getElementById('completado');

    let eventos = [pendientes];

    eventos.forEach((boton) =>{

        boton.addEventListener('click', function(){

            getFormData();

            let newTask = createTask();

            document.querySelector('#pendiente .tasksList').appendChild(newTask);
        });
    });

    let saveTask = document.getElementById('save');

    saveTask.addEventListener('click',function(){

        
    });

    function getFormData(){
        let title = document.getElementById('title').value;
        let description = document.getElementById('text').value;
        
        taskData['title'] = title;
        taskData['desc'] = description;
        // taskData['category'] = cat;
    }

    function createTask(){

        let totalTasks = document.querySelectorAll('.tasksList > div').length;

        // let taskContainer = document.createElement('div');
        // taskContainer.setAttribute('class','taskContainer');
        // taskContainer.setAttribute('id',`task${totalTasks}`);
        // taskContainer.setAttribute('draggable','true');
        // taskContainer.setAttribute('ondragstart','drag(event)');

        let singleTask = document.createElement('div');
        singleTask.setAttribute('class','card mb-3');
        singleTask.setAttribute('id',`task${totalTasks}`);
        singleTask.setAttribute('draggable','true');
        singleTask.setAttribute('ondragstart','drag(event)');

        let body = document.createElement('div');
        body.setAttribute('class','card-body');
        let title = document.createElement('h5');
        title.setAttribute('class','card-title')
        title.innerText = 'Title: ' + taskData['title'];
        let desc = document.createElement('p');
        desc.setAttribute('class','card-text')
        desc.innerText = 'Description: ' + taskData['desc'];

        body.appendChild(title);
        body.appendChild(desc);
        singleTask.appendChild(body);

        // let singleTask = document.createElement('img');     
        // singleTask.setAttribute('src','img/img.png');
        

        // taskContainer.appendChild(singleTask);

        return singleTask;
    }
});


function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("task", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("task");
    ev.target.appendChild(document.getElementById(data));
  }