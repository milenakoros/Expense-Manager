const pool = require('../db/db');

exports.getCategories = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Nie udało się pobrać kategorii.');
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Nazwa kategorii jest wymagana.');
    }

    const [existing] = await pool.query('SELECT * FROM categories WHERE name = ?', [name]);

    if (existing.length > 0) {
      return res.status(400).send('Kategoria o tej nazwie już istnieje.');
    }

    const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);

    res.status(201).json({ id: result.insertId, name });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).send('Nie udało się dodać kategorii.');
  }
};
