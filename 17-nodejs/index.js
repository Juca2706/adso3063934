const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./database');
const auth = require('./authMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = 'your_secret';

// AUTH ENDPOINTS:
// ¨POST: /register
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO users (username, password)
            VALUES(?, ?)`, [username, hashedPassword], (err) => {
        if (err) return res.status(400).json({ error: 'User already exists!' });
        res.json({ message: 'User Registered!' });
    }
    );
});

// POST: /login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error!' });
        if (!user) return res.status(400).json({ error: 'Invalid username or password!' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Invalid username or password!' });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
});

// POST: /logout
app.post('/logout', auth, (req, res) => {
    db.run(`INSERT INTO blacklisted_tokens (token, expires_at)
            VALUES (?, ?)`, [req.token, req.user.exp], (err) => {
        if (err) return res.status(400).json({ error: 'Session already closed!' });
        res.json({ message: 'Logged out successfully!' });
    });
});

// ENDPOINTS CRUD's SISTEMA
// FAST AND FURIOUS

// ============================== CHARACTERS ============================== //
// List CHARACTERS
// GET: /listCharacters
// Usamos "auth" para que solo usuarios con token puedan ver la lista
app.get('/listCharacters', auth, (req, res) => {
    // db.all se usa para obtener múltiples filas de la tabla
    db.all(`SELECT * FROM characters`, [], (err, rows) => {
        // Si hay un error en la consulta, avisamos al cliente
        if (err) return res.status(500).json({ error: 'Error al obtener personajes' });

        // Enviamos la lista de personajes encontrada
        res.json(rows);
    });
});

// Create CHARACTER
// POST: /createCharacter
app.post('/createCharacter', auth, (req, res) => {
    // Extraemos los datos del cuerpo de la petición (Apidog)
    const { full_name, alias, age, actor_name } = req.body;

    // Insertamos los datos en la tabla characters
    const sql = `INSERT INTO characters (full_name, alias, age, actor_name) VALUES (?, ?, ?, ?)`;

    db.run(sql, [full_name, alias, age, actor_name], function (err) {
        if (err) return res.status(400).json({ error: 'Error al crear el personaje' });

        // Respondemos con el ID que la base de datos le asignó automáticamente
        res.json({ id: this.lastID, message: '¡Personaje de la saga creado!' });
    });
});

// Update CHARACTER
// PUT: /updateCharacter/:id
app.put('/updateCharacter/:id', auth, (req, res) => {
    const { id } = req.params; // Obtenemos el ID de la URL
    const { full_name, alias, age, actor_name } = req.body;

    const sql = `UPDATE characters SET full_name = ?, alias = ?, age = ?, actor_name = ? WHERE id = ?`;

    db.run(sql, [full_name, alias, age, actor_name, id], function (err) {
        if (err) return res.status(400).json({ error: 'Error al actualizar' });
        res.json({ message: 'Personaje actualizado correctamente' });
    });
});

// Delete CHARACTER
// DELETE: /deleteCharacter/:id
app.delete('/deleteCharacter/:id', auth, (req, res) => {
    // Obtenemos el id de los parámetros de la URL
    const { id } = req.params;

    // Ejecutamos la sentencia de eliminación
    // Nota: Como cambiaste la DB a SET NULL, los carros asociados NO se borrarán.
    db.run(`DELETE FROM characters WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: 'Error al eliminar el personaje' });

        // Verificamos si realmente se eliminó algo (si el ID existía)
        if (this.changes === 0) return res.status(404).json({ error: 'Personaje no encontrado' });

        res.json({ message: 'Personaje eliminado de la familia exitosamente' });
    });
});

// ============================== CARS ============================== //

// List CARS
// GET: /listCars
app.get('/listCars', auth, (req, res) => {
    // Traemos todos los carros de la base de datos
    db.all(`SELECT * FROM cars`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Error al obtener la lista de vehículos' });
        res.json(rows);
    });
});

// Create CARS
// POST: /createCar
app.post('/createCar', auth, (req, res) => {
    // Extraemos todos los campos técnicos que definimos en la tabla
    const {
        name, engine, power, torque, acceleration,
        top_speed, transmission, drivetrain, character_id
    } = req.body;

    const sql = `INSERT INTO cars (
        name, engine, power, torque, acceleration, 
        top_speed, transmission, drivetrain, character_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run(sql, [
        name, engine, power, torque, acceleration,
        top_speed, transmission, drivetrain, character_id
    ], function (err) {
        if (err) return res.status(400).json({ error: 'Error al registrar el vehículo' });

        res.json({ id: this.lastID, message: 'Vehículo registrado exitosamente' });
    });
});

// Update CARS
// PUT: /updateCar/:id
app.put('/updateCar/:id', auth, (req, res) => {
    const { id } = req.params;
    const {
        name, engine, power, torque, acceleration,
        top_speed, transmission, drivetrain, character_id
    } = req.body;

    const sql = `UPDATE cars SET 
        name = ?, engine = ?, power = ?, torque = ?, acceleration = ?, 
        top_speed = ?, transmission = ?, drivetrain = ?, character_id = ? 
        WHERE id = ?`;

    db.run(sql, [
        name, engine, power, torque, acceleration,
        top_speed, transmission, drivetrain, character_id, id
    ], function (err) {
        if (err) return res.status(400).json({ error: 'Error al actualizar el vehículo' });
        res.json({ message: 'Datos del vehículo actualizados' });
    });
});

// Delete CARS
// DELETE: /deleteCar/:id
app.delete('/deleteCar/:id', auth, (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM cars WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: 'Error al eliminar el vehículo' });
        res.json({ message: 'Vehículo eliminado del sistema' });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'))

