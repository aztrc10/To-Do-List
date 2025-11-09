const form = document.querySelector('.form');
const btn = document.querySelector('.btn');
const tareas = document.querySelector(".tareas-display");

btn.addEventListener('click', mostrar);


const tareasLista = [];
function mostrar(e) {
    e.preventDefault();
    const input = document.querySelector('#task');
    const valor = input.value;
    if (valor.trim() != "") {

        // Aqui creamos e insertamos en el HTML
        var nuevaTarea = document.createElement('li');
        nuevaTarea.classList.add("task");
        const idTarea = crypto.randomUUID();
        nuevaTarea.dataset.uid = idTarea;
    
        // Checkbox primero
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.id = 'miCheck';
        check.checked = false;   
        nuevaTarea.appendChild(check); 

        check.addEventListener('change', (e)=> {
            e.stopPropagation();
            CompletarTarea(check)
        })


        // Texto de la tarea 
        const texto = document.createElement('span');
        texto.textContent = valor;
        nuevaTarea.appendChild(texto);


        // Icono 
        const icono = document.createElement('span');
        icono.classList.add('material-symbols-outlined');
        icono.textContent = 'close'; 
        nuevaTarea.appendChild(icono);

        // Evento para eliminar tarea
        icono.addEventListener('click', () => EliminarTarea(icono));

        tareacompleta = {
          task: valor,
          id: idTarea,
        }
        // Agregar a la lista
        tareas.appendChild(nuevaTarea);
        tareasLista.push(tareacompleta);
        const todas = [...tareasLista];
        console.log(todas); 
        
        guardarLocalStorage();


    } else {
        alert("llene los campos");
    }

    form.reset();
}


function EliminarTarea(icono) {
    const tarea = icono.parentElement;
    const uid = tarea.dataset.uid;
    tarea.classList.add('tachar');
    
    setTimeout(() => {
        tarea.remove();
        const tareasFiltradas = tareasLista.filter(task => task.id !== uid);
        tareasLista.splice(0, tareasLista.length, ...tareasFiltradas);
        guardarLocalStorage();
        console.log(tareasLista)
    }, 1000);
}

function CompletarTarea(check) {
  const tarea = check.nextElementSibling;
  if (check.checked) {
    tarea.style.textDecoration = 'line-through';
    tarea.style.opacity = '0.6';
  } else {
    tarea.style.textDecoration = 'none';
    tarea.style.opacity = '1';
  }
}

// Local storage
function guardarLocalStorage() {
  localStorage.setItem('tareas', JSON.stringify(tareasLista));
}

window.addEventListener('DOMContentLoaded', () => {
  const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];
  tareasGuardadas.forEach(t => {
    
    const nuevaTarea = document.createElement('li');
    nuevaTarea.classList.add("task");
    nuevaTarea.dataset.uid = t.id;

    const check = document.createElement('input');
    check.type = 'checkbox';
    nuevaTarea.appendChild(check);

    const texto = document.createElement('span');
    texto.textContent = t.task;
    nuevaTarea.appendChild(texto);

    const icono = document.createElement('span');
    icono.classList.add('material-symbols-outlined');
    icono.textContent = 'close';
    nuevaTarea.appendChild(icono);

    icono.addEventListener('click', () => EliminarTarea(icono));
    check.addEventListener('change', (e) => {
      e.stopPropagation();
      CompletarTarea(check);
    });

    tareas.appendChild(nuevaTarea);
    tareasLista.push(t);
  });
});