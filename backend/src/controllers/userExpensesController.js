const pool = require('../db/db');

exports.getUserExpenses = async (req, res) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10; 
  const offset = (page - 1) * limit; 

  try {
    const [expenses] = await pool.query(
      "SELECT * FROM expenses WHERE user_id = ? LIMIT ? OFFSET ?",
      [userId, limit, offset]
    );

    const [total] = await pool.query(
      "SELECT COUNT(*) as count FROM expenses WHERE user_id = ?",
      [userId]
    );

    res.json({
      expenses,
      total: total[0].count,
      page,
      limit,
    });
  } catch (error) {
    console.error("Błąd podczas pobierania wydatków:", error);
    res.status(500).json({ message: "Nie udało się pobrać wydatków." });
  }
};

exports.getUserExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT e.id, e.title, e.price, e.note, e.date, c.name AS category_name, c.id AS category_id 
       FROM expenses e
       LEFT JOIN categories c ON e.category_id = c.id
       WHERE e.id = ? AND e.user_id = ?`,
      [id, req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: 'Wydatek nie znaleziony.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user expense:', error);
    res.status(500).json({ message: 'Nie udało się pobrać wydatku.' });
  }
};

exports.addUserExpense = async (req, res) => {
  const { title, price, note, date, categoryId } = req.body;

  if (!title || !price || !date || !categoryId) {
    return res.status(400).json({ message: 'Wszystkie pola są wymagane.' });
  }

  try {
    const [category] = await pool.query(
      `SELECT id FROM categories WHERE id = ? AND user_id = ?`,
      [categoryId, req.user.id]
    );

    if (!category.length) {
      return res.status(400).json({ message: 'Nieprawidłowa kategoria.' });
    }

    const [result] = await pool.query(
      `INSERT INTO expenses (title, price, note, date, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, price, note || null, date, categoryId, req.user.id]
    );

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Nie udało się dodać wydatku.' });
  }
};


exports.updateUserExpense = async (req, res) => {
  const { id } = req.params;
  const { title, price, note, date, categoryId } = req.body;

  if (!title || !price || !date || !categoryId) {
    return res.status(400).json({ message: 'Wszystkie pola są wymagane.' });
  }

  try {
    const [expense] = await pool.query(
      `SELECT * FROM expenses WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );

    if (!expense.length) {
      return res.status(404).json({ message: 'Wydatek nie znaleziony.' });
    }

    const [category] = await pool.query(
      `SELECT id FROM categories WHERE id = ? AND user_id = ?`,
      [categoryId, req.user.id]
    );

    if (!category.length) {
      return res.status(400).json({ message: 'Nieprawidłowa kategoria.' });
    }

    const [result] = await pool.query(
      `UPDATE expenses SET title = ?, price = ?, note = ?, date = ?, category_id = ? 
       WHERE id = ? AND user_id = ?`,
      [title, price, note || null, date, categoryId, id, req.user.id]
    );

    res.json({ message: 'Wydatek zaktualizowany pomyślnie.' });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ message: 'Nie udało się zaktualizować wydatku.' });
  }
};


exports.deleteUserExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const [expense] = await pool.query(
      `SELECT * FROM expenses WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );
    if (!expense.length) {
      return res.status(404).json({ message: 'Wydatek nie znaleziony.' });
    }

    await pool.query(`DELETE FROM expenses WHERE id = ? AND user_id = ?`, [
      id,
      req.user.id,
    ]);
    res.json({ message: 'Wydatek usunięty.' });
  } catch (error) {
    res.status(500).json({ message: 'Nie udało się usunąć wydatku.' });
  }
};
