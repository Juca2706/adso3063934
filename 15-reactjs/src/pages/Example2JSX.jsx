import BtnBack from "../components/BtnBack";

function Example2JSX() {

    // JS variables
    const pkName = 'Pikachu';
    const pkType = 'Electric';
    const pkLevel = 5;
    const pkAbilities = ['Static Electricity', 'Volt Absorb'];
    const pkImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';


    // Styles
    const style = {
        container: {
            background: '#e8f5e8',
            color: '#143656',
            padding: '1.2rem',
            marginTop: '1rem',
            borderRadius: '10px'
        },

        title: {
            color: '#143656',
            fontSize: '2rem',
            textAlign: 'center'
        },

        img: {
            display: 'flex',
            margin: '1rem auto',
            width: '240px'
        },

        ul: {
            paddingLeft: '2rem',
            fontSize: '0.8rem'
        }
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 2: JSX</h2>
            <p>Writting HTML-like code whitin JavaScript using curly braces ( ) for JS expresions.</p>
            <div style={style.container}>
                <h3 style={style.title}>{pkName} (Lvl. {pkLevel})</h3>
                <img
                    src={pkImg}
                    alt={pkName}
                    style={style.img} />
                <p><strong>Type:</strong> {pkType}</p>
                <p>UpperCase: {pkName.toUpperCase()}</p>
                <p><strong>Abilities:</strong></p>
                <ul style={style.ul}>
                    {pkAbilities.map((ability, index) => (
                        <li key={index}>{ability}</li>
                    ))}
                </ul>
                <p>Is it starter? {pkLevel === 81 ? '✅ Yes' : '❌ No'}</p>
            </div>
        </div>
    )
}

export default Example2JSX;