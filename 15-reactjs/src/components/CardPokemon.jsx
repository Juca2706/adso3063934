import './CardPokemon.css';

function CardPokemon({name, type, power, image, legendary = false}) {

    const typeColors = {
        fire:      '#FF5722',
        electric:  '#FFEB3B',
        psychic:   '#9C27B0',
        water:     '#2196F3',
        steel:     '#9E9E9E',
        ghost:     '#f8f8ff'
    }

    return (
        <div className='pokemon-card' style={{borderColor: typeColors[type?.toLowerCase()] || '#ccc'}}>
            {image && <img src={image} alt={name} className='pokemon-image'/>}
            <h3>{name}</h3>
            <p className='pokemon-type'><strong>Type:</strong> {type}</p>
            <p className='pokemon-type'><strong>Power:</strong> {power}</p>
            {legendary && <span className='legendary-badge'>⭐ Legendary ⭐</span> }
        </div>
    )
}

export default CardPokemon;