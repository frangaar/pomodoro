document.addEventListener('DOMContentLoaded',function(){

    let cols = document.querySelectorAll('.tablero .col');
    let colsTasks = document.querySelectorAll('.tablero .col .tasksList');
    let categories = document.querySelectorAll('.category .badge');
    
    let taskData = new Array();
    let categColor = '';

    // let columnsHeight = document.querySelectorAll('.tablero .col')[0];

    cols.forEach((item)=>{
        item.style.height = window.innerHeight + 'px';
    });
    
    colsTasks.forEach((item)=>{
        item.style.height = (window.innerHeight - 120) + 'px';
    });

    categories.forEach((item)=>{
        item.addEventListener('click',function(){
            taskData['cat'] = this.getAttribute('data-name');
            categColor = this.getAttribute('data-color');
        });
        
    });

    let pendientes = document.getElementById('save');
    let eventos = [pendientes];

    eventos.forEach((boton) =>{

        boton.addEventListener('click', function(){

            getFormData();

            let newTask = createTask();

            document.querySelector('#pendiente .tasksList').appendChild(newTask);
        });
    });


    function getFormData(){
        let title = document.getElementById('title').value;
        let description = document.getElementById('text').value;
        
        taskData['title'] = title;
        taskData['desc'] = description;
    }

    function createTask(){

        let totalTasks = document.querySelectorAll('.tasksList > div').length;

        let singleTask = document.createElement('div');
        
        (categColor != '') ? singleTask.setAttribute('class',`card mb-3 ${categColor}`) : singleTask.setAttribute('class','card mb-3 text-bg-secondary')
        
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
        
        let created = document.createElement('p');
        created.setAttribute('class','card-text');

        let currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'numeric',
            year: 'numeric',
          });
        created.innerText = 'Creation date: ' + formattedDate;


        body.appendChild(title);
        body.appendChild(desc);
        body.appendChild(created);
        singleTask.appendChild(body);


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