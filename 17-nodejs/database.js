const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./fastFuriousdb.sqlite');

db.serialize(() => {
    // Habilitar llaves foráneas en SQLite
    db.run("PRAGMA foreign_keys = ON");

    // 2. Tabla de Usuarios (Login/Registro)
    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT    
    )`);

    // 3. Tabla de Personajes (CHARACTERS)
    db.run(`CREATE TABLE IF NOT EXISTS characters(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        alias TEXT,
        age INTEGER,
        actor_name TEXT,
        image_path TEXT
    )`);

    // 4. Tabla de Carros (CARS)
    // Aquí agregamos la relación character_id al final
    db.run(`CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    engine TEXT,
    power TEXT,
    torque TEXT,
    acceleration TEXT,
    top_speed TEXT,
    transmission TEXT,
    drivetrain TEXT,
    image_path TEXT,
    character_id INTEGER,
    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE SET NULL
)`, (err) => {
        if (err) console.error("Error al crear tabla cars:", err.message);
    });

    // 5. Tabla de Tokens closed with logout
    db.run(`CREATE TABLE IF NOT EXISTS blacklisted_tokens(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        token TEXT UNIQUE,
        expires_at INTEGER
    )`);

    console.log("Base de datos y tablas de Rápidos y Furiosos listas.");
});

module.exports = db;
