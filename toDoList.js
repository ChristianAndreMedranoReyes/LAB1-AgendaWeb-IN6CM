document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("taskList");
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    const addTaskBtn = document.getElementById("addTaskBtn");

    let tasks = [];

    addTaskBtn.addEventListener("click", () => {
        const task = taskInput.value.trim();
        const priority = parseInt(priorityInput.value);

        if (task && !isNaN(priority) && priority > 0) {
            const newTask = {
                id: Date.now(),
                task: task,
                priority: priority
            };

            tasks.push(newTask);

            taskInput.value = "";
            priorityInput.value = "";

            tasks.sort((a, b) => a.priority - b.priority);
            renderTasks();
        } else {
            alert("Por favor, ingrese una tarea válida y una prioridad.");
        }
    });

    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.classList.add("list-group-item", "task");

            li.innerHTML = `
                <div>
                    <strong>${task.task}</strong> - Prioridad: ${task.priority}
                    <button class="btn btn-warning btn-sm float-end ml-2" onclick="editTask(${task.id})">Editar</button>
                    <button class="btn btn-danger btn-sm float-end" onclick="deleteTask(${task.id})">Eliminar</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    window.deleteTask = function (taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    };

    window.editTask = function (taskId) {
        const taskToEdit = tasks.find(task => task.id === taskId);
        
        if (taskToEdit) {
            const newTaskName = prompt("Edita la tarea:", taskToEdit.task);
            const newPriority = parseInt(prompt("Edita la prioridad:", taskToEdit.priority));

            if (newTaskName && !isNaN(newPriority) && newPriority > 0) {
                taskToEdit.task = newTaskName;
                taskToEdit.priority = newPriority;

                tasks.sort((a, b) => a.priority - b.priority);

                renderTasks();
            } else {
                alert("Por favor, ingrese una tarea válida y una prioridad.");
            }
        }
    };
});
