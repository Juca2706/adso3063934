// View: Edit Pet

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const EditPet = ({ pet, onUpdate, handleShowPet }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!pet && id) {
            handleShowPet(id, window.location.pathname);
        }
        // Si quieres, al cerrar el componente podrías limpiar el selectedPet si fuera necesario
    }, [pet, id, handleShowPet]);

    if (!pet) {
        return (
            <main id="edit_pet">
                <div className="loading-container">
                    <i className="ph ph-spinner-gap spinner-icon"></i>
                    <h2>Loading pet data...</h2>
                </div>
            </main>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Toma los datos del formulario
        const formData = new FormData(e.target);
        // Convierte los datos a un objeto tipo JSON
        const data = Object.fromEntries(formData.entries());

        // Enviamos el ID y los datos para cambiarlos en el correpondiente registro. 
        onUpdate(pet.id, data);
    };

    return (
        <main id="edit_pet">
            <header>
                <img src="/imgs/title-edit-pet.svg" alt="Edit" />
            </header>

            <nav>
                <a href="javascript:;" className="btn-back" onClick={() => navigate('/pets')}>
                    <img src="/imgs/btn-back.svg" alt="Back" />
                </a>
            </nav>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <span>Name:</span>
                    <input type="text" name="name" defaultValue={pet?.name} required />
                </label>
                <label htmlFor="kind">
                    <span>Kind:</span>
                    <input type="text" name="kind" defaultValue={pet?.kind} required />
                </label>
                <label htmlFor="weight">
                    <span>Weight:</span>
                    <input type="number" name="weight" step="0.1" defaultValue={pet?.weight} required />
                </label>
                <label htmlFor="age">
                    <span>Age:</span>
                    <input type="number" name="age" defaultValue={pet?.age} required />
                </label>
                <label htmlFor="breed">
                    <span>Breed:</span>
                    <input type="text" name="breed" defaultValue={pet?.breed} required />
                </label>
                <label htmlFor="location">
                    <span>Location:</span>
                    <input type="text" name="location" defaultValue={pet?.location} required />
                </label>
                <label htmlFor="description">
                    <span>Description:</span>
                    <textarea name="description" defaultValue={pet?.description}></textarea>
                </label>

                <div className="actions">
                    <button type="submit" className="btn-save-edit">
                        <i className="ph ph-floppy-disk-back"></i> Save
                    </button>
                    <a href="javascript:;" className="btn-cancel" onClick={() => navigate('/pets')}>
                        <i className="ph ph-x-circle"></i> Cancel
                    </a>
                </div>
            </form>
        </main>
    );
};

export default EditPet;