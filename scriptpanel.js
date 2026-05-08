 let tareas = [];

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnAgregar").addEventListener("click", agregarTarea);
    document.getElementById("tareaInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") agregarTarea();
    });
    actualizarContador();
});

function agregarTarea() {
    let texto = document.getElementById("tareaInput").value;
    let categoria = document.getElementById("categoriaTarea").value;
    let prioridad = document.getElementById("prioridadTarea").value;

    if (texto.trim() === "") {
        alert("Debe escribir una tarea Lina");
        return;
    }

    let fecha = new Date();
    let fechaTexto = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

    tareas.push({
        id: Date.now(),
        texto: texto,
        categoria: categoria,
        prioridad: prioridad,
        fecha: fechaTexto,
        completada: false
    });

    mostrarTareas();
    actualizarContador();
    document.getElementById("tareaInput").value = "";
}

function mostrarTareas() {
    let lista = document.getElementById("listaTareas");
    lista.innerHTML = "";

    for (let i = 0; i < tareas.length; i++) {
        let t = tareas[i];
        let claseCompletada = t.completada? 'completada' : '';

        lista.innerHTML += `
            <li class="${claseCompletada} ${t.prioridad}">
                <div>
                    <span class="badge categoria">${t.categoria}</span>
                    <span class="badge prioridad-${t.prioridad}">${t.prioridad}</span>
                    <span class="texto-tarea">${t.texto}</span>
                    <br><span class="fecha">📅 ${t.fecha}</span>
                </div>
                <div>
                    <button onclick="completarTarea(${i})">✓</button>
                    <button onclick="eliminarTarea(${i})">X</button>
                </div>
            </li>
        `;
    }
}

function completarTarea(indice) {
    tareas[indice].completada =!tareas[indice].completada;
    mostrarTareas();
    actualizarContador();
}

function eliminarTarea(indice) {
    tareas.splice(indice, 1);
    mostrarTareas();
    actualizarContador();
}

function actualizarContador() {
    let total = tareas.length;
    let completadas = tareas.filter(t => t.completada).length;
    let pendientes = total - completadas;

    if(document.getElementById("totalTareas")) document.getElementById("totalTareas").textContent = total;
    if(document.getElementById("completadas")) document.getElementById("completadas").textContent = completadas;
    if(document.getElementById("pendientes")) document.getElementById("pendientes").textContent = pendientes;
}