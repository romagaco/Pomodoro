# Pomodoro Timer con Vanilla JavaScript

Este proyecto es un temporizador Pomodoro básico desarrollado con **HTML**, **CSS** y **JavaScript (Vanilla)**. Implementa la técnica Pomodoro para gestionar tareas: 25 minutos de trabajo enfocados seguidos de un descanso de 5 minutos. Permite agregar tareas, iniciarlas y marcarlas como completadas automáticamente al finalizar el temporizador.


## Descripción
La aplicación muestra un temporizador en el centro de la pantalla con el nombre de la tarea actual. Abajo, hay un formulario para agregar nuevas tareas y una lista de tareas pendientes. Solo se puede iniciar una tarea a la vez; al completarla, se marca como "Done" y se inicia un descanso automático. Todo el comportamiento está implementado con JavaScript puro, sin dependencias externas.

## Características
- **Temporizador Pomodoro**: 25 minutos de trabajo por tarea.
- **Descanso automático**: 5 minutos después de cada tarea completada.
- **Gestión de tareas**: Agregar tareas vía formulario, lista dinámica y botón "Start" para iniciar.
- **Prevención de errores**: No se pueden agregar tareas durante un temporizador activo; solo una tarea en ejecución a la vez.
- **Interfaz simple**: Diseño responsivo con metaetiqueta `viewport`.
- **Marcado automático**: Tareas se marcan como completadas al finalizar el tiempo.


### Archivos Principales
- **`index.html`**: Contiene la estructura principal con un div para el temporizador (`#time`), formulario para tareas (`#form`) y contenedor de tareas (`#tasks`).
- **`styles.css`**: Define los estilos de la aplicación, como la disposición del temporizador y las tareas (agrega estilos personalizados si no existen).
- **`main.js`**: Implementa la lógica completa:
  - **Inicialización**: Renderiza tiempo inicial y tareas; maneja el formulario para agregar tareas.
  - **Renderizado**: `renderTasks()` genera la lista de tareas dinámicamente y asigna eventos a botones "Start".
  - **Temporizador**: `startButtonHandler()` inicia el Pomodoro; `timerHandler()` actualiza el tiempo y maneja el final.
  - **Descanso**: `startBreak()` y `timerBreakHandler()` gestionan el break de 5 minutos.
  - **Utilidades**: `createTask()`, `markCompleted()`, `renderTime()` para formateo y actualizaciones.

## Cómo Usar
1. **Agregar una tarea**: Escribe el nombre en el input y presiona "Agregar Tarea".
2. **Iniciar una tarea**: Haz clic en "Start" junto a la tarea deseada. El temporizador comienza en 25:00 y muestra el nombre de la tarea.
3. **Durante el Pomodoro**: El botón cambia a "In progress..." y se deshabilita agregar nuevas tareas.
4. **Al finalizar**: Se marca como "✅ Done", muestra "¡Tiempo terminado! A descansar." y inicia un break de 5:00.
5. **Fin del break**: El formulario se habilita de nuevo; selecciona la próxima tarea.

## Instalación
1. Clona o descarga este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/pomodoro-vanilla-js.git


