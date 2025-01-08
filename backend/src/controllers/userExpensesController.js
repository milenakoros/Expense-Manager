const pool = require('../db/db'); 

exports.getUserExpenses = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM expenses WHERE user_id = ?`,
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Nie udało się pobrać wydatków.' });
  }
};

exports.addUserExpense = async (req, res) => {
  const { title, price, note, date, categoryId } = req.body;

  if (!title || !price || !date || !categoryId) {
    return res.status(400).json({ message: 'Wszystkie pola są wymagane.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO expenses (title, price, note, date, category_id, user_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [title, price, note || null, date, categoryId, req.user.id]
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: 'Nie udało się dodać wydatku.' });
  }
};

exports.updateUserExpense = async (req, res) => {
  const { id } = req.params;
  const { title, price, note, date, categoryId } = req.body;

  try {
    const [expense] = await pool.query(
      `SELECT * FROM expenses WHERE id = ? AND user_id = ?`,
      [id, req.user.id]
    );
    if (!expense.length) {
      return res.status(404).json({ message: 'Wydatek nie znaleziony.' });
    }

    await pool.query(
      `UPDATE expenses SET title = ?, price = ?, note = ?, date = ?, category_id = ? WHERE id = ? AND user_id = ?`,
      [title, price, note || null, date, categoryId, id, req.user.id]
    );

    res.json({ message: 'Wydatek zaktualizowany.' });
  } catch (error) {
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
exports.getUserProfile = async (req, res) => {
    try {
      const [user] = await pool.query(
        `SELECT id, username, email FROM users WHERE id = ?`,
        [req.user.id]
      );
      if (!user.length) {
        return res.status(404).json({ message: "Użytkownik nie znaleziony." });
      }
      res.json(user[0]);
    } catch (error) {
      res.status(500).json({ message: "Nie udało się pobrać danych użytkownika." });
    }
  };
  
  exports.updateUserProfile = async (req, res) => {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Nazwa użytkownika jest wymagana." });
    }
  
    try {
      await pool.query(
        `UPDATE users SET username = ? WHERE id = ?`,
        [username, req.user.id]
      );
      res.json({ message: "Profil zaktualizowany pomyślnie." });
    } catch (error) {
      res.status(500).json({ message: "Nie udało się zaktualizować profilu." });
    }
  };
  