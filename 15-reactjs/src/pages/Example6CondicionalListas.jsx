import { useState } from "react";
import BtnBack from "../components/BtnBack";

function Example6CondicionalListas() {
    // LIST OF POKEMONS
    const initialPokemons = [
        { id: 4,    name: 'Charmander', type: 'Fire',     level: 5 },
        { id: 25,   name: 'Pikachu',    type: 'Electric', level: 12 },
        { id: 150,  name: 'Mewtwo',     type: 'Psychic',  level: 70 },
        { id: 7,    name: 'Squirtle',   type: 'Water',    level: 5 },
        { id: 376,  name: 'Metagross',  type: 'Steel',    level: 55 },
        { id: 937,  name: 'Ceruledge',  type: 'Ghost',    level: 40 },
        { id: 1,    name: 'Bulbasaur',  type: 'Grass',    level: 5 },
        { id: 9,    name: 'Blastoise',  type: 'Water',    level: 36 },
        { id: 39,   name: 'Jigglypuff', type: 'Normal',   level: 10 },
        { id: 52,   name: 'Meowth',     type: 'Normal',   level: 15 },
        { id: 65,   name: 'Alakazam',   type: 'Psychic',  level: 42 },
        { id: 94,   name: 'Gengar',     type: 'Ghost',    level: 45 },
        { id: 121,  name: 'Starmie',    type: 'Water',    level: 35 },
        { id: 131,  name: 'Lapras',     type: 'Water',    level: 30 },
        { id: 133,  name: 'Eevee',      type: 'Normal',   level: 10 },
        { id: 143,  name: 'Snorlax',    type: 'Normal',   level: 50 },
        { id: 149,  name: 'Dragonite',  type: 'Dragon',   level: 55 },
        { id: 248,  name: 'Tyranitar',  type: 'Rock',     level: 55 },
        { id: 282,  name: 'Gardevoir',  type: 'Psychic',  level: 35 },
        { id: 448,  name: 'Lucario',    type: 'Fighting', level: 32 },
        { id: 6,    name: 'Charizard',  type: 'Fire',     level: 36 },
        { id: 3,    name: 'Venusaur',   type: 'Grass',    level: 32 },
        { id: 54,   name: 'Psyduck',    type: 'Water',    level: 15 },
        { id: 59,   name: 'Arcanine',   type: 'Fire',     level: 40 },
        { id: 130,  name: 'Gyarados',   type: 'Water',    level: 30 },
        { id: 151,  name: 'Mew',        type: 'Psychic',  level: 100 },
        { id: 197,  name: 'Umbreon',    type: 'Dark',     level: 35 },
        { id: 212,  name: 'Scizor',     type: 'Bug',      level: 40 },
        { id: 257,  name: 'Blaziken',   type: 'Fire',     level: 36 },
        { id: 306,  name: 'Aggron',     type: 'Steel',    level: 42 },
        { id: 384,  name: 'Rayquaza',   type: 'Dragon',   level: 70 },
        { id: 445,  name: 'Garchomp',   type: 'Dragon',   level: 48 },
        { id: 470,  name: 'Leafeon',    type: 'Grass',    level: 35 },
        { id: 612,  name: 'Haxorus',    type: 'Dragon',   level: 48 },
        { id: 658,  name: 'Greninja',   type: 'Water',    level: 36 },
        { id: 700,  name: 'Sylveon',    type: 'Fairy',    level: 35 },
        { id: 745,  name: 'Lycanroc',   type: 'Rock',     level: 30 },
        { id: 778,  name: 'Mimikyu',    type: 'Ghost',    level: 25 },
        { id: 888,  name: 'Zacian',     type: 'Fairy',    level: 70 },
        { id: 905,  name: 'Enamorus',   type: 'Fairy',    level: 70 },
        { id: 2,    name: 'Ivysaur',    type: 'Grass',    level: 16 },
        { id: 5,    name: 'Charmeleon', type: 'Fire',     level: 16 },
        { id: 8,    name: 'Wartortle',  type: 'Water',    level: 16 },
        { id: 10,   name: 'Caterpie',   type: 'Bug',      level: 3 },
        { id: 12,   name: 'Butterfree', type: 'Bug',      level: 12 },
        { id: 16,   name: 'Pidgey',     type: 'Normal',   level: 4 },
        { id: 18,   name: 'Pidgeot',    type: 'Normal',   level: 36 },
        { id: 19,   name: 'Rattata',    type: 'Normal',   level: 2 },
        { id: 20,   name: 'Raticate',   type: 'Normal',   level: 20 },
        { id: 23,   name: 'Ekans',      type: 'Poison',   level: 5 },
        { id: 24,   name: 'Arbok',      type: 'Poison',   level: 22 },
        { id: 26,   name: 'Raichu',     type: 'Electric', level: 30 },
        { id: 27,   name: 'Sandshrew',  type: 'Ground',   level: 6 },
        { id: 28,   name: 'Sandslash',  type: 'Ground',   level: 22 },
        { id: 37,   name: 'Vulpix',     type: 'Fire',     level: 8 },
        { id: 38,   name: 'Ninetales',  type: 'Fire',     level: 35 },
        { id: 50,   name: 'Diglett',    type: 'Ground',   level: 10 },
        { id: 51,   name: 'Dugtrio',    type: 'Ground',   level: 26 },
        { id: 58,   name: 'Growlithe',  type: 'Fire',     level: 12 },
        { id: 63,   name: 'Abra',       type: 'Psychic',  level: 8 },
        { id: 64,   name: 'Kadabra',    type: 'Psychic',  level: 16 },
        { id: 74,   name: 'Geodude',    type: 'Rock',     level: 10 },
        { id: 75,   name: 'Graveler',   type: 'Rock',     level: 25 },
        { id: 76,   name: 'Golem',      type: 'Rock',     level: 36 },
        { id: 77,   name: 'Ponyta',     type: 'Fire',     level: 15 },
        { id: 78,   name: 'Rapidash',   type: 'Fire',     level: 40 },
        { id: 79,   name: 'Slowpoke',   type: 'Water',    level: 12 },
        { id: 80,   name: 'Slowbro',    type: 'Water',    level: 37 },
        { id: 92,   name: 'Gastly',     type: 'Ghost',    level: 15 },
        { id: 93,   name: 'Haunter',    type: 'Ghost',    level: 25 },
        { id: 95,   name: 'Onix',       type: 'Rock',     level: 20 },
        { id: 104,  name: 'Cubone',     type: 'Ground',   level: 14 },
        { id: 105,  name: 'Marowak',    type: 'Ground',   level: 28 },
        { id: 106,  name: 'Hitmonlee',  type: 'Fighting', level: 30 },
        { id: 107,  name: 'Hitmonchan', type: 'Fighting', level: 30 },
        { id: 113,  name: 'Chansey',    type: 'Normal',   level: 20 },
        { id: 123,  name: 'Scyther',    type: 'Bug',      level: 25 },
        { id: 125,  name: 'Electabuzz', type: 'Electric', level: 30 },
        { id: 126,  name: 'Magmar',     type: 'Fire',     level: 30 },
        { id: 135,  name: 'Jolteon',    type: 'Electric', level: 35 }
    ];

    // STATES
    const [list, setList] = useState([]);
    const [filterType, setFilterType] = useState('All');
    const [applyLevelFilter, setApplyLevelFilter] = useState(false);

    const addRandomPokemon = () => {
        const availablePokemons = initialPokemons.filter(p =>
            !list.some(added => added.id === p.id)
        );

        if (availablePokemons.length === 0) {
            alert("You have now added all 80 available Pokémon!");
            return;
        }

        const randomIndex = Math.floor(Math.random() * availablePokemons.length);
        const randomPoke = availablePokemons[randomIndex];

        setList([...list, { ...randomPoke }]);
    };

    const resetPokedex = () => setList([]);

    // FILTERING LOGIC CORRECTED
    const filteredList = list.filter(p => {
        const matchesType = filterType === 'All' || p.type === filterType;
        const matchesLevel = applyLevelFilter ? p.level === 4 : true;
        return matchesType && matchesLevel;
    });

    // STYLES
    const styles = {
        container: { padding: '20px', color: '#fff', textAlign: 'center' },
        grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '20px', marginTop: '30px' },
        card: {
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid white',
            borderRadius: '15px',
            padding: '15px',
            transition: 'transform 0.2s',
            backdropFilter: 'blur(5px)',
            transition: 'all 0.3s ease'
        },
        btnMain: {
            padding: '12px 30px',
            background: list.length === 80 ? '#555' : '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontWeight: 'bold',
            cursor: list.length === 80 ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 15px rgba(46, 204, 113, 0.3)',
            transition: 'all 0.3s ease'
        },

        btnClean: {
            padding: '12px 30px',
            background: 'transparent',
            color: '#e74c3c',
            border: '2px solid #e74c3c',
            borderRadius: '50px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)',
            transition: 'all 0.3s ease'
        },

        switchLabel: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            background: '#2c3e50',
            padding: '8px 15px',
            borderRadius: '20px',
            border: applyLevelFilter ? '1px solid #2ecc71' : '1px solid #555'
        }
    }

    // Styles Types
    const typeColors = {
        Fire:       '#FF5722',
        Electric:   '#FFEB3B',
        Psychic:    '#9C27B0',
        Water:      '#2196F3',
        Steel:      '#9E9E9E',
        Ghost:      '#673AB7',
        Grass:      '#4CAF50',
        Normal:     '#607D8B',
        Dragon:     '#E91E63',
        Rock:       '#795548',
        Fighting:   '#E64A19',
        Dark:       '#333',
        Ice:        '#00BCD4',
        Poison:     '#9C27B0',
        Ground:     '#8D6E63',
        Bug:        '#8BC34A',
        Fairy:      '#F06292'
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 6: Conditional & Lists</h2>
            <p>Conditional rendering.</p>

            {/* BUTTON TO ADD RANDOM POKEMON AND CLEAN ALL */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', margin: '30px 0' }}>
                <button
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.filter = 'brightness(0.8)';
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter = 'brightness(1)';
                    }}
                    onClick={addRandomPokemon}
                    style={styles.btnMain}
                    disabled={list.length === 80}
                >
                    {list.length === 80 ? 'MAXIMUM REACHED' : 'ADD RANDOM POKEMON'}
                </button>

                <button
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.filter = 'brightness(0.8)';
                    }}

                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter = 'brightness(1)';
                    }}
                    onClick={resetPokedex} style={styles.btnClean}
                >
                    CLEAN EVERYTHING
                </button>
            </div>

            {/* FILTER BAR */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>Type:</span>
                    <select
                        onChange={(e) => setFilterType(e.target.value)}
                        style={{ padding: '10px', borderRadius: '10px', background: '#34495e', color: 'white', border: 'none' }}
                    >
                        <option value="All">All</option>
                        {Array.from(new Set(initialPokemons.map(p => p.type))).map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <label style={styles.switchLabel}>
                    <input
                        type="checkbox"
                        checked={applyLevelFilter}
                        onChange={(e) => setApplyLevelFilter(e.target.checked)}
                        style={{ accentColor: '#2ecc71', width: '18px', height: '18px' }}
                    />
                    Level 4 Only 🎚️
                </label>
            </div>

            {/* LISTED POKEMON COUNTER */}
            <h3 style={{ marginTop: '30px', color: '#fff' }}>
                Pokemons ({filteredList.length} / 80)
            </h3>

            {/* POKEMON DATA */}
            <div style={styles.grid}>
                {filteredList.map((p) => (
                    <div key={p.id} style={styles.card} className="poke-card"
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
                    >
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
                            alt={p.name}
                            style={{ width: '100%', maxWidth: '100px' }}
                        />
                        <h4 style={{ margin: '10px 0 5px 0', textTransform: 'capitalize' }}>{p.name}</h4>
                        <div style={{ display: 'inline-block', padding: '2px 10px', background: typeColors[p.type] || '#444', color: p.type === 'Electric' || p.type === 'Fairy' ? '#000' : '#fff', borderRadius: '10px', fontSize: '0.7rem', marginBottom: '5px' }}>
                            {p.type}
                        </div>
                        <p style={{ fontWeight: 'bold', color: '#f1c40f', margin: '5px 0' }}>Lvl. {p.level}</p>
                    </div>
                ))}
            </div>

            {list.length > 0 && filteredList.length === 0 && (
                <div style={{ padding: '40px', color: '#777' }}>
                    <p>There are no Pokémon in your list that match the filters.</p>
                </div>
            )}
        </div>
    );
}

export default Example6CondicionalListas;