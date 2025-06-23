let futbolistasData = [];

fetch('data/futbolistas.json')
    .then(res => res.json())
    .then(data => {
        futbolistasData = data;
        mostrarFutbolistas(futbolistasData);
    });

function mostrarFutbolistas(data) {
    const contenedor = document.getElementById('futbolistas');
    contenedor.innerHTML = '';
    data.forEach(jugador => {
        const card = document.createElement('div');
        card.classList.add('jugador');
        card.innerHTML = `
            <div class="jugador-inner">
                <div class="jugador-front">
                    <h3>${jugador.nombre}</h3>
                    <img src="${jugador.imagen}" alt="${jugador.nombre}">
                </div>
                <div class="jugador-back">
                    <p><strong>País:</strong> ${jugador.pais}</p>
                    <p><strong>Nacimiento:</strong> ${jugador.fecha_nacimiento}</p>
                    <p><strong>Posición:</strong> ${jugador.posicion}</p>
                    <p><strong>Dorsal:</strong> ${jugador.dorsal}</p>
                    <p><strong>Equipo icónico:</strong> ${jugador.equipo_iconico}</p>
                    <p><strong>Títulos ganados:</strong> ${jugador.titulos}</p>
                </div>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Buscador por nombre
document.getElementById('busqueda').addEventListener('input', e => {
    const texto = e.target.value.toLowerCase();
    const filtrados = futbolistasData.filter(j => j.nombre.toLowerCase().includes(texto));
    mostrarFutbolistas(filtrados);
});


// Selecccion por continente
document.getElementById('continente').addEventListener('change', e => {
    const continente = e.target.value;
    const filtrados = continente
        ? futbolistasData.filter(j => j.continente === continente)
        : futbolistasData;
    mostrarFutbolistas(filtrados);
});