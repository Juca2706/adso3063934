import { useState, useEffect } from "react";
import BtnBack from "../components/BtnBack";

function Example4StateHooks() {

    // List the Pokémons
    const pokemons = [
        { id: 4,    name: 'Charmander', type: 'Fire' },
        { id: 25,   name: 'Pikachu',    type: 'Electric' },
        { id: 150,  name: 'Mewtwo',     type: 'Psychic' },
        { id: 7,    name: 'Squirtle',   type: 'Water' },
        { id: 376,  name: 'Metagross',  type: 'Steel' },
        { id: 937,  name: 'Ceruledge',  type: 'Ghost' },
        { id: 1,    name: 'Bulbasaur',  type: 'Grass' },
        { id: 9,    name: 'Blastoise',  type: 'Water' },
        { id: 39,   name: 'Jigglypuff', type: 'Normal' },
        { id: 52,   name: 'Meowth',     type: 'Normal' },
        { id: 65,   name: 'Alakazam',   type: 'Psychic' },
        { id: 94,   name: 'Gengar',     type: 'Ghost' },
        { id: 121,  name: 'Starmie',    type: 'Water' },
        { id: 131,  name: 'Lapras',     type: 'Water' },
        { id: 133,  name: 'Eevee',      type: 'Normal' },
        { id: 143,  name: 'Snorlax',    type: 'Normal' },
        { id: 149,  name: 'Dragonite',  type: 'Dragon' },
        { id: 248,  name: 'Tyranitar',  type: 'Rock' },
        { id: 282,  name: 'Gardevoir',  type: 'Psychic' },
        { id: 448,  name: 'Lucario',    type: 'Fighting' },
        { id: 6,    name: 'Charizard',  type: 'Fire' },
        { id: 3,    name: 'Venusaur',   type: 'Grass' },
        { id: 54,   name: 'Psydyck',    type: 'Water' },
        { id: 59,   name: 'Arcanine',   type: 'Fire' },
        { id: 130,  name: 'Gyarados',   type: 'Water' },
        { id: 151,  name: 'Mew',        type: 'Psychic' },
        { id: 197,  name: 'Umbreon',    type: 'Normal' },
        { id: 212,  name: 'Scizor',     type: 'Steel' },
        { id: 257,  name: 'Blaziken',   type: 'Fire' },
        { id: 306,  name: 'Aggron',     type: 'Steel' },
        { id: 384,  name: 'Rayquaza',   type: 'Dragon' },
        { id: 445,  name: 'Garchomp',   type: 'Dragon' },
        { id: 470,  name: 'Leafeon',    type: 'Grass' },
        { id: 612,  name: 'Haxorus',    type: 'Dragon' },
        { id: 658,  name: 'Greninja',   type: 'Water' },
        { id: 700,  name: 'Sylveon',    type: 'Normal' },
        { id: 745,  name: 'Lycanroc',   type: 'Rock' },
        { id: 778,  name: 'Mimikyu',    type: 'Ghost' },
        { id: 888,  name: 'Zacian',     type: 'Steel' },
        { id: 905,  name: 'Enamorus',   type: 'Psychic' }
    ];

    // 1. ESTADOS
    const [wildPokemon, setWildPokemon] = useState(null); // Pokémon que aparece
    const [myPokedex, setMyPokedex] = useState([]); // Pokémon capturados
    const [isCapturing, setIsCapturing] = useState(false); // Estado del botón

    // 2. BUSCAR POKEMON
    const disponibles = pokemons.filter(p => !myPokedex.some(c => c.id === p.id));

    const findPokemon = () => {
        if (disponibles.length > 0) {
            const randomIndex = Math.floor(Math.random() * disponibles.length);
            setWildPokemon(disponibles[randomIndex]);
        }
    };

    // 3. CAPTURA DE POKEMON
    useEffect(() => {
        if (isCapturing) {
            const timer = setTimeout(() => {
                setMyPokedex(prev => [...prev, wildPokemon]);
                setIsCapturing(false);
                setWildPokemon(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCapturing, wildPokemon]);

    // Styles
    const style = {
        card: {
            background: '#2b2b2b6d',
            padding: '1rem',
            borderRadius: '10px',
            border: '2px solid #fff',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            margin: '1rem 0',
            color: 'white'
        },

        img: { display: 'flex', margin: '1rem auto', width: '160px' },
        btn: {
            padding: '10px 20px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid white',
            borderRadius: '20px',
            cursor: 'pointer',
            marginTop: '2rem',
            opacity: isCapturing ? 0.5 : 1,
            fontWeight: 'bold'
        },

        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: '10px',
            marginTop: '1rem',
            color: 'white'
        },

        msgFinal: { padding: '20px', background: 'rgba(255, 215, 0, 0.2)', borderRadius: '10px', border: '2px solid #FFD700', color: '#FFD700', marginTop: '1rem' }
    };

    // Styles Types
    const typeColors = {
        fire:       '#FF5722',
        electric:   '#FFEB3B',
        psychic:    '#9C27B0',
        water:      '#2196F3',
        steel:      '#9E9E9E',
        ghost:      '#f8f8ff',
        grass:      '#4CAF50',
        normal:     '#607D8B',
        dragon:     '#9E9E9E',
        rock:       '#795548',
        fighting:   '#FF5722'
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 4: State & Hooks</h2>
            <h3>(useState, useEffect)</h3>
            <p>Capture random Pokemon and watch as their status updates.</p>

            <div style={{ textAlign: 'center' }}>
                {!wildPokemon ? (
                    /* SI NO HAY POKEMON SALVAJE, EVALUAMOS SI MOSTRAR EL BOTÓN O EL MENSAJE FINAL */
                    disponibles.length > 0 ? (
                        <button onClick={findPokemon} style={style.btn}>
                            Find Pokémon!
                        </button>
                    ) : (
                        <div style={style.msgFinal}>
                            <h3>🎉 Complete Collection! 🎉</h3>
                            <p>You've caught all the Pokémon. You're a master!</p>
                        </div>
                    )
                ) : (
                    /* SI HAY UN POKEMON SALVAJE */
                    <div style={style.card}>
                        <h4>¡A {wildPokemon.name} savage has appeared!</h4>
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${wildPokemon.id}.png`}
                            alt={wildPokemon.name} style={style.img}
                        />
                        <button disabled={isCapturing} onClick={() => setIsCapturing(true)} style={style.btn}>
                            {isCapturing ? 'Capturing...' : 'Throw Poké Ball'}
                        </button>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h4>My Pokemons ({myPokedex.length} / {pokemons.length})</h4>
                <div style={style.grid}>
                    {myPokedex.map((p, index) => (
                        <div key={index} style={{ textAlign: 'center', fontSize: '0.8rem', background: '#2b2b2b6d', borderRadius: '5px', border: '2px solid #fff', padding: '1rem', transition: 'all 0.5s ease' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.filter = 'brightness(0.8)';
                                e.currentTarget.style.borderColor = '#FFD700';
                            }}

                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.filter = 'brightness(1)';
                                e.currentTarget.style.borderColor = '#fff';
                            }}>

                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`} alt={p.name} style={{ width: '70px' }} />
                            <p><strong>{p.name}</strong></p>
                            <p style={{ color: typeColors[p.type?.toLowerCase()] || '#ccc' }}><strong>{p.type}</strong></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Example4StateHooks