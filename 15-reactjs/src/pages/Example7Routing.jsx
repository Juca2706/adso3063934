import { Routes, Route, Link, useLocation } from "react-router-dom";
import React, { useState } from 'react';
import BtnBack from "../components/BtnBack";

function GeneralInfo() {
    const styles = {
        container: {
            padding: '1.5rem',
            backgroundColor: '#f0f4f8',
            borderRadius: '10px',
            borderLeft: '5px solid #3b82f6',
            marginTop: '1rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        },
        title: {
            color: '#fff',
            margin: '0 0 10px 0',
            fontSize: '1.5rem',
            borderBottom: '2px solid #fff'
        },
        text: {
            color: '#475569',
            lineHeight: '1.6',
            fontSize: '1.1rem'
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={styles.title}>General Information</h2>
            <div style={styles.container}>
                <p style={styles.text}>
                    React Router is a powerful library for handling navigation and routing
                    in React applications, allowing you to create <strong>Single Page Applications (SPA)</strong> with ease.
                </p>
            </div>
        </div>
    )
}

function PokemonList() {
    // 1. Mapeo de colores por Pokémon
    const pokemonData = [
        { name: "Pikachu", color: "#FFD700" }, // Dorado/Amarillo
        { name: "Charmander", color: "#FF4500" }, // Naranja fuerte
        { name: "Mewtwo", color: "#9370DB" }, // Púrpura
        { name: "Squirtle", color: "#87CEEB" }, // Azul cielo
        { name: "Metagross", color: "#4682B4" }, // Azul acero
        { name: "Ceruledge", color: "#4B0082" }  // Índigo/Fuego fatuo
    ];

    // 2. Estado para manejar el hover (guardamos el nombre del pokemon activo)
    const [hoveredPokemon, setHoveredPokemon] = useState(null);

    const styles = {
        title: {
            color: '#fff',
            margin: '0 0 10px 0',
            fontSize: '1.5rem',
            borderBottom: '2px solid #fff'
        },

        ul: {
            display: 'flex',
            flexWrap: 'wrap',
            padding: 0,
            listStyle: 'none',
            gap: '1rem',
            marginTop: '1.5rem'
        },

        // Función que genera el estilo dinámico para cada 'li'
        getLiStyle: (pokemon, isHovered) => ({
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease', // Suaviza el efecto
            backgroundColor: isHovered ? pokemon.color : 'white',
            color: isHovered ? 'white' : '#142157',
            border: `3px solid ${pokemon.color}`,
            // Elevación sutil
            transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
            boxShadow: isHovered
                ? `0 10px 15px -3px ${pokemon.color}66` // Sombra del color del pokemon
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        })
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={styles.title}>Pokemon List</h2>

            <ul style={styles.ul}>
                {pokemonData.map((pokemon) => (
                    <li
                        key={pokemon.name}
                        // Eventos para detectar el mouse
                        onMouseEnter={() => setHoveredPokemon(pokemon.name)}
                        onMouseLeave={() => setHoveredPokemon(null)}
                        style={styles.getLiStyle(
                            pokemon,
                            hoveredPokemon === pokemon.name
                        )}
                    >
                        {pokemon.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PokemonDetails() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const pokemonName = searchParams.get('name');

    // 1. Estado para el efecto hover
    const [isHovered, setIsHovered] = useState(false);

    const pokemonData = {
        Pikachu: {
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
            type: "Electric",
            ability: "Static Electricity",
            color: "#FFD700", // Cambié 'yellow' por un código más vibrante
            emoji: "⚡"
        },
        Charmander: {
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
            type: "Fire",
            ability: "Blaze",
            color: "#FF4500", // Cambié 'orange' por uno más intenso
            emoji: "🔥"
        }
    };

    const selectedPokemon = pokemonData[pokemonName];

    if (!selectedPokemon) {
        return <p>Pokémon no encontrado. Intenta seleccionar uno de la lista.</p>;
    }

    // 2. Estilo dinámico de la carta
    const cardStyle = {
        border: `4px solid ${selectedPokemon.color}`,
        padding: '1.4rem',
        borderRadius: '1.2rem',
        background: '#f9f9f9',
        color: '#142157',
        width: '300px',
        textAlign: 'center',

        // Transición para que el movimiento sea suave
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',

        // Si el mouse está encima (isHovered es true):
        transform: isHovered ? 'translatey(-8px) scale(1.01)' : 'translateY(0) scale(1)',
        boxShadow: isHovered
            ? `0 20px 30px -10px ${selectedPokemon.color}88` // Sombra con color y transparencia
            : '0 4px 15px rgba(0,0,0,0.1)',
        cursor: 'pointer',

        title: {
            color: '#fff',
            margin: '0 0 10px 0',
            fontSize: '1.5rem',
            borderBottom: '2px solid #fff',
            marginBottom: '1.5rem'
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <h2 style={cardStyle.title}>Pokemon Details</h2>

            <div
                // 3. Eventos para activar/desactivar el efecto
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={cardStyle}
            >
                <img
                    src={selectedPokemon.img}
                    alt={pokemonName}
                    style={{
                        width: '100%',
                        filter: isHovered ? 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))' : 'none',
                        transition: 'filter 0.3s ease'
                    }}
                />
                <h3 style={{ fontSize: '1.8rem', margin: '10px 0' }}>
                    {selectedPokemon.emoji} {pokemonName}
                </h3>
                <div style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '10px' }}>
                    <p><strong>Type:</strong> {selectedPokemon.type}</p>
                    <p><strong>Ability:</strong> {selectedPokemon.ability}</p>
                </div>
            </div>
        </div>
    );
}

function InternalNavegation() {
    const navStyle = {
        display: 'flex',
        gap: '10px',
        marginTop: '20px',
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: 'transparent',
        borderRadius: '8px'
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#333',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        padding: '5px 10px',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 248, 240, 0.2)',
        border: '2px solid #fff',
        color: '#fff',
        transition: 'all 0.3s ease',
    };

    return (
        <nav style={navStyle}>
            <Link style={linkStyle} to="/example7"
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.filter = 'brightness(0.8)';
                    e.currentTarget.style.borderColor = '#FFD700';
                }}

                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'brightness(1)';
                    e.currentTarget.style.borderColor = '#fff';
                }}
            >🏡 Home</Link>
            <Link style={linkStyle} to="/example7/list"
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.filter = 'brightness(0.8)';
                    e.currentTarget.style.borderColor = '#FFD700';
                }}

                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'brightness(1)';
                    e.currentTarget.style.borderColor = '#fff';
                }}
            >📋 List</Link>
            <Link style={linkStyle} to="/example7/details?name=Pikachu"
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.filter = 'brightness(0.8)';
                    e.currentTarget.style.borderColor = '#FFD700';
                }}

                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'brightness(1)';
                    e.currentTarget.style.borderColor = '#fff';
                }}
            >⚡ Pikachu</Link>
            <Link style={linkStyle} to="/example7/details?name=Charmander"
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.filter = 'brightness(0.8)';
                    e.currentTarget.style.borderColor = '#FFD700';
                }}

                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'brightness(1)';
                    e.currentTarget.style.borderColor = '#fff';
                }}
            >🔥 Charmander</Link>
        </nav>
    );
}

function Example7Routing() {
    const location = useLocation();
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 7: React Router</h2>
            <p>Navegation between different 'pages' without reloading browser.</p>
            <InternalNavegation />
            {/* Adsolute Paths */}
            <Routes>
                <Route path="/" element={<GeneralInfo />} />
                <Route path="/list" element={<PokemonList />} />
                <Route path="/details" element={<PokemonDetails />} />
            </Routes>
        </div>
    )
}

export default Example7Routing;