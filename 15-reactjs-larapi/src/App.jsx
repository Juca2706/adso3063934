import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';
import Swal from 'sweetalert2';
import api from './api/axios';

// Importación de componentes
import Login from './components/Login';
import PetList from './components/PetList';
import AddPet from './components/AddPet';
import EditPet from './components/EditPet';
import ShowPet from './components/ShowPet';

// Protector de Rutas
const ProtectedRoute = ({ token, children }) => {
  useEffect(() => {
    // Solo lanzamos el error si el token NO existe 
    // Y si no venimos de una acción de "Logout" intencional
    const isLogout = localStorage.getItem('logout');

    if (!token && !isLogout) {
      Swal.fire({
        title: "¡Access denied!",
        text: "There is no authorization token.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }

    // Limpiamos la bandera después de usarla
    localStorage.removeItem('logout');
  }, [token]);

  if (!token) {
    // Si no hay token, redirigimos al inicio
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    if (token) {
      handleListPets(); // Carga los datos apenas la app arranca si ya hay token
    }
  }, []);

  // FUNCIONES (Larapi)

  // Obtener lista de mascotas (View: List Pets)
  const handleListPets = async () => {
    try {
      const response = await api.get('/pets/list');
      setPets(response.data.pets.reverse());
    } catch (error) {
      console.error("Error al listar:", error);
    }
  };

  // Manejar el inicio de sesión (View: Login)
  const handleLogin = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      const data = response.data;

      Swal.fire({
        title: "Congratulations!",
        text: data.message,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });

      localStorage.setItem("authToken", data.token);
      setToken(data.token);
      navigate('/pets');
    } catch (error) {
      const message = error.response?.data?.message || "Server connection failed";

      Swal.fire({
        title: "Watch out!",
        text: message,
        icon: "error",
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  // Cerrar sesión (Logout)
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to log out of the system",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1ab192",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      localStorage.setItem('logout', 'true');
      localStorage.removeItem('authToken');
      setToken(null);
      Swal.fire({
        title: "Closed!",
        text: "Logged out successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      navigate('/');
    }
  };

  // Obtener una mascota específica (View: Show Pet)
  const handleShowPet = async (id, targetPath) => {
    try {
      const response = await api.get(`/pets/show/${id}`);
      setSelectedPet(response.data.pet);
      navigate(targetPath);
    } catch (error) {
      console.error("Error al obtener datos:", error);

      // 1. Limpiamos cualquier rastro de la mascota seleccionada
      setSelectedPet(null);

      // 2. Navegamos PRIMERO a la lista
      navigate('/pets', { replace: true });

      // 3. Usamos un pequeño delay (setTimeout) para que el alert 
      // se dispare cuando la lista ya esté montada. 
      // Esto evita que React se confunda y lo lance dos veces.
      setTimeout(() => {
        Swal.fire({
          title: "Watch out!",
          text: "The pet you are looking for does not exist",
          icon: "error",
          timer: 2000,
          showConfirmButton: false
        });
      }, 100); // 100 milisegundos son suficientes
    }
  };

  // Eliminar mascota (Delete Pet)
  const handleDeletePet = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/pets/delete/${id}`);
        Swal.fire({ title: "Deleted!", text: "The pet has been removed.", icon: "success", timer: 2000, showConfirmButton: false });
        handleListPets();
      } catch (error) {
        Swal.fire("Error", "Could not delete the pet", "error");
      }
    }
  };

  // Adicionar nueva mascota (View: Add Pet)
  const handleSavePet = async (dataToSend) => {
    try {
      await api.post('/pets/store', dataToSend);
      Swal.fire({ title: "Success!", text: "Pet added correctly", icon: "success", timer: 2000, showConfirmButton: false });
      handleListPets();
      navigate('/pets');
    } catch (error) {
      Swal.fire("Error", "Could not save", "error");
    }
  };

  // Actualizar mascota existente (View: Edit Pet)
  const handleUpdatePet = async (id, dataToSend) => {
    try {
      await api.put(`/pets/edit/${id}`, dataToSend);
      Swal.fire({ title: "Updated!", text: "Information updated.", icon: "success", timer: 2000, showConfirmButton: false });
      handleListPets();
      navigate('/pets');
    } catch (error) {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  // SISTEMA DE RUTAS (Larapi)
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login onLogin={handleLogin} />} />

      {/* Pet List */}
      <Route
        path="/pets"
        element={
          <ProtectedRoute token={token}>
            <PetList
              pets={pets}
              onAdd={() => navigate('/pets/add')}
              onLogout={handleLogout}
              onShowPet={(id) => handleShowPet(id, `/pets/show/${id}`)}
              onEditPet={(id) => handleShowPet(id, `/pets/edit/${id}`)}
              onDeletePet={handleDeletePet}
              handleListPets={handleListPets}
            />
          </ProtectedRoute>
        }
      />

      {/* Add Pet */}
      <Route
        path="/pets/add"
        element={
          <ProtectedRoute token={token}>
            <AddPet onBack={() => navigate('/pets')} onSave={handleSavePet} />
          </ProtectedRoute>
        }
      />

      {/* Show Pet */}
      <Route
        path="/pets/show/:id"
        element={
          <ProtectedRoute token={token}>
            <ShowPet
              pet={selectedPet}
              handleShowPet={handleShowPet}
            />
          </ProtectedRoute>
        }
      />

      {/* Edit Pet */}
      <Route
        path="/pets/edit/:id"
        element={
          <ProtectedRoute token={token}>
            <EditPet
              pet={selectedPet}
              onUpdate={handleUpdatePet}
              handleShowPet={handleShowPet}
            />
          </ProtectedRoute>
        }
      />

      {/* Redirección por defecto en caso de algun fallo en las rutas */}
      <Route path="*" element={<Navigate to={token ? "/pets" : "/"} />} />
    </Routes>
  );
}

export default App;