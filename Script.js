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
        nuevaTarea.dataset.uid = crypto.randomUUID();

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

        // Agregar a la lista
        tareas.appendChild(nuevaTarea);
        tareasLista.push(nuevaTarea);
        const todas = [...tareasLista];
        console.log(todas); 
        console.log(icono);

    } else {
        alert("llene los campos");
    }

    form.reset();
}


function EliminarTarea(icono) {
    const tarea = icono.parentElement;
    const uid = icono.parentElement.dataset.uid;
    tarea.classList.add('tachar');
    
    setTimeout(() => {
        tarea.remove();
        const TareasFiltradas = tareasLista.filter(i => i.dataset.uid != uid)
        tareasLista.splice(0, tareasLista.length, ...TareasFiltradas);
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


