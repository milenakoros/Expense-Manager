const pool = require("../db/db");

exports.getUserCategories = async (req, res) => {
  try {
    const [categories] = await pool.query(
      "SELECT * FROM categories WHERE user_id = ?",
      [req.user.id]
    );
    res.json(categories);
  } catch (error) {
    console.error("Błąd podczas pobierania kategorii użytkownika:", error);
    res.status(500).json({ message: "Nie udało się pobrać kategorii." });
  }
};

exports.addUserCategory = async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nazwa kategorii jest wymagana." });
  }

  try {
    const [existing] = await pool.query(
      "SELECT * FROM categories WHERE name = ? AND user_id = ?",
      [name, req.user.id]
    );

    if (existing.length > 0) {
      return res
        .status(400)
        .json({ message: "Kategoria o tej nazwie już istnieje." });
    }

    const [result] = await pool.query(
      "INSERT INTO categories (name, description, user_id) VALUES (?, ?, ?)",
      [name, description || null, req.user.id]
    );

    res.status(201).json({ id: result.insertId, name, description });
  } catch (error) {
    console.error("Błąd podczas dodawania kategorii użytkownika:", error);
    res.status(500).json({ message: "Nie udało się dodać kategorii." });
  }
};
