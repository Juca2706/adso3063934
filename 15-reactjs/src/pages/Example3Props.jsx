import BtnBack from "../components/BtnBack";

function Example3Props() {

    // Data 
    const pokemons = [
        {id: 4,     name: 'Charmander', type: 'Fire',           power: 'Blaze',                 legendary: false},
        {id: 25,    name: 'Pikachu',    type: 'Electric',       power: 'Static Electricity',    legendary: false},
        {id: 150,   name: 'Mewtwo',     type: 'Psychic',        power: 'Pressure',              legendary: true},
        {id: 7,     name: 'Squirtle',   type: 'Water',          power: 'Torrent',               legendary: false},
        {id: 376,   name: 'Metagross',  type: 'Steel,Psychic',  power: 'Clear Body',            legendary: true},
        {id: 884,   name: 'Ceruledge',  type: 'Fire, Adsorb',   power: 'Absorbs Fire',          legendary: false}
    ]

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Pass data from parent to children (like function arguments).</p>
        </div>
    )
} 

export default Example3Props;