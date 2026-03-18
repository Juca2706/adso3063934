// View: Add Pet

import { useNavigate } from 'react-router-dom';

const AddPet = ({ onSave }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Toma todos los datos del formulario
        const formData = new FormData(e.target);
        // Convierte los datos a un objeto tipo JSON con una estructura (name =  valor)
        const data = Object.fromEntries(formData.entries());

        // Agregamos de forma manual al objeto con la imagen predeterminada para toda mascota
        data.image = "no-image.png";

        // Enviamos el objeto tipo JSON a App.jsx
        onSave(data);
    };

    return (
        <main id="add_pet">
            <header><img src="/imgs/title-add-pet.svg" alt="Add" /></header>
            <nav>
                <a href="javascript:;" className="btn-back" onClick={() => navigate('/pets')}>
                    <img src="/imgs/btn-back.svg" alt="Back" />
                </a>
            </nav>
            <form onSubmit={handleSubmit}>
                <label><span>Name:</span><input type="text" name="name" required /></label>
                <label><span>Kind:</span><input type="text" name="kind" required /></label>
                <label><span>Weight:</span><input type="number" name="weight" step="0.1" required /></label>
                <label><span>Age:</span><input type="number" name="age" required /></label>
                <label><span>Breed:</span><input type="text" name="breed" required /></label>
                <label><span>Location:</span><input type="text" name="location" required /></label>
                <label><span>Description:</span><textarea name="description"></textarea></label>

                <div className="actions">
                    <button type="submit" className="btn-save-add">
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

export default AddPet;