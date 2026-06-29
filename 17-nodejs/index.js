const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./database');
const auth = require('./authMiddleware');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = req.path.includes('Character') ? 'images/characters/' : 'images/cars/';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(cors());
app.use('/images', express.static('images'));

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

// PUT: /updateUsername
app.put('/updateUsername', auth, (req, res) => {
    const { username } = req.body;
    const userId = req.user.id;

    if (!username || !username.trim()) {
        return res.status(400).json({ error: 'Username cannot be empty!' });
    }

    db.run(`UPDATE users SET username = ? WHERE id = ?`, [username, userId], function (err) {
        if (err) return res.status(400).json({ error: 'Username already taken!' });
        if (this.changes === 0) return res.status(404).json({ error: 'User not found!' });

        // Genera un token nuevo con el username actualizado
        const newToken = jwt.sign({ id: userId, username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Username updated successfully!', username, token: newToken });
    });
});

// PUT: /updatePassword
app.put('/updatePassword', auth, async (req, res) => {
    const { newPassword } = req.body;
    const userId = req.user.id;

    if (!newPassword || newPassword.length < 4) {
        return res.status(400).json({ error: 'Password must be at least 4 characters!' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    db.run(`UPDATE users SET password = ? WHERE id = ?`, [hashedPassword, userId], function (err) {
        if (err) return res.status(400).json({ error: 'Error updating password!' });
        if (this.changes === 0) return res.status(404).json({ error: 'User not found!' });
        res.json({ message: 'Password updated successfully!' });
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
        if (err) return res.status(500).json({ error: 'Error obtaining characters!' });

        // Enviamos la lista de personajes encontrada
        res.json(rows);
    });
});

// Create CHARACTER
// POST: /createCharacter
app.post('/createCharacter', auth, upload.single('image'), (req, res) => {
    const { full_name, alias, age, actor_name } = req.body;
    const image_path = req.file ? req.file.path : null;
    const sql = `INSERT INTO characters (full_name, alias, age, actor_name, image_path) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [full_name, alias, age, actor_name, image_path], function (err) {
        if (err) return res.status(400).json({ error: 'Error creating character!' });
        res.json({ id: this.lastID, message: 'Character created correctly!' });
    });
});

// Update CHARACTER
// PUT: /updateCharacter/:id
app.put('/updateCharacter/:id', auth, upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { full_name, alias, age, actor_name } = req.body;

    // Lógica para reemplazar imagen física
    if (req.file) {
        db.get(`SELECT image_path FROM characters WHERE id = ?`, [id], (err, row) => {
            if (row && row.image_path) {
                if (fs.existsSync(row.image_path)) fs.unlinkSync(row.image_path); // Borra la anterior
            }
            const sql = `UPDATE characters SET full_name = ?, alias = ?, age = ?, actor_name = ?, image_path = ? WHERE id = ?`;
            db.run(sql, [full_name, alias, age, actor_name, req.file.path, id], (err) => {
                if (err) return res.status(400).json({ error: 'Update error!' });
                res.json({ message: 'Character updated successfully!' });
            });
        });
    } else {
        const sql = `UPDATE characters SET full_name = ?, alias = ?, age = ?, actor_name = ? WHERE id = ?`;
        db.run(sql, [full_name, alias, age, actor_name, id], (err) => {
            if (err) return res.status(400).json({ error: 'Update error!' });
            res.json({ message: 'Character updated successfully!' });
        });
    }
});

// Delete CHARACTER
// DELETE: /deleteCharacter/:id
app.delete('/deleteCharacter/:id', auth, (req, res) => {
    const { id } = req.params;
    // Buscamos la ruta de la imagen antes de borrar el registro
    db.get(`SELECT image_path FROM characters WHERE id = ?`, [id], (err, row) => {
        if (row && row.image_path) {
            if (fs.existsSync(row.image_path)) fs.unlinkSync(row.image_path); // Borra la foto de la carpeta
        }
        db.run(`DELETE FROM characters WHERE id = ?`, [id], function (err) {
            if (err) return res.status(500).json({ error: 'Error deleting!' });
            if (this.changes === 0) return res.status(404).json({ error: 'Not found!' });
            res.json({ message: 'Character removed from the family!' });
        });
    });
});

// ============================== CARS ============================== //

// List CARS
// GET: /listCars
app.get('/listCars', auth, (req, res) => {
    // Traemos todos los carros de la base de datos
    db.all(`SELECT * FROM cars`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: 'Error retrieving vehicle list' });
        res.json(rows);
    });
});

// Create CARS
// POST: /createCar
app.post('/createCar', auth, upload.single('image'), (req, res) => {
    const { name, engine, power, torque, acceleration, top_speed, transmission, drivetrain, character_id } = req.body;
    const image_path = req.file ? req.file.path : null;
    const sql = `INSERT INTO cars (name, engine, power, torque, acceleration, top_speed, transmission, drivetrain, character_id, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(sql, [name, engine, power, torque, acceleration, top_speed, transmission, drivetrain, character_id, image_path], function (err) {
        if (err) return res.status(400).json({ error: 'Error registering vehicle!' });
        res.json({ id: this.lastID, message: 'Vehicle successfully registered!' });
    });
});

// Update CARS
// PUT: /updateCar/:id
app.put('/updateCar/:id', auth, upload.single('image'), (req, res) => {
    const { id } = req.params;
    const { name, engine, power, torque, acceleration, top_speed, transmission, drivetrain, character_id } = req.body;

    if (req.file) {
        db.get(`SELECT image_path FROM cars WHERE id = ?`, [id], (err, row) => {
            if (row && row.image_path) {
                if (fs.existsSync(row.image_path)) fs.unlinkSync(row.image_path);
            }
            const sql = `UPDATE cars SET name=?, engine=?, power=?, torque=?, acceleration=?, top_speed=?, transmission=?, drivetrain=?, character_id=?, image_path=? WHERE id=?`;
            db.run(sql, [name, engine, power, torque, acceleration, top_speed, transmission, drivetrain, character_id, req.file.path, id], (err) => {
                if (err) return res.status(400).json({ error: 'Update failed!' });
                res.json({ message: 'Vehicle updated successfully!' });
            });
        });
    } else {
        const sql = `UPDATE cars SET name=?, engine=?, power=?, torque=?, acceleration=?, top_speed=?, transmission=?, drivetrain=?, character_id=? WHERE id=?`;
        db.run(sql, [name, engine, power, torque, acceleration, top_speed, transmission, drivetrain, character_id, id], (err) => {
            if (err) return res.status(400).json({ error: 'Update failed!' });
            res.json({ message: 'Vehicle updated successfully!' });
        });
    }
});

// Delete CARS
// DELETE: /deleteCar/:id
app.delete('/deleteCar/:id', auth, (req, res) => {
    const { id } = req.params;
    db.get(`SELECT image_path FROM cars WHERE id = ?`, [id], (err, row) => {
        if (row && row.image_path) {
            if (fs.existsSync(row.image_path)) fs.unlinkSync(row.image_path);
        }
        db.run(`DELETE FROM cars WHERE id = ?`, [id], function (err) {
            if (err) return res.status(500).json({ error: 'Error deleting!' });
            res.json({ message: 'Vehicle removed from garage!' });
        });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'))

