document.addEventListener('DOMContentLoaded',function(){

    let cols = document.querySelectorAll('.tablero .col');

    cols.forEach((item)=>{
        item.style.height = window.innerHeight + 'px';
    })

    let pendientes = document.getElementById('pendiente');
    let curso = document.getElementById('curso');
    let completados = document.getElementById('completado');

    let eventos = [pendientes,curso,completados];

    eventos.forEach((boton) =>{

        boton.querySelector('.addTask').addEventListener('click', function(){

            let newTask = createTask();

            this.parentElement.querySelector('.tasksList').appendChild(newTask);
        });
    });



    function createTask(){

        let totalTasks = document.querySelectorAll('.tasksList > img').length;

        let taskContainer = document.createElement('div');
        taskContainer.setAttribute('class','taskContainer');

        let singleTask = document.createElement('img');     
        singleTask.setAttribute('id',`task${totalTasks}`);
        singleTask.setAttribute('src','img/img.png');
        singleTask.setAttribute('draggable','true');
        singleTask.setAttribute('ondragstart','drag(event)');

        taskContainer.appendChild(singleTask);

        return taskContainer;
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