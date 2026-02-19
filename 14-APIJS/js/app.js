//  All Views (main)
const views = document.querySelectorAll("main")

// currentView
if (localStorage.getItem('currentView') != null) {
    let currentView = parseInt(localStorage.getItem("currentView")) // [0 - 4]
    showView()
} else {
    localStorage.setItem('currentView', 0)
    showView()
}

// Buttons & Anchors
const btnLogout = document.querySelector(".btn-logout")
const btnBacks = document.querySelectorAll(".btn-back")
const btnAdd = document.querySelector(".btn-add")
const btnEdits = document.querySelectorAll(".btn-edit")
// const btnSave = document.querySelector(".btn-save")
const btnCancels = document.querySelectorAll(".btn-cancel")
// const btnShows = document.querySelectorAll(".btn-show")

//  Login Form (POST)
const loginForm = document.querySelector("#loginForm")
loginForm.addEventListener("submit", async function (e) {
    e.preventDefault()
    try {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        const response = await fetch("http://127.0.0.1:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await response.json()
        if (response.ok) {
            // console.log(data.message)
            Swal.fire({
                title: "Congratulations!",
                text: data.message,
                icon: "success",
                showConfirmButton: false,
                timer: 2500,
            });
            localStorage.setItem("authToken", data.token)
            localStorage.setItem("currentView", 1)
            showView()
        } else {
            // console.error(data.message)
            Swal.fire({
                title: "Watch out!",
                text: data.message,
                icon: "error"
            });
        }
    } catch (error) {
        console.error(error.message)
    }
})

// View (Pet List)
const listContainer = document.querySelector(".list");
async function listPets() {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch("http://127.0.0.1:8000/api/pets/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}` // Importante: Enviamos el token
            }
        });

        const data = await response.json();

        if (response.ok) {
            // Limpiamos el contenedor antes de agregar las nuevas
            listContainer.innerHTML = "";

            // Recorremos el arreglo de mascotas que viene en data.pets (según tu captura de pantalla)
            data.pets.forEach(pet => {
                listContainer.innerHTML += `
                    <div class="row">
                        <img src="imgs/${pet.image}" alt="${pet.name}">
                        <div class="data">
                            <h3>${pet.name}</h3>
                            <h4>${pet.kind}</h4>
                        </div>
                        <nav class="actions">
                            <a href="javascript:;" class="btn-show" data-id="${pet.id}"></a>
                            <a href="javascript:;" class="btn-edit" data-id="${pet.id}"></a>
                            <a href="javascript:;" class="btn-delete" data-id="${pet.id}"></a>
                        </nav>
                    </div>
                `;
            });
        } else {
            console.error("Error al obtener mascotas:", data.message);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

// View (Show Pet)
const petDetailContainer = document.querySelector("#show_pet .pet");
async function showPetDetail(id) {
    const token = localStorage.getItem("authToken");

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            const pet = data.pet; // Suponiendo que la API devuelve { "pet": {...} }

            // Inyectamos los datos en el HTML de la vista show_pet
            petDetailContainer.innerHTML = `
                <img src="imgs/${pet.image}" alt="${pet.name}">
                <hr class="divisor">
                <div class="row"><div class="data"><h3>Name:</h3><h4>${pet.name}</h4></div></div>
                <hr class="divisor">
                <div class="row"><div class="data"><h3>Kind:</h3><h4>${pet.kind}</h4></div></div>
                <hr class="divisor">
                <div class="row"><div class="data"><h3>Weight:</h3><h4>${pet.weight} kls</h4></div></div>
                <hr class="divisor">
                <div class="row"><div class="data"><h3>Age:</h3><h4>${pet.age} years</h4></div></div>
                <hr class="divisor">
                <div class="row"><div class="data"><h3>Breed:</h3><h4>${pet.breed}</h4></div></div>
                <hr class="divisor">
                <div class="row location-especial"><div class="data"><h3>Location:</h3><h4>${pet.location}</h4></div></div>
                <hr class="divisor">
                <div class="row descripcion-especial"><div class="data"><h3>Description:</h3><h4>${pet.description}</h4></div></div>
                <hr class="divisor">
                <div class="row"><div class="data"><h3>Active:</h3><h4>${pet.active == 1 ? "Active" : "Inactive"}</h4></div></div>
                <hr class="divisor">
                <div class="row"><div class="data"><h3>Status:</h3><h4>${pet.status == 0 ? "No Adopted" : "Adopted"}</h4></div></div>
            `;
        }
    } catch (error) {
        console.error("Error al cargar detalle:", error);
    }
}

// View (Add Pet)
const btnSaveAdd = document.querySelector(".btn-save-add");
const addPetForm = document.querySelector("#add_pet form");
btnSaveAdd.addEventListener("click", async () => {
    const token = localStorage.getItem("authToken");

    // 1. Capturamos los datos del formulario
    const formData = new FormData(addPetForm);
    // Convertimos los datos a un objeto simple { name: "valor", kind: "valor"... }
    const dataToSend = Object.fromEntries(formData.entries());

    // Validación simple: verificar que el nombre no esté vacío
    if (!dataToSend.name) {
        Swal.fire("Error", "Please enter at least the pet's name", "error");
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:8000/api/pets/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataToSend)
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                title: "Success!",
                text: "Pet added correctly",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            addPetForm.reset(); // Limpia los campos del formulario
            localStorage.setItem('currentView', 1); // Indicamos que vamos a la lista
            showView(); // Cambiamos la vista
        } else {
            Swal.fire("Error", result.message || "Could not save the pet", "error");
        }
    } catch (error) {
        console.error("Connection error:", error);
        Swal.fire("Error", "Server connection failed", "error");
    }
});

