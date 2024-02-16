document.addEventListener('DOMContentLoaded',function(){

    let cols = document.querySelectorAll('.tablero .col');
    let colsTasks = document.querySelectorAll('.tablero .col .tasksList');
    let categories = document.querySelectorAll('.category .badge');
    let pomodoroTimers = document.querySelectorAll('.pomodoro .col');
    
    var taskRoundFinished = false;
    var shortRestingTimeCounter = 0;
    let taskData = new Array();
    let categColor = '';


    pomodoroTimers.forEach((item)=>{
        item.style.height = (window.innerHeight/pomodoroTimers.length) + 'px';
        item.addEventListener('click', function(ev){

            if(ev.currentTarget.id == 'longTimer'){
                if(shortRestingTimeCounter == 4){
                    startTime(ev,item);
                }                
            }else if(ev.currentTarget.id == 'shortTimer'){
                if(taskRoundFinished){
                    startTime(ev,item);
                }                
            }else{
                if(!taskRoundFinished){
                    startTime(ev,item);
                }
            }
        });
    });

    function startTime(ev,item){

        if(!item.classList.contains('running')){
            item.classList.add('running');
            let min = ev.currentTarget.getAttribute('data-time');
            let sec = '00';
            item.querySelector('.timer span').innerText = min + ':' + sec
            let intervalID = setInterval(function(){
                let time = item.querySelector('.timer span').innerText;
                splitTime = time.split(':');
                let min = parseInt(splitTime[0]);
                let sec = parseInt(splitTime[1]);
                increaseTimer(min,sec,item,intervalID);
            },1000);
        }
    }


    function increaseTimer(min,sec,timer,intervalID){

        if(min == 0 && sec == 0){
            clearInterval(intervalID);
            min = '00';
            sec = '00';
            timer.classList.remove('running');
            if(timer.getAttribute('id') == 'normalTimer'){
                taskRoundFinished = true;
            }else if(timer.getAttribute('id') == 'shortTimer'){
                shortRestingTimeCounter++;
                taskRoundFinished = false;
            }else if(timer.getAttribute('id') == 'longTimer'){
                taskRoundFinished = false;
                shortRestingTimeCounter = 0;
            }
            // alert(timer.getAttribute('id') + ' completado')
            document.getElementById("myModal").style.display = "block";
        }else{
            if(sec >= 0){
                sec -= 1;
    
                if(sec >= 0 && sec < 10){
                    sec = '0' + sec;
                }
            }
            
            if(sec < 0){
                min -= 1;
                sec = 59
            }

            if(min >= 0 && min < 10){
                min = '0' + min;
            }
        }
     
        timer.querySelector('.timer span').innerText = min + ':' + sec;
    }

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

            checkCategoriesSelected(item);

            if(this.classList.contains('selected')){
                this.classList.remove('selected');
            }else{
                this.classList.add('selected');
            }
            
        });
        
    });

    function checkCategoriesSelected(current){
        categories.forEach((item)=>{

            if(item != current){
                if(item.classList.contains('selected')){
                    item.classList.remove('selected');
                } 
            }
                               
        });
    }

    function emptyTaskForm(){
        document.getElementById('title').value = '';
        document.getElementById('text').value = '';
        checkCategoriesSelected(null);
    }
    
    

    let pendientes = document.getElementById('save');
    let eventos = [pendientes];

    eventos.forEach((boton) =>{

        boton.addEventListener('click', function(){

            getFormData();

            let newTask = createTask();

            document.querySelector('#pendiente .tasksList').appendChild(newTask);

            emptyTaskForm();
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

        let close = document.createElement('i');
        close.setAttribute('class','fa fa-trash');
        close.style.color = ' #ff1414';

        close.addEventListener('click',function(ev){

            ev.currentTarget.parentNode.parentNode.remove();
        });

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
            hour: 'numeric',
            minute: 'numeric'
          });
        created.innerText = 'Creation date: ' + formattedDate;


        body.append(close);
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

    if(ev.target.classList.contains('tasksList')){
        let task = document.getElementById(data)
        ev.target.appendChild(task);

        if(ev.target.parentNode.id == 'completado') task.removeAttribute('draggable');
        if(ev.target.parentNode.id == 'completado') task.removeAttribute('ondragstart');
    }
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}