import BtnBack from "../components/BtnBack";

//  Component Charmander
function Charmander() {
    return (
        <div style={{ border: '4px solid orange', padding: '1.4rem', borderRadius: '0.3rem', background: '#fff0e6', width: '360px' }}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" alt="Charmander" style={{width: '140px', justifyContent: 'center', display: 'block', margin: '0 auto'}} />
            <h2>🔥 Charmander</h2>
            <p><strong>Type:</strong> Fire</p>
            <p><strong>Ability:</strong> Blaze</p>
        </div>
    )
}

function Pikachu() {
    return (
        <div style={{ border: '4px solid yellow', padding: '1.4rem', borderRadius: '0.3rem', background: '#fff0e6', width: '360px' }}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" alt="Pikachu" style={{width: '140px', justifyContent: 'center', display: 'block', margin: '0 auto'}} />
            <h2>⚡ Pikachu</h2>
            <p><strong>Type:</strong> Electric</p>
            <p><strong>Ability:</strong> Static Electricity</p>
        </div>
    )
}

function Mewtwo() {
    return (
        <div style={{ border: '4px solid grey', padding: '1.4rem', borderRadius: '0.3rem', background: '#fff0e6', width: '360px' }}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" alt="Mewtwo" style={{width: '140px', justifyContent: 'center', display: 'block', margin: '0 auto'}} />
            <h2>🧠 Mewtwo</h2>
            <p><strong>Type:</strong> Psychic</p>
            <p><strong>Ability:</strong> Pressure</p>
        </div>
    )
}

function Squirtle() {
    return (
        <div style={{ border: '4px solid lightblue', padding: '1.4rem', borderRadius: '0.3rem', background: '#fff0e6', width: '360px' }}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" alt="Squirtle" style={{width: '140px', justifyContent: 'center', display: 'block', margin: '0 auto'}} />
            <h2>💧 Squirtle</h2>
            <p><strong>Type:</strong> Water</p>
            <p><strong>Ability:</strong> Torrent</p>
        </div>
    )
}

function Metagross() {
    return (
        <div style={{ border: '4px solid lightgrey', padding: '1.4rem', borderRadius: '0.3rem', background: '#fff0e6', width: '360px' }}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/376.png" alt="Metagross" style={{width: '140px', justifyContent: 'center', display: 'block', margin: '0 auto'}} />
            <h2>⚙️🧠 Metagross</h2>
            <p><strong>Type:</strong> Steel, Psychic</p>
            <p><strong>Ability:</strong> Clear Body</p>
        </div>
    )
}

function Ceruledge() {
    return (
        <div style={{ border: '4px solid purple', padding: '1.4rem', borderRadius: '0.3rem', background: '#fff0e6', width: '360px' }}>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/937.png" alt="Ceruledge" style={{width: '140px', justifyContent: 'center', display: 'block', margin: '0 auto'}} />
            <h2>🔥👻 Ceruledge</h2>
            <p><strong>Type:</strong> Fire, Ghost</p>
            <p><strong>Ability:</strong> Flash Fire</p>
        </div>
    )
}

function Example1Components() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 1: Components</h2>
            <p>Create independent, reusable pieces of UI called components.</p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1.4rem', gap: '1rem', color: '#142157' }}>
                <Charmander />
                <Pikachu />
                <Mewtwo />
                <Squirtle />
                <Metagross />
                <Ceruledge />
            </div>
        </div>
    )
}

export default Example1Components;