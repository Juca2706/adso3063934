// View: Pet List

import { useEffect } from 'react';

const PetList = ({ pets, onAdd, onLogout, onShowPet, onEditPet, onDeletePet, handleListPets }) => {

    // Usamos useEffect para que, apenas el componente se monte en el DOM, 
    // se dispare la petición a la API y la lista no aparezca vacía.
    useEffect(() => {
        handleListPets();
    }, []); // El array vacío [] asegura que solo se ejecute una vez al cargar

    return (
        <main id="pet_list">
            <header>
                <img src="/imgs/title-pet-list.png" alt="Pet List" />
            </header>
            <nav>
                <button className="btn-add" onClick={onAdd}>
                    <img src="/imgs/btn-add.svg" alt="Add" />
                </button>
                <button className="btn-logout" onClick={onLogout}>
                    <img src="/imgs/btn-logout.svg" alt="Logout" />
                </button>
            </nav>
            <section className="list">
                {pets.length > 0 ? (
                    pets.map((pet) => (
                        <div className="row" key={pet.id}>
                            <img src={`/imgs/${pet.image}`} alt={pet.name} />
                            <div className="data">
                                <h3>{pet.name}</h3>
                                <h4>{pet.kind}</h4>
                            </div>
                            <nav className="actions">
                                {/* Botones de acción vinculados a las funciones de navegación de App.jsx */}
                                <button className="btn-show" onClick={() => onShowPet(pet.id)}></button>
                                <button className="btn-edit" onClick={() => onEditPet(pet.id)}></button>
                                <button className="btn-delete" onClick={() => onDeletePet(pet.id)}></button>
                            </nav>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', marginTop: '20px' }}>No pets found...</p>
                )}
            </section>
        </main>
    );
};

export default PetList;