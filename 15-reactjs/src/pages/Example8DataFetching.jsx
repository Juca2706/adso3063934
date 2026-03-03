import React, { useState, useEffect } from 'react';
import BtnBack from "../components/BtnBack";

function Example8DataFetching() {
    const [pokemons, setPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const limit = 24;

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                const data = await response.json();
                setTotal(data.count);

                const detailed = await Promise.all(
                    data.results.map(async (p) => {
                        const res = await fetch(p.url);
                        return await res.json();
                    })
                );
                setPokemons(detailed);
                if (!selectedPokemon) setSelectedPokemon(detailed[0]);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } catch (e) { console.error(e); }
            setLoading(false);
        };
        fetchPokemons();
    }, [offset]);

    const totalPages = Math.ceil(total / limit);
    const currentPage = (offset / limit) + 1;

    // --- NUEVA FUNCIÓN PARA EL SELECTOR ---
    const handleJumpToPage = (e) => {
        const pageNumber = Number(e.target.value);
        setOffset((pageNumber - 1) * limit);
    };

    const styles = {
        mainContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '25px',
            marginTop: '25px',
            justifyContent: 'center'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '12px',
            flex: '1',
            minWidth: '300px'
        },
        pokemonCard: (isSelected) => ({
            backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.4)' : 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            padding: '15px',
            borderRadius: '16px',
            textAlign: 'center',
            cursor: 'pointer',
            border: isSelected ? '2px solid #3b82f6' : '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: isSelected ? '0 8px 20px rgba(59, 130, 246, 0.3)' : 'none',
            position: 'relative',
            overflow: 'hidden'
        }),
        detailPanel: {
            width: '100%',
            maxWidth: '380px',
            backgroundColor: '#000',
            borderRadius: '24px',
            padding: '30px',
            color: 'white',
            position: 'sticky',
            top: '20px',
            height: 'fit-content',
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            border: '1px solid #222'
        },
        paginationBar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Centramos el contenido
            gap: '20px',
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: '15px 25px',
            borderRadius: '16px',
            marginTop: '20px',
            marginBottom: '20px',
            border: '1px solid rgba(255,255,255,0.05)'
        },
        // Estilo humanizado para el selector
        customSelect: {
            backgroundColor: '#1e293b',
            color: 'white',
            border: '1px solid #3b82f6',
            padding: '8px 12px',
            borderRadius: '10px',
            cursor: 'pointer',
            outline: 'none',
            fontWeight: 'bold'
        }
    };

    return (
        <div className="container" style={{ minHeight: '100vh', padding: '20px', color: 'white' }}>
            <style>
                {`
                    .poke-card:hover {
                        transform: translateY(-5px);
                        background-color: rgba(255, 255, 255, 0.12) !important;
                        border-color: rgba(59, 130, 246, 0.5) !important;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.4);
                    }
                    .poke-card:active {
                        transform: scale(0.95);
                    }
                `}
            </style>

            <BtnBack />
            <h2>Example 8: Data Fetching</h2>
            <p>Connect with (API's) and fetch data.</p>

            {/* BARRA DE NAVEGACIÓN MODIFICADA CON SELECTOR */}
            <div style={styles.paginationBar}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Total Pokémons</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#3b82f6' }}>{total}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <select
                        style={styles.customSelect}
                        value={currentPage}
                        onChange={handleJumpToPage}
                    >
                        {Array.from({ length: totalPages }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                Página {i + 1}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Mostrando {pokemons.length} de {total}</span>
                </div>
            </div>

            <div style={styles.mainContainer}>
                <div style={styles.grid}>
                    {loading ? (
                        <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px' }}>Cargando datos...</div>
                    ) : (
                        pokemons.map(p => {
                            const highResImg = p.sprites.other.home.front_default || p.sprites.other['official-artwork'].front_default;
                            return (
                                <div
                                    key={p.id}
                                    className="poke-card"
                                    style={styles.pokemonCard(selectedPokemon?.id === p.id)}
                                    onClick={() => setSelectedPokemon(p)}
                                >
                                    <img
                                        src={highResImg}
                                        alt={p.name}
                                        style={{ width: '85px', height: '85px', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                                    />
                                    <span style={{ textTransform: 'capitalize', marginTop: '10px', fontWeight: '600' }}>{p.name}</span>
                                    <small style={{ color: '#3b82f6' }}>#{p.id.toString().padStart(3, '0')}</small>
                                </div>
                            );
                        })
                    )}
                </div>

                <aside style={styles.detailPanel}>
                    {selectedPokemon ? (
                        <>
                            <img src={selectedPokemon.sprites.other['official-artwork'].front_default} alt={selectedPokemon.name} style={{ width: '220px', filter: 'drop-shadow(0 15px 25px rgba(59, 130, 246, 0.4))' }} />
                            <h2 style={{ textTransform: 'capitalize', fontSize: '2.5rem', margin: '15px 0' }}>{selectedPokemon.name}</h2>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px' }}>
                                {selectedPokemon.types.map(t => (
                                    <span key={t.type.name} style={{ backgroundColor: '#1e293b', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', textTransform: 'uppercase', border: '1px solid #334155' }}>{t.type.name}</span>
                                ))}
                            </div>
                            <div style={{ backgroundColor: '#0f172a', borderRadius: '20px', padding: '20px', textAlign: 'left' }}>
                                <p style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px', textAlign: 'center' }}>BASE STATS</p>
                                {selectedPokemon.stats.map(s => (
                                    <div key={s.stat.name} style={{ marginBottom: '12px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '5px' }}>
                                            <span style={{ color: '#94a3b8' }}>{s.stat.name.replace('-', ' ').toUpperCase()}</span>
                                            <span>{s.base_stat}</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', backgroundColor: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: `${Math.min((s.base_stat / 160) * 100, 100)}%`, height: '100%', backgroundColor: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : <p>Cargando detalles...</p>}
                </aside>
            </div>
        </div>
    );
}

export default Example8DataFetching;