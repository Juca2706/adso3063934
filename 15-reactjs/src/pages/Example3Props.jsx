import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {

    // Data 
    const pokemons = [
        {id: 4,    name: 'Charmander', type: 'Fire',      power: 'Blaze',               legendary: false},
        {id: 25,   name: 'Pikachu',    type: 'Electric',  power: 'Static Electricity',  legendary: false},
        {id: 150,  name: 'Mewtwo',     type: 'Psychic',   power: 'Pressure',            legendary: true},
        {id: 7,    name: 'Squirtle',   type: 'Water',     power: 'Torrent',             legendary: false},
        {id: 376,  name: 'Metagross',  type: 'Steel',     power: 'Clear Body',          legendary: true},
        {id: 937,  name: 'Ceruledge',  type: 'Ghost',     power: 'Flash Fire',          legendary: false}
    ]

    // Styles
    const style = {
        cards: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 3: Props</h2>
            <p>Pass data from parent to children (like function arguments).</p>

            <div style={style.cards}>
                {/* Va pass different props to each card */}
                {
                    pokemons.map(pokemon => (
                        <CardPokemon
                            key         = {pokemon.id}
                            image       = {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                            name        = {pokemon.name}
                            type        = {pokemon.type}
                            power       = {pokemon.power}
                            legendary   = {pokemon.legendary}

                        />

                    ))
                }

            </div>
        </div>
    )
} 

export default Example3Props;