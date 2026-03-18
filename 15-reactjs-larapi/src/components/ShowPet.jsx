// View: Show Pet

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ShowPet = ({ pet, handleShowPet }) => {
    // useParams captura el ":id" que definimos en la ruta URL de App.jsx
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
            <main id="show_pet">
                <div className="loading-container">
                    <i className="ph ph-spinner-gap spinner-icon"></i>
                    <h2>Loading pet data...</h2>
                </div>
            </main>
        );
    }

    return (
        <main id="show_pet">
            <header>
                <img src="/imgs/title-show-pet.svg" alt="Show" />
            </header>
            <nav>
                <a href="javascript:;" className="btn-back" onClick={() => navigate('/pets')}>
                    <img src="/imgs/btn-back.svg" alt="Back" />
                </a>
            </nav>
            <section className="pet">
                <img src={`/imgs/${pet.image}`} alt={pet.name} />
                <hr className="divisor" />
                <div className="row"><div className="data"><h3>Name:</h3><h4>{pet.name}</h4></div></div>
                <hr className="divisor" />
                <div className="row"><div className="data"><h3>Kind:</h3><h4>{pet.kind}</h4></div></div>
                <hr className="divisor" />
                <div className="row"><div className="data"><h3>Weight:</h3><h4>{pet.weight} kls</h4></div></div>
                <hr className="divisor" />
                <div className="row"><div className="data"><h3>Age:</h3><h4>{pet.age} years</h4></div></div>
                <hr className="divisor" />
                <div className="row"><div className="data"><h3>Breed:</h3><h4>{pet.breed}</h4></div></div>
                <hr className="divisor" />
                <div className="row location-especial"><div className="data"><h3>Location:</h3><h4>{pet.location}</h4></div></div>
                <hr className="divisor" />
                <div className="row descripcion-especial"><div className="data"><h3>Description:</h3><h4>{pet.description}</h4></div></div>
                <hr className="divisor" />
                <div className="row"><div className="data"><h3>Active:</h3><h4>{pet.active == 1 ? "Active" : "Inactive"}</h4></div></div>
                <hr className="divisor" />
                <div className="row"><div className="data"><h3>Status:</h3><h4>{pet.status == 0 ? "No Adopted" : "Adopted"}</h4></div></div>
            </section>
        </main>
    );
};

export default ShowPet;