import { useState, useEffect } from "react";
import BtnBack from "../components/BtnBack";

function Example5Eventos() {
    const [chosenPokemon, setChosenPokemon]   = useState(null);
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const [inputRange, setInputRange]         = useState(0);

    // Event (Click)
    const handleChoice = (name) => {
        setChosenPokemon(name)
    }

    // Event (Hover: MouseEnter || MouseOver)
    const handleMouseEnter = (name) => {
        setHoveredPokemon(name)
    }

    // Event (MouseLeave)
    const handleMouseLeave = () => {
        setHoveredPokemon(null)
    }

    // Event (Input - Range)
    const handleInput = (e) => {
        setInputRange(e.target.value)
    }

    const hoverStyle = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '0.5rem',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

    const clickEvent = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.8rem',
        marginTop: '0.5rem',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto'
    }

     const rangeEvent = {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.8rem',
        marginTop: '0.5rem',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto'
    }


    // Styles 
    const style = {

        content: {
            background: 'rgba(255, 248, 240, 0.2)',
            borderRadius: '0.5rem',
            border: '2px solid #e8f5e8',
            padding: '1rem',
            marginTop: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        buttons: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
        },

        buttonStyle: {
            background: 'transparent',
            color: 'white',
            cursor: 'pointer',
            padding: '0.9rem',
            marginTop: '1rem',
            borderRadius: '50px',
            border: '2px solid white',
            transition: 'all 0.4s ease',
            fontWeight: 'bold'
        },

        title: {
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '1rem',
            color: '#fff',
            borderBottom: '3px dashed #e8f5e8',
            paddingBottom: '0.5rem'
        },

        messageClick: {
            background: 'rgba(255, 215, 0, 0.2)',
            width: '40%',
            textAlign: 'center',
            justifyContent: 'center',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            border: '2px solid #FFD700',
            color: '#FFD700',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto'
        },

        messageHover: {
            background: 'rgba(255, 215, 0, 0.2)',
            width: '40%',
            textAlign: 'center',
            justifyContent: 'center',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            border: '2px solid #FFD700',
            color: '#FFD700',
            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto'
        },

        messageRange: {
            background: 'rgba(255, 215, 0, 0.2)',
            width: '25%',
            textAlign: 'center',
            justifyContent: 'center',
            padding: '1rem',
            borderRadius: '0.5rem',
            marginTop: '1rem',
            border: '2px solid #FFD700',
            color: '#FFD700',            fontWeight: 'bold',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto'
        },

        buttonsHover: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'transparent',
            borderColor: '2px solid #e8f5e8',
            color: '#e8f5e8',
            cursor: 'pointer',
            padding: '0.9rem',
            marginTop: '1rem',
            borderRadius: '20px',
            border: '2px solid white',
            transition: 'all 0.4s ease',
            fontWeight: 'bold',
            gap: '0.5rem'
        },

        rangeStyle: {
            accentColor: '#FFD700',
            padding: '1rem  0',
            width: '30%',

        }

    }


    return (
        <div className="container">
            <BtnBack />
            <h2>Example 5: Event Handling</h2>
            <h3>(Event Handling in React)</h3>
            <p>Respond to user interactions (click, hover, input, submit).</p>

            <div style={style.content}>
                {/* Click - Event */}
                <div style={clickEvent}>
                    <h3 style={style.title}>Click Event</h3>

                    <div style={style.buttons}>
                        <button onClick={(e) => handleChoice('Pikachu', e)} style={style.buttonStyle}
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
                            <span style={{ zoom: 1.2 }}>⚡</span> Pikachu
                        </button>

                        <button onClick={(e) => handleChoice('Charmander', e)} style={style.buttonStyle}
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
                            <span style={{ zoom: 1.2 }}>🔥</span> Charmander
                        </button>

                        <button onClick={(e) => handleChoice('Squirtle', e)} style={style.buttonStyle}
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
                            <span style={{ zoom: 1.2 }}>💧</span> Squirtle
                        </button>
                    </div>

                    <div style={style.messageClick}>
                        {chosenPokemon ? (
                            <div>You choose: {chosenPokemon}!</div>
                        ) : (
                            <div>Please choose a pokemon!</div>
                        )
                        }
                    </div>

                </div>

                {/* MouseEnter / MouseLeave - Event */}
                <div style={hoverStyle}>
                    <h3 style={style.title}>MouseEnter / MouseLeave Event</h3>

                    <div style={style.buttons}>
                        <button
                            onMouseEnter={() => handleMouseEnter('Pikachu')}
                            onMouseLeave={handleMouseLeave}
                            style={style.buttonsHover}
                        >
                            <span>Hover here top!</span>
                            <img style={{ zoom: 0.2 }} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="" />
                        </button>

                        <button
                            onMouseEnter={() => handleMouseEnter('Charmander')}
                            onMouseLeave={handleMouseLeave}
                            style={style.buttonsHover}
                        >
                            <span>Hover here top!</span>
                            <img style={{ zoom: 0.2 }} src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" alt="" />
                        </button>
                    </div>

                    <div style={style.messageHover}>
                        {hoveredPokemon && (
                            <div>You are viewing: {hoveredPokemon}!</div>
                        )
                        }
                    </div>
                </div>

                {/* Input Range - Event */}
                <div style={rangeEvent}>
                    <h3 style={style.title}>Input Event</h3>
                    <input
                        style={style.rangeStyle}
                        onInput={handleInput}
                        type="range"
                        min="0"
                        max="100"
                    />
                    <div style={style.messageRange}>
                        <span style={{display: 'block', testAlign: 'center'}}>Power:</span>
                        {inputRange && (
                            <div>{inputRange}</div>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Example5Eventos;