// View (Edit Pet)
const btnSaveEdit = document.querySelector(".btn-save-edit");
const editPetForm = document.querySelector("#edit_pet form");
async function loadPetDataToEdit(id) {
    const token = localStorage.getItem("authToken");
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
        });
        const data = await response.json();
        if (response.ok) {
            const pet = data.pet;
            // Llenamos cada campo del formulario de edición
            editPetForm.name.value = pet.name;
            editPetForm.kind.value = pet.kind;
            editPetForm.weight.value = pet.weight;
            editPetForm.age.value = pet.age;
            editPetForm.breed.value = pet.breed;
            editPetForm.location.value = pet.location;
            editPetForm.description.value = pet.description;
        }
    } catch (error) {
        console.error("Error loading pet data:", error);
    }
}

btnSaveEdit.addEventListener("click", async () => {
    const token = localStorage.getItem("authToken");
    const id = localStorage.getItem("editPetId"); // Recuperamos el ID que guardamos antes

    const formData = new FormData(editPetForm);
    const dataToSend = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/pets/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dataToSend)
        });

        if (response.ok) {
            Swal.fire({
                title: "Updated!",
                text: "The pet information has been updated.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            localStorage.setItem('currentView', 1); // Regresamos a la lista
            showView();
        } else {
            const result = await response.json();
            Swal.fire("Error", result.message || "Update failed", "error");
        }
    } catch (error) {
        console.error("Connection error:", error);
        Swal.fire("Error", "Server connection failed", "error");
    }
});

// View (Delete Pet)
async function deletePet(id) {
    const token = localStorage.getItem("authToken");

    // Preguntar al usuario antes de borrar
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/pets/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                Swal.fire("Deleted!", "The pet has been removed.", "success");
                listPets(); // Recargamos la lista para que desaparezca la fila
            } else {
                Swal.fire("Error", "Could not delete the pet", "error");
            }
        } catch (error) {
            console.error("Connection error:", error);
            Swal.fire("Error", "Server connection failed", "error");
        }
    }
}

// Events Delegation Block
if (listContainer) {
    listContainer.addEventListener("click", (e) => {
        // Buscamos si el click fue en un botón usando 'closest' por si haces click en un icono dentro del link
        const btnDelete = e.target.closest(".btn-delete");
        const btnEdit = e.target.closest(".btn-edit");
        const btnShow = e.target.closest(".btn-show");

        if (btnDelete) {
            const id = btnDelete.getAttribute("data-id");
            deletePet(id);
        }

        if (btnEdit) {
            const id = btnEdit.getAttribute("data-id");
            // Guardamos el ID en localStorage para saber a quién estamos editando luego
            localStorage.setItem('editPetId', id);

            // Llamamos a una función para llenar el formulario
            loadPetDataToEdit(id);

            localStorage.setItem('currentView', 3);
            showView();
        }

        if (btnShow) {
            const id = btnShow.getAttribute("data-id");

            // Guardamos el id de la última mascota vista para recargar después
            localStorage.setItem('lastPetId', id);
            showPetDetail(id);

            // 2. Luego cambiamos de vista
            localStorage.setItem('currentView', 4);
            showView();
        }
    });
}

// btnLogin.addEventListener("click", () => {
//     currentView = 1
//     showView()
// })

btnLogout.addEventListener("click", () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('lastPetId');
    localStorage.removeItem('editPetId');
    localStorage.setItem('currentView', 0);
    showView();
})

btnAdd.addEventListener("click", () => {
    localStorage.setItem('currentView', 2)
    showView()
})

btnBacks.forEach(element => {
    element.addEventListener('click', () => {
        localStorage.setItem('currentView', 1)
        showView()
    })
})

// btnShows.forEach(element => {
//     element.addEventListener('click', () => {
//         localStorage.setItem('currentView', 4)
//         showView()
//     })
// })

// btnEdits.forEach(element => {
//     element.addEventListener('click', () => {
//         localStorage.setItem('currentView', 3)
//         showView()
//     })
// })

btnCancels.forEach(element => {
    element.addEventListener('click', () => {
        localStorage.setItem('currentView', 1)
        showView()
    })
})

function showView() {
    const current = localStorage.getItem('currentView');

    views.forEach(element => {
        element.classList.remove("animateView")
        element.style.display = "none"
    })

    // Si la vista actual es la 1 (Pet List), cargamos los datos de la API
    if (current == 1) {
        listPets();
    }

    if (current == 3) {
        const editId = localStorage.getItem('editPetId');
        loadPetDataToEdit(editId);
    }

    // Si la vista actual es la 4 (Detalle), intentar cargar la última mascota seleccionada
    if (current == 4) {
        const lastId = localStorage.getItem('lastPetId');
        if (lastId) {
            showPetDetail(lastId);
        }
    }

    views[current].classList.add('animateView')
    views[current].style.display = "block"
}

