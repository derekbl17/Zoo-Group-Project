require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Konfigūracija iš .env arba default reikšmės
const PORT = process.env.PORT || 5000;
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'zooDb'
});

// Prisijungimas prie duomenų bazės, tada serverio startas
db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to the database');

  // --- API maršrutai ---

  // Create
  app.post('/addAnimal', (req, res) => {
    const sql = `
      INSERT INTO zoodbtable
        (gyvūnoPav, rūšis, svoris, aplinka, gyvenaLietuvoje)
      VALUES (?, ?, ?, ?, ?)
    `;
    const vals = [
      req.body.gyvūnoPav,
      req.body.rūšis,
      req.body.svoris,
      req.body.aplinka,
      req.body.gyvenaLietuvoje
    ];
    db.query(sql, vals, (e, r) => {
      if (e) return res.status(500).json({ message: 'DB insert error', error: e });
      res.status(201).json({ id: r.insertId, ...req.body });
    });
  });

  // Read all
  app.get('/getAnimals', (req, res) => {
    db.query('SELECT * FROM zoodbtable', (e, results) => {
      if (e) return res.status(500).json({ message: 'DB fetch error', error: e });
      res.json(results);
    });
  });

  // Read one
  app.get('/getAnimalById/:id', (req, res) => {
    db.query('SELECT * FROM zoodbtable WHERE id = ?', [req.params.id], (e, results) => {
      if (e) return res.status(500).json({ message: 'DB fetch error', error: e });
      if (!results.length) return res.status(404).json({ message: 'Not found' });
      res.json(results[0]);
    });
  });

  // Update
  app.put('/updateAnimal/:id', (req, res) => {
    const { gyvūnoPav, rūšis, svoris, aplinka, gyvenaLietuvoje } = req.body;
    const sql = `
      UPDATE zoodbtable
      SET gyvūnoPav=?, rūšis=?, svoris=?, aplinka=?, gyvenaLietuvoje=?
      WHERE id=?
    `;
    const vals = [gyvūnoPav, rūšis, svoris, aplinka, gyvenaLietuvoje, req.params.id];
    db.query(sql, vals, (e, r) => {
      if (e) return res.status(500).json({ message: 'DB update error', error: e });
      if (!r.affectedRows) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Updated', ...req.body });
    });
  });

  // Delete
  app.delete('/deleteAnimal/:id', (req, res) => {
    db.query('DELETE FROM zoodbtable WHERE id = ?', [req.params.id], (e, r) => {
      if (e) return res.status(500).json({ message: 'DB delete error', error: e });
      if (!r.affectedRows) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    });
  });

  // Serverio paleidimas
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
