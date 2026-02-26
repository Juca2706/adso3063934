import { useState, useEffect } from "react";
import BtnBack from "../components/BtnBack";

function Example5Eventos() {
    const [chosenPokemon, setChosenPokemon] = useState(null);

    const handleChoice = (name, event) => {
        setChosenPokemon(name)
    }

    const buttonStyle = {
        background: 'transparent',
        color: 'white',
        cursor: 'pointer',
        padding: '0.9rem',
        marginTop: '1rem',
        borderRadius: '50px',
        border: '2px solid white',
        transition: 'all 0.4s ease'
    }

    // Styles 
    const style = {

        content: {
            background: 'rgba(255, 248, 240, 0.2)',
            borderRadius: '0.5rem',
            border: '2px solid #e8f5e8',
            padding: '1rem',
            marginTop: '0.5rem',
        },

        buttons: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
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

        message: {
            width: '100%',
            textAlign: 'center',
            paddingTop: '1rem',
            color: '#fff',
            fontWeight: 'bold'
        }
    }


    return (
        <div className="container">
            <BtnBack />
            <h2>Example 5: Event Handling</h2>
            <h3>(Event Handling in React)</h3>
            <p>Respond to user interactions (click, hover, input, submit).</p>

            <div style={style.content}>
                <h3 style={style.title}>Click Event</h3>

                <div style={style.buttons}>
                    <button onClick={(e) => handleChoice('Pikachu', e)} style={buttonStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.filter = 'brightness(0.8)';
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.filter = 'brightness(1)';
                        }}
                    >
                        Pikachu
                    </button>

                    <button onClick={(e) => handleChoice('Charmander', e)} style={buttonStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.filter = 'brightness(0.8)';
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.filter = 'brightness(1)';
                        }}
                    >
                        Charmander
                    </button>

                    <button onClick={(e) => handleChoice('Squirtle', e)} style={buttonStyle}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.filter = 'brightness(0.8)';
                        }}

                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.filter = 'brightness(1)';
                        }}
                    >
                        Squirtle
                    </button>
                </div>

                <div style={style.message}>
                    {chosenPokemon ? (
                        <div>You choose: {chosenPokemon}!</div>
                    ) : (
                        <div>Please choose a pokemon!</div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Example5Eventos;