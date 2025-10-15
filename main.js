const tasks = [];

// Constantes de tiempo
const POMODORO_TIME = 25 * 60; // 25 minutos
const BREAK_TIME = 5 * 60;     // 5 minutos

let time = 0;
let timer = null;
let timerBreak = null;
let current = null; // ID de la tarea actualmente en ejecución

// Elementos del DOM
const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName");

// ===============================================
// 1. INICIALIZACIÓN Y EVENTOS DEL FORMULARIO
// ===============================================

// Llamadas iniciales para renderizar el tiempo y las tareas al cargar la página.
// Nota: 'renderTasks' también asigna los event listeners a los botones 'Start'.
renderTime();
renderTasks(); 

form.addEventListener("submit", e => {
    e.preventDefault();
    // Bloquea la adición si hay un temporizador activo
    if (timer || timerBreak) {
        alert("¡No puedes agregar más tareas mientras el Pomodoro está activo!");
        return; 
    }

    if (itTask.value.trim() !== "") { // Uso de trim() para evitar tareas de solo espacios
        createTask(itTask.value.trim());
        itTask.value = "";
        renderTasks();
    }
});

function createTask(value) {
    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false
    };
    tasks.unshift(newTask);
}

// ===============================================
// 2. LÓGICA DE RENDERIZADO (Tareas y Botones)
// ===============================================

function renderTasks() {
    const html = tasks.map(task => {
        // Lógica para deshabilitar botones de inicio mientras haya una tarea en ejecución
        const isCurrent = task.id === current;
        const isDisabled = (current !== null && !isCurrent) || task.completed;
        
        return `
        <div class="task">
            <div class="completed">
                ${task.completed 
                    ? `<span class="done">✅ Done</span>` 
                    : `<button 
                        class="start-btn" 
                        data-id="${task.id}" 
                        ${isDisabled ? 'disabled' : ''}>
                        ${isCurrent ? 'In progress...' : 'Start'}
                    </button>`
                }
            </div>
            <div class="title">${task.title}</div>
        </div>
        `;
    }).join("");

    const tasksContainer = document.querySelector("#tasks");
    tasksContainer.innerHTML = html;

    // Asignar eventos de click SOLAMENTE a los botones 'Start' que no estén deshabilitados
    document.querySelectorAll(".task .start-btn:not([disabled])").forEach((button) => {
        // Se utiliza una función anónima para evitar el conflicto de reasignar el evento
        button.onclick = () => {
            const id = button.getAttribute("data-id");
            startButtonHandler(id);
            // El texto 'In progress' se actualizará en la próxima llamada a renderTasks
        };
    });
}

// ===============================================
// 3. LÓGICA DEL TEMPORIZADOR
// ===============================================

function startButtonHandler(id) {
    if (timer) return; // Evita iniciar si ya hay un temporizador activo

    time = POMODORO_TIME;
    current = id;
    
    // Deshabilitar el formulario y el input al iniciar
    itTask.disabled = true;
    bAdd.disabled = true;

    const taskIndex = tasks.findIndex((task) => task.id === id);
    taskName.textContent = tasks[taskIndex].title;

    renderTime();
    renderTasks(); // Renderizar de nuevo para cambiar el texto del botón y deshabilitar otros.
    
    // 💡 CORRECCIÓN CRÍTICA: Cambié 'timeHandler' a 'timerHandler'
    timer = setInterval(() => {
        timerHandler(id); 
    }, 1000);
}

function timerHandler(id) {
    time--;
    renderTime();

    if (time === 0) {
        clearInterval(timer);
        timer = null;
        markCompleted(id);
        
        taskName.textContent = "¡Tiempo terminado! A descansar.";
        
        // El resto de la limpieza y el inicio del descanso se hacen después
        // de un pequeño delay para que el usuario vea el mensaje.
        setTimeout(startBreak, 1000);
    }
}

function renderTime() {
    const timeDiv = document.querySelector("#time #value");
    // Uso de Math.floor para asegurar que la división de minutos sea un entero
    const minutes = Math.floor(time / 60); 
    const seconds = Math.floor(time % 60);

    const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
    const secondsFormatted = seconds < 10 ? "0" + seconds : seconds;

    timeDiv.textContent = `${minutesFormatted}:${secondsFormatted}`;
}

function markCompleted(id) {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        current = null; // Importante limpiar el ID actual
        renderTasks(); // Renderizar para mostrar 'Done'
    }
}

// ===============================================
// 4. LÓGICA DEL DESCANSO (Break)
// ===============================================

function startBreak() {
    time = BREAK_TIME;
    taskName.textContent = "Break Time (5 mins)";
    renderTime();

    timerBreak = setInterval(() => {
        timerBreakHandler();
    }, 1000);
} 

function timerBreakHandler() {
    time--;
    renderTime();

    if (time === 0) {
        clearInterval(timerBreak);
        timerBreak = null;
        
        // Habilitar el formulario y el input al terminar el descanso
        itTask.disabled = false;
        bAdd.disabled = false;
        
        taskName.textContent = "Selecciona tu próxima tarea";
        renderTasks();
    }
}